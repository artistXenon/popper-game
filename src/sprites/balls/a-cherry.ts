import { Global } from "../../global";
import { Ball } from "../ball";
import { BStrawBerry } from "./b-strawberry";

export class ACherry extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 1;
    }

    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof ACherry) return new BStrawBerry();
    }

    constructor() {
        super(0, 0, 20);
        this.weight = 1;
        const blob: Blob = Global.Engine.AssetLoader.getImage("face1");

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

        context.fillStyle = "red";
        context.fill();

        context.beginPath();
        context.arc(20, -20, 20, Math.PI, Math.PI * 4 / 3);
        context.stroke();

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -8, -10);
    }
}