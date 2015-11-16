var Echo = Echo || {};

Echo.LoadState = function () {
    "use strict";
    Phaser.State.call(this);
};

Echo.LoadState.prototype = Object.create(Phaser.State.prototype);
Echo.LoadState.prototype.constructor = Echo.LoadState;

Echo.LoadState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
};

Echo.LoadState.prototype.preload = function () {
    "use strict";

    var assets, asset_loader, asset_key, asset;
    assets = this.level_data.assets;
    for (asset_key in assets) {
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            case "audio":
                this.load.audio(asset_key, asset.source);
            }
        }
    }
};

Echo.LoadState.prototype.create = function () {
    "use strict";
    this.game.state.start("Game", true, false, this.level_data);
};
