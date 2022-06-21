import * as PIXI from 'pixi.js';
import testChar from '../images/Char1_1.png';
import testBack from '../images/test_background2.jpg';
import testGround from '../images/test_ground2.jpg';
import testBlock from '../images/block.jpg';

import { Char } from './test_char';
import { Ground } from './test_ground';
import { Block } from './test_block';
import { UI } from './UI';
import { Background } from './background';

export class Game{
    pixiWidth = 800;
    pixiHeight = 450;

    pixi : PIXI.Application;
    loader : PIXI.Loader;

    char : Char;
    ground : Ground;
    block : Block;
    bg : Background;

    interface : UI;

    constructor(){
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add('charTexture', testChar)
            .add('backgroundTexture', testBack)
            .add('groundTexture', testGround)
            .add('blockTexture', testBlock);
        this.loader.load(()=>this.loadCompleted());
    }

    loadCompleted(){
        let background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        background.height = this.pixiHeight;
        background.width = this.pixiWidth;
        this.pixi.stage.addChild(background);

        this.bg = new Background(this.pixi.loader.resources["backgroundTexture"].texture!, this.pixi.screen.width, this.pixi.screen.height)
        this.pixi.stage.addChild(this.bg)

        this.ground = new Ground(this.loader.resources["groundTexture"].texture!);
        this.pixi.stage.addChild(this.ground);

        this.block = new Block(this.loader.resources["blockTexture"].texture!);
        this.pixi.stage.addChild(this.block);

        this.char = new Char(this.loader.resources["charTexture"].texture!);
        this.pixi.stage.addChild(this.char);

        this.interface = new UI()
        this.pixi.stage.addChild(this.interface)

        this.pixi.ticker.add((delta) => this.update(delta));
    }

    doomClock:number = 600 

    private update(delta: number){
        this.char.update(delta);

        if(this.char.collisionVerticalTop(this.ground) && this.char.y + this.char.height < this.ground.y + this.char.yspeed){
            this.char.y = this.ground.y - this.char.height;
            this.char.yspeed = 0;
        }

        if(this.char.collisionVerticalTop(this.block) && this.char.y + this.char.height < this.block.y + this.char.yspeed){
            this.char.y = this.block.y - this.char.height;
            this.char.yspeed = 0;
        }

        this.char.collisionHorizontal(this.ground);
        this.char.collisionHorizontal(this.block);
        
        this.doomClock-=delta
        let secondsLeft = Math.floor(this.doomClock / 60)
        if(this.doomClock <= 0) {
            console.log("Doomsday has come!")
        } else {
            console.log(`Only ${secondsLeft} seconds left!`)
        }

        this.bg.update()
    }
    
}

new Game();
