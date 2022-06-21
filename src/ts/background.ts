// Import PIXI
import * as PIXI from 'pixi.js';

export class Background extends PIXI.TilingSprite{
    constructor(texture: PIXI.Texture, width: number, height: number){
        super(texture, width, height);
    }

    public update() {
        this.tilePosition.x -= 0.4 
    }
}