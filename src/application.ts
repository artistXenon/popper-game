import { PointerEventGroup } from "artistic-engine/event";

import { Global } from "./global";
import { fixBalltoBallPenetration, fixBalltoWallPenetration, onBalltoBallCollision, updateKineticVector } from "./helper/physical-interaction";
import { Ball } from "./sprites/ball";
import { Orange } from "./sprites/balls/orange";
import { Strawberry } from "./sprites/balls/strawberry";
import { Pear } from "./sprites/balls/pear";
import { Cherry } from "./sprites/balls/cherry";
import { Box } from "./sprites/box";
import { PhysicalObject } from "./sprites/physical-object";
import { Scene } from "./sprites/scene";
import { Melon } from "./sprites/balls/melon";
import { WaterMelon } from "./sprites/balls/watermelon";
import { Grape } from "./sprites/balls/grape";

export async function onLoad() {
    (<any>window).Global = Global;

    const engine = Global.Engine;

    const scene = new Scene();
    engine.Scene = scene;
    scene.Width = engine.Canvas.width;
    scene.Height = engine.Canvas.height;

    const children = [
        new Box(0, 0, 0, scene.H, 1),
        new Box(0, scene.H - 100, scene.W, 0, 0),
        new Box(scene.W, 0, 0, scene.H, 1),
    ];

    scene.attachChildren(children);

    // children[2].angleVelocity = Math.PI / 6;

    let prevTime = Date.now();
    engine.setSubResetFunction(() => {
        const now = Date.now();
        const delay = now - prevTime;
        prevTime = now;

        let pop = [];

        for (let i = 0; i < scene.Children.length; i++) {
            const subject = scene.Children[i];
            if (!(subject instanceof PhysicalObject) || !subject.isPhysical) continue; // all physics

            for (let j = i + 1; j < scene.Children.length; j++) {
                const object = scene.Children[j]; 
                if (!(object instanceof PhysicalObject) || !object.isPhysical) continue; //same as above

                if (subject instanceof Ball) {
                    if (object instanceof Ball) {
                        if (fixBalltoBallPenetration(subject, object)) { // two balls collided

                            if (subject.radius === object.radius) {
                                pop.push([subject, object]);                          ;
                            }
                            onBalltoBallCollision(subject, object);
                        }
                    } else if (object instanceof Box) {
                        fixBalltoWallPenetration(subject, object);
                    }
                } else if (subject instanceof Box) {
                    if (object instanceof Ball) {
                        fixBalltoWallPenetration(object, subject);
                    }
                }
            }
            updateKineticVector(subject, delay);
        }
        for (let i = 0; i < pop.length; i++) {
            const element = pop[i];
            let bb;
            switch (element[0].radius) {
                case 20:
                    bb = new Cherry();
                    break;
                case 35:
                    bb = new Strawberry();
                    break;
                case 60:
                    bb = new Orange();
                    break;
                case 95:
                    bb = new Pear();
                    break;
                case 120:
                    bb = new Melon();
                    break;
                case 160:
                    bb = new WaterMelon();
                    break;
                case 200:
                    bb = new Grape();
                    break;
                default:
            }
            if (bb === undefined) continue;
            
            scene.detachChildren(element[0]);
            scene.detachChildren(element[1]);
            scene.attachChildren(bb);
            bb.X = (element[0].X + element[1].X) / 2;
            bb.Y = (element[0].Y + element[1].Y) / 2;
            bb.VelX = (element[0].VelX + element[1].VelX) / 2;
            bb.VelY = (element[0].VelY + element[1].VelY) / 2;
        }        
        pop = [];
    });

    const pEventGroup = new PointerEventGroup(engine);
    pEventGroup.registerPointerListener(scene);
    pEventGroup.registerEvent();
}
