import * as PIXI from 'pixi.js';
// import { Ground } from './test_ground';

export class Char extends PIXI.AnimatedSprite {

    xspeed = 0;
    yspeed = 3;
    weigth = 0.3;
    walkRight = false;
    walkLeft = false;
    walkLeftLock = false;
    walkRightLock = false;

    constructor(textures: PIXI.Texture[]){
        super(textures);
        this.anchor.set(0);

        this.x = 80;
        this.y = 90;

        this.width = 72;
        this.height = 82;

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

        this.animationSpeed = 0.04;
        this.play()
    }

    public update(delta: number) {
        super.update(delta);
       
        this.x += delta * this.xspeed;
        this.y += delta * this.yspeed;

        this.yspeed += this.weigth;

        if(this.y > 500){
            this.resetPosition();
        }

        if(this.walkLeft === true){
            this.xspeed = -5;
        }

        if(this.walkRight === true){
            this.xspeed = 5;
        }

        if(this.walkLeft === false && this.walkRight === false){
            this.xspeed = 0;
        }
    }

    public collisionVerticalTop(object: PIXI.Sprite) {
        if(this.x > object.x + object.width || this.x + this.width < object.x || this.y > object.y + object.height || this.y + this.height < object.y){
            return false;
        } else {
            return true;
        }
    }

    public collisionHorizontal(object: PIXI.Sprite){
        if(this.x + this.width >= object.x && this.x + this.width < object.x + object.width){
            if(this.y === object.y || this.y < object.y && this.y > object.y - object.height){
                this.walkRightLock = true;
                this.walkRight = false;
                this.x = object.x - this.width - 1;
            }
        } else {
            this.walkRightLock = false;
        }
        if(this.x <= object.x + object.width && this.x > object.x){
            if(this.y === object.y || this.y < object.y && this.y > object.y - object.height){
                this.walkLeftLock = true;
                this.walkLeft = false;
                this.x = object.x + object.width + 1;
            }
        } else {
            this.walkLeftLock = false;
        }
    }

    private resetPosition() {
        this.x = 80;
        this.y = 1;
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
                if(!this.walkLeftLock){
                    this.walkLeft = true
                }
                break;
            case "D":
            case "ARROWRIGHT":
                if(!this.walkRightLock){
                    this.walkRight = true
                }
                break;
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.walkLeft = false
                break;
            case "D":
            case "ARROWRIGHT":
                this.walkRight = false
                break;
        }
    }
}

