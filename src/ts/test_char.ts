import * as PIXI from 'pixi.js';

export class Char extends PIXI.Sprite {
    xspeed = 0;
    yspeed = 0;

    constructor(texture: PIXI.Texture){
        super(texture);
        this.anchor.set(0.5);

        this.x = 80;
        this.y = 60;

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break;
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break;
        }
    }
}
