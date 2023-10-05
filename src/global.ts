import { Engine } from "artistic-engine";

export class Global {
    public static Engine: Engine;

    public static get Scene() {
        return Global.Engine.Scene;
    }
}