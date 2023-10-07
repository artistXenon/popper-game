import { Ball } from "../sprites/ball";
import { Box } from "../sprites/box";
import { PhysicalObject } from "../sprites/physical-object";
import { Vector2D } from "./vector2D";

const 
    cacheVector1 = new Vector2D(), 
    cacheVector2 = new Vector2D(),
    cacheVector3 = new Vector2D();

export function fixBalltoBallPenetration(subject: Ball, object: Ball) {
    const minDistance = subject.radius + object.radius;
    const actualDistance = Math.sqrt(Math.pow(subject.X - object.X, 2) + Math.pow(subject.Y - object.Y, 2));
    const surfaceDistance = minDistance - actualDistance;
    if (surfaceDistance < 0) {        
        return false;
    }

    subject.Position.copy(cacheVector1);
    cacheVector1.sub(object.Position);
    cacheVector1.unit();
    cacheVector1.mul(surfaceDistance / (subject.invertedWeight + object.invertedWeight));
    cacheVector1.copy(cacheVector2);

    cacheVector1.mul(subject.invertedWeight);
    cacheVector1.add(subject.Position);
    cacheVector1.copy(subject.Position);

    cacheVector2.mul(- object.invertedWeight);
    cacheVector2.add(object.Position);
    cacheVector2.copy(object.Position);

    return true
}

export function onBalltoBallCollision(subject: Ball, object: Ball) {
    subject.Position.copy(cacheVector1);

    cacheVector1.sub(object.Position);
    cacheVector1.unit();

    subject.Velocity.copy(cacheVector2);
    cacheVector2.sub(object.Velocity);

    const sepVelocity = cacheVector1.dot(cacheVector2);
    const newSepVelocity = -sepVelocity * Math.min(subject.elasticity, object.elasticity);
    const vsepDiff = newSepVelocity - sepVelocity;
    const impulse = vsepDiff / (subject.invertedWeight + object.invertedWeight);
    cacheVector1.mul(impulse);
    cacheVector1.copy(cacheVector2);

    cacheVector1.mul(subject.invertedWeight);
    cacheVector1.add(subject.Velocity);
    cacheVector1.copy(subject.Velocity);

    cacheVector2.mul(- object.invertedWeight);
    cacheVector2.add(object.Velocity);
    cacheVector2.copy(object.Velocity);
}

function balltoWallPosition(subject: Ball, object: Box) {
    object.Position.copy(cacheVector1);
    object.WallTo.copy(cacheVector2);
    cacheVector1.sub(subject.Position); // ballToWallStart
    
    cacheVector2.sub(object.Position);
    cacheVector2.unit();
    let closestDist = cacheVector2.dot(cacheVector1)
    if (closestDist > 0) return object.Position;

    subject.Position.copy(cacheVector1);
    cacheVector1.sub(object.WallTo); // wallEndToBall

    if (cacheVector2.dot(cacheVector1) > 0) return object.WallTo;
    
    cacheVector2.mul(closestDist);
    
    object.Position.copy(cacheVector1);
    cacheVector1.sub(cacheVector2);
    return cacheVector1;
}

export function fixBalltoWallPenetration(subject: Ball, object: Box) {
    balltoWallPosition(subject, object).copy(cacheVector1);
    cacheVector1.copy(cacheVector2);
    cacheVector1.sub(subject.Position);
    const collided = cacheVector1.mag() <= subject.radius;
    if (collided) {
        subject.Position.copy(cacheVector1);
        cacheVector1.sub(cacheVector2);
        cacheVector1.copy(cacheVector3);
        cacheVector1.unit();        
        cacheVector1.mul(subject.radius - cacheVector3.mag())
        cacheVector1.add(subject.Position);
        cacheVector1.copy(subject.Position);    
        
        // collision response
        subject.Position.copy(cacheVector1);
        cacheVector1.sub(cacheVector2)
        cacheVector1.unit(); // normal
        subject.Velocity.copy(cacheVector2);
        const sepVelocity = cacheVector2.dot(cacheVector1);
        const newSepVelocity = -sepVelocity * subject.elasticity;
        const vsepDiff = sepVelocity - newSepVelocity;
        cacheVector1.mul(-vsepDiff);
        cacheVector2.add(cacheVector1);
        cacheVector2.copy(subject.Velocity);
    }
    return collided;
}

export function updateKineticVector(subject: PhysicalObject, delay: number) {
    const time = delay / 1000;
    // this.acc = this.acc.unit().mult(this.acceleration);
    subject.Velocity.copy(cacheVector1);
    subject.Acceleration.copy(cacheVector2);
    cacheVector2.mul(time);
    cacheVector1.add(cacheVector2);
    cacheVector1.copy(subject.Velocity);
    // this.vel = this.vel.mult(1-friction);
    cacheVector1.mul(time);
    cacheVector1.add(subject.Position);
    cacheVector1.copy(subject.Position);

    // rotation
    subject.Transform.rotate(subject.angleVelocity * time);
    subject.angleVelocity *= 0.999;
}