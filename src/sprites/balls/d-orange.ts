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

    
    onDraw(context: CanvasRenderingContext2D, _: number): void {
        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();

        context.lineWidth = 8;
        context.strokeStyle = "#b76";
        context.stroke();

        context.fillStyle = "orange";
        context.fill();

        context.fillStyle = "#b76";
        const poss = [
            [50, 30],
            [55, 0],
            [45, 50],
            [60, 17],
            [36, 55],
            [60, -10]
        ]; 
        for (const pos of poss) {
            context.beginPath();
            context.arc(pos[0], pos[1], 2, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        }
        
        context.fillStyle = "#272";
        context.fillRect(-5, -68, 16, 5);

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -15, -15);
    }
}