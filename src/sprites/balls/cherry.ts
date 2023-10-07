import { Ball } from "../ball";

export class Cherry extends Ball {

    constructor() {
        super(0, 0, 35);
        this.weight = 1;
    }

    
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "pink";
        context.fill();

        // context.

        // face
        context.fillStyle = "black";
        context.fillRect(-5, 0, 10, 40);
    }
}