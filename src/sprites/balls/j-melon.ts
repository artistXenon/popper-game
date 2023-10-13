import { Global } from "../../global";
import { Ball } from "../ball";
import { KWaterMelon } from "./k-watermelon";

export class JMelon extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 55;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof JMelon) return new KWaterMelon();
    }

    constructor() {
        super(0, 0, 270);
        this.weight = 50;
        const blob: Blob = Global.Engine.AssetLoader.getImage("face9");

        createImageBitmap(blob).then((b) => {
            this.texture = b;
        });
    }

    
    onDraw(context: CanvasRenderingContext2D, _: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "#afa";
        context.fill();

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -64, -60);
    }
}