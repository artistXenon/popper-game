import { IPointerListener } from "artistic-engine/event";
import { Sprite } from "artistic-engine/sprite";
import { DOrange } from "./balls/d-orange";
import { Ball } from "./ball";
import { BStrawBerry } from "./balls/b-strawberry";
import { CGrape } from "./balls/c-grape";
import { ACherry } from "./balls/a-cherry";
import { ETomato } from "./balls/e-tomato";

export class Scene extends Sprite implements IPointerListener {
    private fruitInFocus: Ball;

    constructor() {
        super();
        this.fruitInFocus = new ACherry();
        
        this.fruitInFocus.X = this.W / 2;
        this.fruitInFocus.Y = 100;
        this.fruitInFocus.isPhysical = false;
        this.attachChildren(this.fruitInFocus);
    }

    get PointerRegistered(): boolean {
        return true;
    }
    get RecieveEventsOutOfBound(): boolean {
        return true;
    }
    onPointer(e: PointerEvent): boolean {
        switch (e.type) {
            case "pointermove": 
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

    private newFruit(): Ball {
        const chance = Math.floor(Math.random() * 100);
        if (chance < 10) {
            if (
                (this.fruitInFocus instanceof ACherry && Date.now() % 4 === 0) ||
                (this.fruitInFocus instanceof BStrawBerry && Date.now() % 2 === 0)
            ) return this.newFruit();
            return new ACherry();
        }
        if (chance < 25) {
            if (
                (this.fruitInFocus instanceof BStrawBerry && Date.now() % 4 === 0) ||
                (this.fruitInFocus instanceof CGrape && Date.now() % 2 === 0)
            ) return this.newFruit();
            return new BStrawBerry();
        }
        if (chance < 45) {            
            if (
                (this.fruitInFocus instanceof CGrape && Date.now() % 4 === 0) ||
                (this.fruitInFocus instanceof DOrange && Date.now() % 2 === 0)
            ) return this.newFruit();
            return new CGrape();
        }
        if (chance < 75) {       
            if (
                (this.fruitInFocus instanceof DOrange && Date.now() % 4 === 0) ||
                (this.fruitInFocus instanceof ETomato && Date.now() % 2 === 0)
            ) return this.newFruit();
            return new DOrange();
        }
        if (this.fruitInFocus instanceof ETomato && Date.now() % 4 === 0) return this.newFruit();
        return new ETomato();
    }
}