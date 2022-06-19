// Import PIXI
import * as PIXI from 'pixi.js';

export class Background extends PIXI.Sprite{

    constructor(texture: PIXI.Texture, width: number, height: number){
        super(texture);

        // Setting width & height
        this.width = width;
        this.height = height;
    }
}