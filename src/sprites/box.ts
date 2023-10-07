import { Vector } from "artistic-engine";
import { PhysicalObject } from "./physical-object";

export class Box extends PhysicalObject {
    public WallTo: Vector.Vector2D = new Vector.Vector2D();

    constructor(positionX: number, positionY: number, width: number, height: number, where: number = 0) {
        super(positionX, positionY);
        this.W = width;
        this.H = height;

        this.Position.copy(this.WallTo);

        if (where === 0)
            this.WallTo.X += this.W;
        else 
            this.WallTo.Y += this.H;
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.rect(0, 0, this.W, this.H);
        context.closePath();

        context.lineWidth = 8;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "#afa";
        context.fill();
    }
}
