import { PhysicalObject } from "./physical-object";

export abstract class Ball extends PhysicalObject {
    public out: boolean = false;
    public outSince: number = 0;
    public radius: number;

    constructor(positionX: number, positionY: number, radius: number) {
        super(positionX, positionY);
        this.radius = radius;
        this.AccelY = 500;
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

        context.fillStyle = "black";
        context.fillRect(-5, 0, 10, 40);
    }

    public abstract get Score(): number;

    public abstract onCollide(ball: Ball): Ball | undefined;
}
