import { Ball } from "../ball";
import { CGrape } from "./c-grape";

export class BStrawBerry extends Ball {
    public get Score(): number {
        return 3;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof BStrawBerry) return new CGrape();
    }

    constructor() {
        super(0, 0, 30);
        this.weight = 1;
    }

    
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "#f66";
        context.fill();

        context.fillStyle = "#ddd";
        const poss = [
            [0, 0],
            [19, 0],
            [5, 20],
            [12, -17],
            [-5, -17],
            [-15, 10]
        ];
        for (const pos of poss) {
            context.beginPath();
            context.arc(pos[0], pos[1], 2, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }
        // context.arc(5, 20, 4, 0, 2 * Math.PI);

        context.fillStyle = "#3c3";
        context.fillRect(-15, -33, 30, 8);

        // face
        context.fillStyle = "white";
        context.beginPath();
        context.moveTo(-5, 10);
        context.moveTo(5, 10);
        context.arc(0, 10, 5, Math.PI, 0);
        context.closePath();
        context.stroke();
        context.fill();
        context.fillStyle = "black";
        context.beginPath();
        context.arc(10, -10, 4, 0, 2 * Math.PI);
        context.arc(-10, -10, 4, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }
}