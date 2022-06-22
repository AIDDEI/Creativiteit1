// Import PIXI
import * as PIXI from 'pixi.js';

// Import Images
import testChar from '../images/Char1_1.png';
import testBack from '../images/background.png';
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
    public pixiHeight = 500;

    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    private char : Char;
    private grounds : Ground[];
    private blocks : Block[];
    private background : Background;

    public gameArray : Array<PIXI.Sprite>;

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
        this.gameArray = [];

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
        this.themeSound.volume = 0.8;
        this.themeSound.addEventListener('ended', function(){
            this.currentTime = 0;
            this.play();
        }, false);

        // Adding background to game
        this.background = new Background(this.loader.resources["backgroundTexture"].texture!, this.pixiWidth, this.pixiHeight);
        this.pixi.stage.addChild(this.background);

        // Adding player to game
        this.char = new Char(this.loader.resources["charTexture"].texture!, this.gameArray);
        this.pixi.stage.addChild(this.char);

        // Adding grounds to game
        this.createGround(0, 430);
        this.createGround(300, 430);
        this.createGround(3500, 430);
        this.createGround(3800, 430);
        this.createGround(4100, 430);
        this.createGround(4700, 430);
        this.createGround(5000, 430);
        this.createGround(6700, 430);
        this.createGround(7000, 430);
        this.createGround(7300, 430);
        this.createGround(8000, 430);
        this.createGround(8300, 430);
        this.createGround(9700, 430);
        this.createGround(10000, 430);

        // Adding blocks to game
        this.createBlock(350, 240);
        this.createBlock(600, 240);
        this.createBlock(670, 240);
        this.createBlock(740, 240);
        this.createBlock(810, 240);
        this.createBlock(880, 240);
        this.createBlock(740, 70);

        this.createBlock(1350, 440);
        this.createBlock(1350, 370);
        this.createBlock(1350, 350);
        this.createBlock(1420, 440);
        this.createBlock(1420, 370);
        this.createBlock(1420, 350);

        this.createBlock(1650, 190);
        this.createBlock(1920, 440);
        this.createBlock(1920, 370);
        this.createBlock(1920, 300);
        this.createBlock(1990, 440);
        this.createBlock(1990, 370);
        this.createBlock(1990, 300);

        this.createBlock(2350, 440);
        this.createBlock(2350, 370);
        this.createBlock(2350, 300);
        this.createBlock(2420, 440);
        this.createBlock(2420, 370);
        this.createBlock(2420, 300);

        this.createBlock(2910, 440);
        this.createBlock(2910, 370);
        this.createBlock(2910, 300);
        this.createBlock(2910, 250);
        this.createBlock(2980, 440);
        this.createBlock(2980, 370);
        this.createBlock(2980, 300);
        this.createBlock(2980, 250);

        this.createBlock(3800, 240);
        this.createBlock(3870, 240);
        this.createBlock(3940, 240);

        this.createBlock(4010, 60);
        this.createBlock(4080, 60);
        this.createBlock(4150, 60);
        this.createBlock(4220, 60);
        this.createBlock(4290, 60);
        this.createBlock(4690, 60);
        this.createBlock(4760, 60);
        this.createBlock(4830, 60);

        this.createBlock(4830, 240);
        this.createBlock(5340, 240);
        this.createBlock(5640, 240);
        this.createBlock(5940, 240);
        this.createBlock(6240, 240);
        this.createBlock(5940, 60);
        this.createBlock(7000, 240);

        // Staircase 1
        this.createBlock(7530, 150);
        this.createBlock(7530, 220);
        this.createBlock(7530, 290);
        this.createBlock(7530, 358);
        this.createBlock(7460, 150);
        this.createBlock(7460, 220);
        this.createBlock(7460, 290);
        this.createBlock(7460, 358);
        this.createBlock(7390, 220);
        this.createBlock(7390, 290);
        this.createBlock(7390, 358);
        this.createBlock(7320, 290);
        this.createBlock(7320, 358);
        this.createBlock(7250, 358);

        // Staircase 2
        this.createBlock(8000, 150);
        this.createBlock(8000, 220);
        this.createBlock(8000, 290);
        this.createBlock(8000, 358);
        this.createBlock(8070, 220);
        this.createBlock(8070, 290);
        this.createBlock(8070, 358);
        this.createBlock(8140, 290);
        this.createBlock(8140, 358);
        this.createBlock(8210, 358);

        // Ending jumps
        this.createBlock(8750, 240);
        this.createBlock(9020, 200);
        this.createBlock(9390, 240);

        // Update
        this.pixi.ticker.add((delta) => this.update(delta));
    }

    private update(delta: number){
        // Update player
        this.char.update(delta);

        // Background scroll
        this.background.update();
        
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
        this.gameArray.push(block);
        this.pixi.stage.addChild(block);
    }

    private createGround(x: number, y: number){
        let ground = new Ground(this.loader.resources["groundTexture"].texture!);
        ground.x = x;
        ground.y = y;
        this.grounds.push(ground);
        this.gameArray.push(ground);
        this.pixi.stage.addChild(ground);
    }
}

new Game();