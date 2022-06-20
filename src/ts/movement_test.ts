// Import PIXI
import * as PIXI from 'pixi.js';

// Import Images
import testChar from '../images/Char1_1.png';
import testBack from '../images/test_background2.jpg';
import testGround from '../images/test_ground2.jpg';
import testBlock from '../images/block.jpg';

// Import Sound
import themeSoundFile from 'url:../sound/theme.wav';

// Import Classes
import { Char } from './test_char';
import { Ground } from './test_ground';
import { Block } from './test_block';
import { Background } from './background';

export class Game{
    // Globals
    public pixiWidth = 800;
    public pixiHeight = 450;

    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    private char : Char;
    private grounds : Ground[];
    private blocks : Block[];
    private background : Background;

    private themeSound: HTMLAudioElement = new Audio(themeSoundFile);

    constructor(){
        // Create PIXI Stage
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        // Arrays
        this.blocks = [];
        this.grounds = [];

        // Create Loader
        this.loader = new PIXI.Loader();
        this.loader
            .add('charTexture', testChar)
            .add('backgroundTexture', testBack)
            .add('groundTexture', testGround)
            .add('blockTexture', testBlock);
        this.loader.load(()=>this.loadCompleted());
    }

    private loadCompleted(){
        // Play theme & loop theme
        this.themeSound.play();
        this.themeSound.addEventListener('ended', function(){
            this.currentTime = 0;
            this.play();
        }, false);

        // Adding background to game
        this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixiWidth, this.pixiHeight);
        this.pixi.stage.addChild(this.background);

        // Adding player to game
        this.char = new Char(this.loader.resources["charTexture"].texture!);
        this.pixi.stage.addChild(this.char);

        // Adding grounds to game
        this.createGround(20, 350);
        this.createGround(750, 350);

        // Adding blocks to game
        this.createBlock(350, 150);
        this.createBlock(600, 278);

        // Update
        this.pixi.ticker.add((delta) => this.update(delta));
    }

    private update(delta: number){
        // Update player
        this.char.update(delta);

        // Ground collision
        for(let ground of this.grounds){
            if(this.char.collisionVerticalTop(ground) && this.char.y + this.char.height < ground.y + this.char.yspeed){
                this.char.y = ground.y - this.char.height;
                this.char.yspeed = 0;
            }

            this.char.collisionHorizontal(ground);

            this.char.collisionVerticalBottom(ground);
        }

        // Block collision
        for(let block of this.blocks){
            if(this.char.collisionVerticalTop(block) && this.char.y + this.char.height < block.y + this.char.yspeed){
                this.char.y = block.y - this.char.height;
                this.char.yspeed = 0;
            }

            this.char.collisionHorizontal(block);

            this.char.collisionVerticalBottom(block);
        }
    }

    private createBlock(x: number, y: number){
        let block = new Block(this.loader.resources["blockTexture"].texture!);
        block.x = x;
        block.y = y;
        this.blocks.push(block);
        this.pixi.stage.addChild(block);
    }

    private createGround(x: number, y: number){
        let ground = new Ground(this.loader.resources["groundTexture"].texture!);
        ground.x = x;
        ground.y = y;
        this.grounds.push(ground);
        this.pixi.stage.addChild(ground);
    }
}

new Game();