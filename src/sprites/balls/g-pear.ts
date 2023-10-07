import { Ball } from "../ball";
import { HPeach } from "./h-peach";

export class GPear extends Ball {
    public get Score(): number {
        return 28;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof GPear) return new HPeach();
    }

    constructor() {
        super(0, 0, 140);
        this.weight = 24;
    }

    
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "purple";
        context.fill();

        // context.

        // face
        context.fillStyle = "black";
        context.fillRect(-5, 0, 10, 40);
    }
}