import { Global } from "../../global";
import { Ball } from "../ball";
import { FApple } from "./f-apple";

export class ETomato extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 15;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof ETomato) return new FApple();
    }

    constructor() {
        super(0, 0, 90);
        this.weight = 8;
        const blob: Blob = Global.Engine.AssetLoader.getImage("face4");

        createImageBitmap(blob).then((b) => {
            this.texture = b;
        });
    }

    
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 10;
        context.strokeStyle = "#a21";
        context.stroke();

        context.fillStyle = "#f53";
        context.fill();

        context.fillStyle = "#2f2";
        context.fillRect(-20, -60, 26, 5);
        context.fillRect(-5, -65, 20, 5);
        context.fillRect(-27, -70, 28, 5);
        context.fillRect(7, -70, 18, 5);

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -30, -30);
    }
}