import { Global } from "./global";
import { fixBalltoBallPenetration, fixBalltoWallPenetration, onBalltoBallCollision, updateKineticVector } from "./helper/physical-interaction";
import { Ball } from "./sprites/ball";
import { Box } from "./sprites/box";
import { PhysicalObject } from "./sprites/physical-object";
import { Scene } from "./sprites/scene";
import { CupResizer } from "./cup-resizer";

export async function onLoad() {
    (<any>window).Global = Global;

    const engine = Global.Engine;
    const scene = <Scene>engine.Scene;

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
                                pop.push([subject, object]);
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

            if (subject instanceof Ball) {
                if (
                    subject.X > CupResizer.rightX || 
                    subject.X < CupResizer.leftX || 
                    subject.Y > CupResizer.bottomY || 
                    subject.Y < CupResizer.topY
                ) {
                    if (!subject.out) {
                        subject.out = true;
                        subject.outSince = Date.now();
                    } else {
                        if (Date.now() - subject.outSince > 3000) {
                            const l = scene.Children;
                            for (let child of l) {
                                if (child instanceof Ball) scene.detachChildren(child);
                            }      
                            alert("GAME OVER: " + Global.score + "pt"); 
                            Global.score = 0;
                            return;
                        }             
                    }
                } else {
                    subject.out = false;
                }
            }            
        }
        for (let i = 0; i < pop.length; i++) {
            const element = pop[i];
            let bb = element[0].onCollide(element[1]);
            if (bb === undefined) continue;
            
            Global.score += bb.Score;
            if (Global.score > Global.highScore) Global.highScore = Global.score;

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
    const audios: AudioBufferSourceNode[] = [];
    const audioGains: GainNode[] = [];
    audios.length = 4;
    audioGains.length = 4;
    scene.loadFruit();
}
