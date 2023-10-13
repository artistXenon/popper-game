import { Global } from "../../global";
import { Ball } from "../ball";
import { HPeach } from "./h-peach";

export class GPear extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 28;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof GPear) return new HPeach();
    }

    constructor() {
        super(0, 0, 140);
        this.weight = 24;        
        const blob: Blob = Global.Engine.AssetLoader.getImage("face6");

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

        context.fillStyle = "#dd3";
        context.fill();
        
        context.fillStyle = "#aa6";
        const poss = [
            [100, 60],
            [110, 0],
            [90, 100],
            [120, 34],
            [72, 110],
            [120, -20]
        ]; 
        for (const pos of poss) {
            context.beginPath();
            context.arc(pos[1], -pos[0], 2, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
            context.beginPath();
            context.arc(pos[0], pos[1], 2, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }

        context.fillStyle = "black";
        context.fillRect(0, -150, 5, 30);
        

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -64, -60);
    }
}