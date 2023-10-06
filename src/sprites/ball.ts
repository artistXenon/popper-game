import { PhysicalObject } from "./physical-object";

export class Ball extends PhysicalObject {
    public radius: number;


    constructor(positionX: number, positionY: number, radius: number) {
        super(positionX, positionY);
        this.radius = radius;
    }

    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 8;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "#faa";
        context.fill();
    }
}
