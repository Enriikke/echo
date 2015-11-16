//= require ../phaser.min
//= require ./objects/prefab
//= require ./objects/player/player
//= require_tree ./states

var Echo = Echo || {};

Echo.game = new Phaser.Game(700, 480, Phaser.AUTO);
Echo.game.state.add("Boot", new Echo.BootState());
Echo.game.state.add("Load", new Echo.LoadState());
Echo.game.state.add("Game", new Echo.GameState());

Echo.game.state.start("Boot", true, false, "level1_config.json");
