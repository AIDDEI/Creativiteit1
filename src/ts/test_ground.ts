import * as PIXI from 'pixi.js';
import { Game } from './movement_test';

export class Ground extends PIXI.Sprite{

    constructor(texture: PIXI.Texture, game: Game){
        super(texture);
        this.height = 85;
        this.x = 0;
        this.y = 400;
    }
}
