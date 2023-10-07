import { AssetLoader } from "artistic-engine/loader";

import face1 from "../assets/face1.png";
import face2 from "../assets/face2.png";
import face3 from "../assets/face3.png";
import face4 from "../assets/face4.png";
import face5 from "../assets/face5.png";

export class EngineAssets {
    private assetLoader: AssetLoader;

    private fonts = [
        // { name: "P", source: "url(https://fonts.gstatic.com/s/rubikiso/v2/x3dickHUfr-S4VAI4sAxefoDjy8.woff2)" },
    ];
    
    private images = [
        { name: "face1", source: face1 },
        { name: "face2", source: face2 },
        { name: "face3", source: face3 },
        { name: "face4", source: face4 },
        { name: "face5", source: face5 },
        // { name: "hololive_logo", source: hololive_logo },
    ];

    constructor(assetLoader: AssetLoader) {
        this.assetLoader = assetLoader;

        this.registerFonts();
        this.registerImages();

        this.assetLoader.onLoad = () => {
            this.onLoad();
        }
        this.assetLoader.load();
    }

    private registerFonts() {
        for (const { name, source } of this.fonts) {
            this.assetLoader.addFont(name, source);    
        }
    }

    public registerImages() {
        for (const { name, source } of this.images) {
            this.assetLoader.addImages(name, source);    
        }
    }

    public onLoad() {
        // TODO: whatever that is to be done after assets are loaded
    }
}
