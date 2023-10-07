import { Global } from "../../global";
import { Ball } from "../ball";
import { GPear } from "./g-pear";

export class FApple extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 21;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof FApple) return new GPear();
    }

    constructor() {
        super(0, 0, 110);
        this.weight = 12;
        
        const blob: Blob = Global.Engine.AssetLoader.getImage("face5");

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

        context.fillStyle = "#d10";
        context.fill();

        context.fillStyle = "#2a2";
        context.fillRect(-5, -122, 6, 25);
        context.fillRect(1, -128, 6, 10);

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -30, -30);
    }
}