import { Global } from "../../global";
import { Ball } from "../ball";

export class KWaterMelon extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 0;
    }
    public onCollide(ball: Ball): Ball | undefined {
        return;
    }

    constructor() {
        super(0, 0, 350);
        this.weight = 70;
        const blob: Blob = Global.Engine.AssetLoader.getImage("face10");

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

        context.fillStyle = "#3c3";
        context.fill();

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -128, -127);
    }
}