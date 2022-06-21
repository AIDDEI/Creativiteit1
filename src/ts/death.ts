// Import PIXI
import * as PIXI from 'pixi.js';

// Import Images
import background from "../images/deathground.jpg";
import play from "../images/try-again.png";
import menu from "../images/menu.png";

export class Death{
    // Globals
    private pixiWidth = 800;
    private pixiHeight = 450;
    private pixi : PIXI.Application;
    private loader : PIXI.Loader;

    constructor() {
        // Create PIXI Stage
        this.pixi = new PIXI.Application({width: this.pixiWidth, height: this.pixiHeight});
        this.pixi.stage.interactive = true;
        this.pixi.stage.hitArea = this.pixi.renderer.screen;
        document.body.appendChild(this.pixi.view);

        // Create Loader
        this.loader = new PIXI.Loader();
        this.loader
            .add('backgroundTexture', background)
            .add('playTexture', play)
            .add('menuTexture', menu);
        this.loader.load(()=>this.loadCompleted());
    }

    private loadCompleted(){
        // Adding Background
        let background = new PIXI.Sprite(this.loader.resources['backgroundTexture'].texture!);
        this.pixi.stage.addChild(background);

        // Adding Playbutton
        let play = new PIXI.Sprite(this.loader.resources['playTexture'].texture!);
        this.pixi.stage.addChild(play);

        // Adding Menubutton
        let menu = new PIXI.Sprite(this.loader.resources['menuTexture'].texture!);
        this.pixi.stage.addChild(menu);

        // Background options
        background.width = 800;
        background.height = 450;

        // Playbutton options
        play.interactive = true;
        play.buttonMode = true;
        play.on('pointerdown', this.playAgain);

        play.anchor.set(0.5);
        play.y = 150;
        play.x = 400;

        // Menubutton options
        menu.interactive = true;
        menu.buttonMode = true;
        menu.on('pointerdown', this.backToMenu);

        menu.anchor.set(0.5);
        menu.y = 300;
        menu.x = 400;
    }

    playAgain(){
        window.location.href="game.html"
    }

    backToMenu(){
        window.location.href="index.html"
    }
}

new Death();