import { Vector } from "artistic-engine";
import { Sprite } from "artistic-engine/sprite";

export abstract class PhysicalObject extends Sprite {
    public isPhysical = true;

    public elasticity = 0.7;

    public weight: number = 1;
    
    public angleVelocity: number = 0;

    public CentorPosition: Vector.Vector2D = new Vector.Vector2D();

    public Velocity: Vector.Vector2D = new Vector.Vector2D();

    public Acceleration: Vector.Vector2D = new Vector.Vector2D();   

    constructor(positionX: number, positionY: number) {
        super({ X: positionX, Y: positionY });
    }

    public get invertedWeight() {
        return this.weight === 0 ? 0 : (1 / this.weight);
    }
    
    public get VelX() {
        return this.Velocity.X;
    }
    
    public get VelY() {
        return this.Velocity.Y;
    }

    public get AccelX() {
        return this.Acceleration.X;
    }
    
    public get AccelY() {
        return this.Acceleration.Y;
    }

    public set VelX(x: number) {
        this.Velocity.X = x;
    }
    
    public set VelY(y: number) {
        this.Velocity.Y = y;
    }
    
    public set AccelX(x: number) {
        this.Acceleration.X = x;
    }
    
    public set AccelY(y: number) {
        this.Acceleration.Y = y;
    }
}
