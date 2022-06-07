import * as PIXI from 'pixi.js';
import testChar from '../images/Char1_1.png';
import testBack from '../images/test_background2.jpg';
import testGround from '../images/test_ground2.jpg';

import { Char } from './test_char_spritesheet';
import { Ground } from './test_ground';

export class Game{
    pixiWidth = 800;
    pixiHeight = 450;

    pixi : PIXI.Application;
    loader : PIXI.Loader;

    char : Char;
    ground : Ground;

    characterSpriteTextures: PIXI.Texture[] = [];

    constructor(){
        console.log('hi');
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader
            .add('charTexture', testChar)
            .add('backgroundTexture', testBack)
            .add('groundTexture', testGround)
            .add("Spritesheet1", "Spritesheet1.json");
        this.loader.load(()=>this.loadCompleted());
    }

    loadCompleted(){
        // console.log('hoi');
        let background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!);
        background.height = this.pixiHeight;
        background.width = this.pixiWidth;
        this.pixi.stage.addChild(background);

        this.ground = new Ground(this.loader.resources["groundTexture"].texture!, this);
        this.pixi.stage.addChild(this.ground);

        for(let i = 1; i <= 4; i++){
            // console.log('hoi');
            const texture = PIXI.Texture.from(`Char${i}.png`);
            this.characterSpriteTextures.push(texture);
        }

        // this.char = new Char(this.loader.resources["charTexture"].texture!);
        // this.pixi.stage.addChild(this.char);

        this.pixi.ticker.add((delta) => this.update(delta));
        this.createMovement();
    }

    createMovement(){
        this.char = new Char(this.characterSpriteTextures);
    
        this.pixi.stage.addChild(this.char);
    }

    private update(delta: number){
        this.char.update(delta);

        if(this.char.collideGround(this.ground)){
            this.char.yspeed = 0;
        }
    }
       
}

new Game();
