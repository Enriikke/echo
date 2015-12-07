var Echo = Echo || {};

Echo.Player = function(game_state, position, properties) {
    "use strict";
    Echo.Prefab.call(this, game_state, position, properties);

    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add("walking-left", [0, 1, 2, 3], 10, true);
    this.animations.add("walking-right", [4, 5, 6, 7], 10, true);

    this.props = properties;

    this.frame = 12;
    this.props.direction = "left";
    this.props.state = "standing";
    this.queue = [];
    this.isReady = true;
    this.anchor.setTo(0.5);

    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
    this.game_state.camera.follow(this)

    this.game_state.map.collideLeft = false;
    this.game_state.map.collideRight = false;
    this.game_state.map.collideDown = false;
    this.game_state.map.faceUp = true;
    this.game_state.map.faceDown = false;
    this.game_state.map.faceLeft = false;
    this.game_state.map.faceRight = false;

    // sound effects
    this.sfx_jump = this.game.add.audio("sfx_jump");
};

Echo.Player.prototype = Object.create(Echo.Prefab.prototype);
Echo.Player.prototype.constructor = Echo.Player;

Echo.Player.prototype.update = function () {
    "use strict";
    if (this.props.state != "jumping")
      this.game_state.game.physics.arcade.collide(this, this.game_state.layers.platforms);

    if (false) { // Toggle this dynamically
        if (this.cursors.right.isDown) {
          this.body.velocity.x = +this.props.walking_speed;
          this.props.direction = "right";
          this.props.state = "walking";
          this.animations.play("walking-right");
        } else if (this.cursors.left.isDown) {
          this.body.velocity.x = -this.props.walking_speed;
          this.props.direction = "left";
          this.props.state = "walking";
          this.animations.play("walking-left");
        } else {
          this.stop();
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
          this.body.velocity.y = -this.props.jumping_speed;
          this.sfx_jump.play();
        }

        if (this.body.velocity.y < 0) {
          this.animations.stop();
          this.props.state = "jumping";

          if (this.props.direction == "left") {
            this.frame = 10;
          } else {
            this.frame = 11;
          }
        } else if (this.body.velocity.y > 0) {
          this.animations.stop();
          this.props.state = "falling";

          if (this.props.direction == "left") {
            this.frame = 8;
          } else {
            this.frame = 9;
          }
        }
    } else {
        this.execute();

        if (this.props.state == "walking" && this.props.direction == "right") {
          this.body.velocity.x = +this.props.walking_speed;
          this.animations.play("walking-right");
        } else if (this.props.state == "walking" && this.props.direction == "left") {
          this.body.velocity.x = -this.props.walking_speed;
          this.animations.play("walking-left");
        } else {
          this.stop();
        }

        if (this.body.velocity.y < 0) {
          this.animations.stop();
          this.props.state = "jumping";

          if (this.props.direction == "left") {
            this.frame = 10;
          } else {
            this.frame = 11;
          }
        } else if (this.body.velocity.y > 0) {
          this.animations.stop();
          this.props.state = "falling";
          if (!this.isReady) this.isReady = true;

          if (this.props.direction == "left") {
            this.frame = 8;
          } else {
            this.frame = 9;
          }
        }
    }
};

Echo.Player.prototype.execute = function () {
  if (this.isReady && this.queue.length > 0) {
    var action = this.queue[0];
    if (action == "walk") this.performWalk();
    else if (action == "jump") this.performJump();
    else if (action == "turn-right") this.performTurn("right");
    else if (action == "turn-left") this.performTurn("left");
  }
};

Echo.Player.prototype.walk = function () {
    this.queue.push("walk");
};

Echo.Player.prototype.performWalk = function () {
    this.isReady = false;
    this.queue.shift();
    this.props.state = "walking";
    if (this.props.direction == "right") {
      this.body.velocity.x = +this.props.walking_speed;
      this.animations.play("walking-right");
    } else {
      this.body.velocity.x = -this.props.walking_speed;
      this.animations.play("walking-left");
    }

    var that = this;
    window.setTimeout(function () {
      that.stop();
      that.isReady = true;
    }, 500);
};

Echo.Player.prototype.turn = function (direction) {
    if (direction == "left") {
      this.queue.push("turn-left");
    } else {
      this.queue.push("turn-right");
    }
};

Echo.Player.prototype.performTurn = function (direction) {
    this.isReady = false;
    this.queue.shift();
    this.props.direction = direction;
    if (this.props.direction == "left") {
      this.frame = 12;
    } else {
      this.frame = 13;
    }

    this.isReady = true;
};

Echo.Player.prototype.jump = function () {
    this.queue.push("jump");
};

Echo.Player.prototype.performJump = function () {
    this.isReady = false;
    if (this.body.blocked.down) {
      this.queue.shift();
      this.props.state = "jumping";
      this.body.velocity.y = -this.props.jumping_speed;
      this.sfx_jump.play();
    }
};

Echo.Player.prototype.stop = function () {
    this.body.velocity.x = 0;
    this.animations.stop();
    this.props.state = "standing";
    if (this.props.direction == "left") {
      this.frame = 12;
    } else {
      this.frame = 13;
    }
};
