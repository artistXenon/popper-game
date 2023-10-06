import { Vector } from "artistic-engine";
import { Sprite } from "artistic-engine/sprite";

export abstract class PhysicalObject extends Sprite {
    public weight: number = 1;
    
    public rotation: number = 0;

    public Velocity: Vector.Vector2D = new Vector.Vector2D();

    public Acceleration: Vector.Vector2D = new Vector.Vector2D();   

    constructor(positionX: number, positionY: number) {
        super({ X: positionX, Y: positionY });
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
}
