import { Global } from "../../global";
import { Ball } from "../ball";
import { ETomato } from "./e-tomato";

export class DOrange extends Ball {
    private texture: ImageBitmap | undefined;
    public get Score(): number {
        return 10;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof DOrange) return new ETomato();
    }

    constructor() {
        super(0, 0, 70);
        this.weight = 4;
        
        const blob: Blob = Global.Engine.AssetLoader.getImage("face3");

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

        context.fillStyle = "orange";
        context.fill();

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -15, -15);
    }
}