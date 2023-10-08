import { Global } from "../../global";
import { Ball } from "../ball";
import { IPineapple } from "./i-pineapple";

export class HPeach extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 36;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof HPeach) return new IPineapple();
    }

    constructor() {
        super(0, 0, 200);
        this.weight = 30;
        const blob: Blob = Global.Engine.AssetLoader.getImage("face7");

        createImageBitmap(blob).then((b) => {
            this.texture = b;
        });
    }

    
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "#fcc";
        context.fill();

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -64, -60);
    }
}