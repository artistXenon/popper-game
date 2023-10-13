import { Vector } from "artistic-engine";

export class CupResizer {
    private constructor() {}

    public static state: number = 0;

    public static leftX: number;
    public static rightX: number;
    public static topY: number;
    public static bottomY: number;

    public static scoreAt: Vector.Vector2D = new Vector.Vector2D();

    public static resize(x: number, y: number) {
        const screen_ratio = y / x;
        if (screen_ratio > 1.5) {
            CupResizer.state = 0;
            CupResizer.leftX = 0;
            CupResizer.rightX = x;
            CupResizer.topY = y - x * 1.1;
            CupResizer.bottomY = y;
            CupResizer.scoreAt.X = 10;
            CupResizer.scoreAt.Y = 10;
        } else if (screen_ratio > 0.75) {
            CupResizer.state = 1;
            const h = y * 5 / 6;
            const w = h * 5 / 6;
            CupResizer.leftX = (x - w) / 2;
            CupResizer.rightX = x - CupResizer.leftX;
            CupResizer.topY = y - h;
            CupResizer.bottomY = y;
            CupResizer.scoreAt.X = 10;
            CupResizer.scoreAt.Y = 10;
        } else {
            CupResizer.state = 2;
            const h = y * 0.8;
            const w = h * 5 / 6;
            CupResizer.rightX = x / 2 - w / 8;
            CupResizer.leftX = CupResizer.rightX - w;
            CupResizer.topY = y - h;
            CupResizer.bottomY = y;            
            CupResizer.scoreAt.X = x / 2 + 10;
            CupResizer.scoreAt.Y = 10;
        }
        // this.topleft.X = leftX;
        // this.topleft.Y = topY;
        // this.bottomleft.X = leftX;
        // this.bottomleft.Y = bottomY;
        // this.topright.X = rightX;
        // this.topright.Y = topY;
        // this.bottomright.X = rightX;
        // this.bottomright.Y = bottomY;
    }

    
}