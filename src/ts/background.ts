// Import PIXI
import * as PIXI from 'pixi.js';

// Import class
import { Char } from './test_char';

export class Background extends PIXI.TilingSprite{

    char : Char;

    constructor(texture: PIXI.Texture, width: number, height: number){
        super(texture, width, height);
    }

    public update() {
        //  if (char.walkRight) { }
        this.tilePosition.x -= 0.4 
    }
}