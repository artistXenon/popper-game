import { Global } from "./global";
import { Ball } from "./sprites/ball";
import { Box } from "./sprites/box";
import { PhysicalObject } from "./sprites/physical-object";
import { Scene } from "./sprites/scene";

export async function onLoad() {
    (<any>window).Global = Global;

    const engine = Global.Engine;

    const scene = new Scene();
    engine.Scene = scene;
    scene.Width = engine.Canvas.width;
    scene.Height = engine.Canvas.height;

    scene.attachChildren([
        new Ball(200, 200, 50),
        new Box(400, 400, 30, 30)
    ]);

    
    engine.setSubResetFunction(() => {
        for (let i = 0; i < scene.Children.length; i++) {
            const subject = scene.Children[i];
            if (!(subject instanceof PhysicalObject)) continue; // all physics
            for (let j = i; j < scene.Children.length; j++) {
                const object = scene.Children[j]; 
                if (!(subject instanceof PhysicalObject)) continue; //same as above
                
            }   
        }
    });
}


function round(number: number, precision: number = 4){
    let factor = 10**precision;
    return Math.round(number * factor) / factor;
}
