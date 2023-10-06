import { Sprite } from "artistic-engine/sprite";

export class Scene extends Sprite {
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "#ffd";
        context.fillRect(0, 0, this.W, this.H);
    }
}