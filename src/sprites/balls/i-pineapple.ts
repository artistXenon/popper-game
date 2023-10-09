import { Global } from "../../global";
import { Ball } from "../ball";
import { JMelon } from "./j-melon";

export class IPineapple extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 45;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof IPineapple) return new JMelon();
    }

    constructor() {
        super(0, 0, 230);
        this.weight = 40;
        const blob: Blob = Global.Engine.AssetLoader.getImage("face8");

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

        context.fillStyle = "#ddc";
        context.fill();

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -64, -64);
    }
}