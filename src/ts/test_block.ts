import * as PIXI from 'pixi.js';

export class Block extends PIXI.Sprite{

    constructor(texture: PIXI.Texture){
        super(texture);

        this.x = 350;
        this.y = 278;

        this.width = 70;
        this.height = 72;
    }
}