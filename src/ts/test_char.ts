import * as PIXI from 'pixi.js';

export class Char extends PIXI.Sprite {
    xspeed = 0;
    yspeed = 3;
    weigth = 0.3;

    constructor(texture: PIXI.Texture){
        super(texture);
        this.anchor.set(0);

        this.x = 80;
        this.y = 60;

        this.width = 51;
        this.height = 72;

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }

    update(delta: number) {
        this.x += delta * this.xspeed;
        this.y += delta * this.yspeed;

        this.yspeed += this.weigth;

        if(this.y > 500){
            this.resetPosition();
        }
    }

    collisionVertical(object: PIXI.Sprite) {
        if(this.x > object.x + object.width || this.x + this.width < object.x || this.y > object.y + object.height || this.y + this.height < object.y){
            return false;
        } else {
            return true;
        }
    }

    private resetPosition() {
        this.x = 80;
        this.y = 60;
    }

    private onKeyDown(e: KeyboardEvent): void {
        if(e.key === " " || e.key === "ArrowUp" || e.key === "w"){
            if(this.yspeed === 0){
                this.yspeed = -9;
            }
        }
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -5
                break;
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 5
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
