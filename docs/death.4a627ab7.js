function e(e,t,i,r){Object.defineProperty(e,t,{get:i,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},n=i.parcelRequirefac4;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},i.parcelRequirefac4=n),n.register("27Lyk",(function(t,i){var r,o;e(t.exports,"register",(()=>r),(e=>r=e)),e(t.exports,"resolve",(()=>o),(e=>o=e));var n={};r=function(e){for(var t=Object.keys(e),i=0;i<t.length;i++)n[t[i]]=e[t[i]]},o=function(e){var t=n[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),n("27Lyk").register(JSON.parse('{"jX1Z2":"death.4a627ab7.js","hoU9W":"deathground.f2a8f3e7.jpg","alPZG":"try-again.ddfec3f2.png","eXZVG":"menu.03584c6c.png","i7Rub":"death.752fb891.js"}'));var a,d=n("31xg4");a=new URL(n("27Lyk").resolve("hoU9W"),import.meta.url).toString();var l;l=new URL(n("27Lyk").resolve("alPZG"),import.meta.url).toString();var s;s=new URL(n("27Lyk").resolve("eXZVG"),import.meta.url).toString();new class{pixiWidth=800;pixiHeight=450;constructor(){this.pixi=new d.Application({width:this.pixiWidth,height:this.pixiHeight}),this.pixi.stage.interactive=!0,this.pixi.stage.hitArea=this.pixi.renderer.screen,document.body.appendChild(this.pixi.view),this.loader=new d.Loader,this.loader.add("backgroundTexture",t(a)).add("playTexture",t(l)).add("menuTexture",t(s)),this.loader.load((()=>this.loadCompleted()))}loadCompleted(){let e=new d.Sprite(this.loader.resources.backgroundTexture.texture);this.pixi.stage.addChild(e);let t=new d.Sprite(this.loader.resources.playTexture.texture);this.pixi.stage.addChild(t);let i=new d.Sprite(this.loader.resources.menuTexture.texture);this.pixi.stage.addChild(i),e.width=800,e.height=450,t.interactive=!0,t.buttonMode=!0,t.on("pointerdown",this.playAgain),t.anchor.set(.5),t.y=150,t.x=400,i.interactive=!0,i.buttonMode=!0,i.on("pointerdown",this.backToMenu),i.anchor.set(.5),i.y=300,i.x=400}playAgain(){window.location.href="game.html"}backToMenu(){window.location.href="index.html"}};
//# sourceMappingURL=death.4a627ab7.js.map
