import * as PIXI from 'pixi.js';
import testChar from '../images/test_char.png';
import testBack from '../images/test_back.jpg';
import testGround from '../images/test_ground.png';

import { Char } from './test_char';
import { Ground } from './test_ground';

export class Game{
    pixiWidth = 800;
    pixiHeight = 450;

    pixi : PIXI.Application;
    loader : PIXI.Loader;

    char : Char;
    ground : Ground;

    constructor(){
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add('charTexture', testChar)
            .add('backgroundTexture', testBack)
            .add('groundTexture', testGround);
        this.loader.load(()=>this.loadCompleted());
    }

    loadCompleted(){
        

        let background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        background.height = this.pixiHeight;
        background.width = this.pixiWidth;
        this.pixi.stage.addChild(background);

        this.ground = new Ground(this.loader.resources["groundTexture"].texture!, this);
        this.pixi.stage.addChild(this.ground);

        this.char = new Char(this.loader.resources["charTexture"].texture!);
        this.pixi.stage.addChild(this.char);

        this.pixi.ticker.add((delta) => this.update(delta));
    }

    private update(delta: number){
        this.char.update();
    }
}

new Game();
