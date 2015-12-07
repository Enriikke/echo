var Echo = Echo || {};

Echo.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

Echo.BootState.prototype = Object.create(Phaser.State.prototype);
Echo.BootState.prototype.constructor = Echo.BootState;

Echo.BootState.prototype.init = function (level_file) {
    "use strict";
    this.level_file = level_file;
};

Echo.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);
};

Echo.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);
    this.game.state.start("Load", true, false, level_data);
};
