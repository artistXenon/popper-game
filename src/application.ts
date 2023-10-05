import { Global } from "./global";

export async function onLoad() {
    (<any>window).Global = Global;
}