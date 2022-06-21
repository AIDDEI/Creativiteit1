// Import PIXI
import * as PIXI from 'pixi.js';

export class Block extends PIXI.Sprite{

    constructor(texture: PIXI.Texture){
        super(texture);

        // Setting the start position
        this.x = 350;
        this.y = 278;

        // Setting the width & height
        this.width = 70;
        this.height = 72;
    }
}