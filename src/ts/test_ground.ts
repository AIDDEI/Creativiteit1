import * as PIXI from 'pixi.js';

export class Ground extends PIXI.Sprite{

    constructor(texture: PIXI.Texture){
        super(texture);

        this.x = 0;
        this.y = 350;

        this.width = 500;
        this.height = 70;
    }
}
