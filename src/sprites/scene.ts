import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";
import { Orange } from "./balls/orange";
import { Ball } from "./ball";
import { Cherry } from "./balls/cherry";
import { Strawberry } from "./balls/strawberry";
import { Berry } from "./balls/berry";

export class Scene extends Sprite implements IPointerListener {
    private fruitInFocus: Ball | undefined
    get PointerRegistered(): boolean {
        return true;
    }
    get RecieveEventsOutOfBound(): boolean {
        return true;
    }
    onPointer(e: PointerEvent): boolean {
        switch (e.type) {
            case "pointermove": 
                if (this.fruitInFocus === undefined) {
                    this.fruitInFocus = this.newFruit();
                    this.fruitInFocus.isPhysical = false;
                    this.attachChildren(this.fruitInFocus);
                }
                this.fruitInFocus.X = e.x;
                this.fruitInFocus.Y = 100;
                break;
            case "pointerup": 
                if (this.fruitInFocus) {
                    this.fruitInFocus.isPhysical = true;                        
                    this.fruitInFocus = this.newFruit();
                    
                    this.fruitInFocus.X = this.W / 2;
                    this.fruitInFocus.Y = 100;
                    this.fruitInFocus.isPhysical = false;
                    this.attachChildren(this.fruitInFocus);
                }
                

        }
        return true;
    }
    onDraw(context: CanvasRenderingContext2D, delay: number): void {
        context.fillStyle = "#ffd";
        context.fillRect(0, 0, this.W, this.H);
    }

    newFruit() {
        const chance = Math.floor(Math.random() * 100);
        if (chance < 25) {
            return new Berry();
        }
        if (chance < 60) {
            return new Cherry();
        }
        if (chance < 92) {
            return new Strawberry();
        }
        return new Orange();
    }
}