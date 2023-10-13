import { Engine } from "artistic-engine";

export class Global {
    public static score: number = 0;
    
    public static highScore: number = 0;

    public static Engine: Engine;

    public static get Scene() {
        return Global.Engine.Scene;
    }
}