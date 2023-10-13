import { Global } from "../../global";
import { Ball } from "../ball";
import { IPineapple } from "./i-pineapple";

export class HPeach extends Ball {
    private texture: ImageBitmap | undefined;

    private gradient: CanvasGradient;

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

        this.gradient = Global.Engine.Context.createLinearGradient(0, -210, 0, 210);
        this.gradient.addColorStop(0, "#faa");
        this.gradient.addColorStop(1, "#fff");
    }

    
    onDraw(context: CanvasRenderingContext2D, _: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 10;
        context.strokeStyle = "#d55";
        context.stroke();

        context.fillStyle = this.gradient;
        context.fill();

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -64, -60);
    }
}