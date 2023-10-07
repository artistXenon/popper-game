import { Ball } from "../ball";

export class KWaterMelon extends Ball {
    public get Score(): number {
        return 0;
    }
    public onCollide(ball: Ball): Ball | undefined {
        return;
    }

    constructor() {
        super(0, 0, 350);
        this.weight = 18;
    }

    
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "green";
        context.fill();

        // context.

        // face
        context.fillStyle = "black";
        context.fillRect(-5, 0, 10, 40);
    }
}