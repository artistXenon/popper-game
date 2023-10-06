import { PhysicalObject } from "./physical-object";

export class Box extends PhysicalObject {

    constructor(positionX: number, positionY: number, width: number, height: number) {
        super(positionX, positionY);
        this.W = width;
        this.H = height;
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
