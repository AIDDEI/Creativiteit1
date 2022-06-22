import * as PIXI from 'pixi.js';

export class UI extends PIXI.Container {

    scoreField:PIXI.Text

    doomClock:number = 3600 

    constructor(){
        super();
        const style = new PIXI.TextStyle({
            fontFamily: 'ArcadeFont',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })
    
        this.scoreField = new PIXI.Text(`Timer: `, style)
        // this.addChild(this.scoreField)
        this.scoreField.x = 10
        this.scoreField.y = 10
    }

    public update(delta:number){
        this.doomClock-=delta
        let secondsLeft = Math.floor(this.doomClock / 60)
        if(this.doomClock <= 0) {
            console.log("Doomsday has come!")
        } else {
            console.log(`Only ${secondsLeft} seconds left!`)
        }
    }
}