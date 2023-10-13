import { IPointerListener } from "artistic-engine/event";
import { Sprite, TextSprite } from "artistic-engine/sprite";
import { DOrange } from "./balls/d-orange";
import { Ball } from "./ball";
import { BStrawBerry } from "./balls/b-strawberry";
import { CGrape } from "./balls/c-grape";
import { ACherry } from "./balls/a-cherry";
import { ETomato } from "./balls/e-tomato";
import { CupResizer } from "../cup-resizer";
import { Box } from "./box";
import { ComputedVector2D } from "../helper/computed-vector2D";
import { Global } from "../global";

export class Scene extends Sprite implements IPointerListener {
    private fruitInFocus: Ball | undefined;

    private score: TextSprite = new TextSprite();

    constructor() {
        super();                
        const children = [
            new Box(),
            new Box(),
            new Box(),
        ];
        children[0].Position = new ComputedVector2D(
            () => CupResizer.leftX,
            () => CupResizer.topY
        );
        children[0].WallTo = new ComputedVector2D(
            () => CupResizer.leftX,
            () => CupResizer.bottomY
        );
        children[1].Position = new ComputedVector2D(
            () => CupResizer.leftX,
            () => CupResizer.bottomY
        );
        children[1].WallTo = new ComputedVector2D(
            () => CupResizer.rightX,
            () => CupResizer.bottomY
        );
        children[2].Position = new ComputedVector2D(
            () => CupResizer.rightX,
            () => CupResizer.topY
        );
        children[2].WallTo = new ComputedVector2D(
            () => CupResizer.rightX,
            () => CupResizer.bottomY
        );

        this.attachChildren(children);

        this.score.Property.font = "40px sans-serif";
        this.score.Position = CupResizer.scoreAt;
        this.score.Text = "0";
        this.attachChildren(this.score);
    }

    get PointerRegistered(): boolean {
        return true;
    }
    get RecieveEventsOutOfBound(): boolean {
        return true;
    }
    onPointer(e: PointerEvent): boolean {
        if (!this.fruitInFocus) {
            if (e.type === "pointerup") Global.Engine.AssetLoader.load();
            return true;
        }
        // do init
        switch (e.type) {
            case "pointermove": 
                this.fruitInFocus.X = Math.min(
                    CupResizer.rightX - this.fruitInFocus.radius, 
                    Math.max(
                        e.x, 
                        CupResizer.leftX + this.fruitInFocus.radius)    
                    );
                this.fruitInFocus.Y = 100;                
                break;
            case "pointerup": 
                if (CupResizer.leftX > e.x || CupResizer.rightX < e.x) {
                    return true;
                }
                this.fruitInFocus.isPhysical = true;                        
                const x = this.fruitInFocus.X;
                this.fruitInFocus = this.newFruit();
                
                this.fruitInFocus.X = x;
                this.fruitInFocus.Y = 100;
                this.fruitInFocus.isPhysical = false;
                this.attachChildren(this.fruitInFocus);
        }
        return true;
    }
    onDraw(context: CanvasRenderingContext2D, _: number): void {
        context.fillStyle = "#ffd";
        context.fillRect(0, 0, this.W, this.H);
        this.score.Text = Global.score + "";
    }

    public loadFruit() {
        this.fruitInFocus = new ACherry();
        
        this.fruitInFocus.X = this.W / 2;
        this.fruitInFocus.Y = 100;
        this.fruitInFocus.isPhysical = false;
        this.attachChildren(this.fruitInFocus);
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