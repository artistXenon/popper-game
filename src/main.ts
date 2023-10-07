import './style.css';

import { Engine } from 'artistic-engine';
import { Sprite } from 'artistic-engine/sprite';
import { EngineAssets } from './helper/engine-assets';
import { ResolutionVector2D } from './helper/resolution-vector2D';
import { Global } from './global';
import { onLoad } from './application';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<canvas id="main"></canvas>`;

const canvas = document.querySelector<HTMLCanvasElement>('canvas#main')!;
const engine = new Engine(canvas);
Global.Engine = engine;

addEventListener("resize", onResize);
onResize();

engine.start();

const assets = new EngineAssets(engine.AssetLoader);

assets.onLoad = onLoad;

function onResize() {  
    engine.resizeCanvas(); // { w: 1920*0.8, h: 1080*0.8 }
    ResolutionVector2D.baseVector.X = engine.Canvas.width;
    ResolutionVector2D.baseVector.Y = engine.Canvas.height;
    if (engine.Scene instanceof Sprite) {
        engine.Scene.Width = engine.Canvas.width;
        engine.Scene.Height = engine.Canvas.height;
    }
}
