import { Global } from "../../global";
import { Ball } from "../ball";
import { DOrange } from "./d-orange";

export class CGrape extends Ball {
    private texture: ImageBitmap | undefined;

    public get Score(): number {
        return 6;
    }
    public onCollide(ball: Ball): Ball | undefined {
        if (ball instanceof CGrape) return new DOrange();
    }

    constructor() {
        super(0, 0, 50);
        this.weight = 1.5;
        
        const blob: Blob = Global.Engine.AssetLoader.getImage("face2");

        createImageBitmap(blob).then((b) => {
            this.texture = b;
        });
    }

    
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        const poss = [[0, 0], [0, 27], [0, -27], [20, 13], [-20, 13], [28, -20], [-28, -20]];
        for (const pos of poss) {
            context.beginPath();
            context.arc(pos[0], pos[1], this.radius / 3, 0, 2 * Math.PI);
            context.closePath();
    
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.stroke();
    
            context.fillStyle = "#d7d";
            context.fill();            
        }

        context.fillStyle = "#2f2";
        context.fillRect(0, -30, -5, -30);
        context.fillRect(-20, -60, 26, 5);

        // context.

        // face
        if (!this.texture) return;
        
        context.drawImage(this.texture, -10, -10);
    }
}