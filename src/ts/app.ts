import * as PIXI from 'pixi.js'
import play from "../images/play.png"
import background from "../images/DreamSolveLogoSolid.png"

export class App{
    private pixiWidth = 800;
    private pixiHeight = 450;
    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    constructor() {
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader();
        this.loader.add('play', play)
        this.loader.add('background', background)
        this.loader.load(()=>this.loadCompleted());
    }

    loadCompleted(): void {
        let background = new PIXI.Sprite(this.loader.resources["background"].texture!);
        let play = new PIXI.Sprite(this.loader.resources["play"].texture!);
        this.pixi.stage.addChild(background);
        this.pixi.stage.addChild(play);

        play.interactive = true;
        play.buttonMode = true;
        play.on('pointerdown', this.onClick);

        play.anchor.set(0.5);
        play.y = 50;
        play.x = 400;

        background.width = 800;
        background.height = 450;
    }

    onClick() {
        console.log("klik");
        window.location.href="game.html"
    }
}

new App();
