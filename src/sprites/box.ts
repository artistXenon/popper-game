import { Vector } from "artistic-engine";
import { PhysicalObject } from "./physical-object";

export class Box extends PhysicalObject {
    public WallTo: Vector.Vector2D = new Vector.Vector2D();

    constructor() {
        super(0, 0);
    }

    onDraw(context: CanvasRenderingContext2D, _: number): void {
        this.W = this.WallTo.X - this.X;
        this.H = this.WallTo.Y - this.Y;
        context.beginPath();
        context.moveTo(0, 0)
        context.lineTo(this.W, this.H);
        context.closePath();

        context.lineWidth = 8;
        context.strokeStyle = "black";
        context.stroke();
    }
}
