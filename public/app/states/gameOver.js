var gameOver = function(game) {
    this.obj = {};
};

gameOver.prototype = {
    init: function (context) {
        this.obj = context;
        context.player.player.kill();
    },

    create: function () {
        var old = this.obj.player.player;
        this.obj.player.player = game.add.sprite(old.position.x, old.position.y, 'ghost');
        game.camera.follow(this.obj.player.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.obj.player.player.scale.x = old.scale.x;
        this.obj.player.player.anchor.setTo(0.5);
        this.obj.player.player.animations.add('death');
        this.obj.player.player.animations.play('death', 15, true);

        var player_tween = game.add.tween(this.obj.player.player).to({alpha: 0}, 5000, Phaser.Easing.Linear.None, true);
        this.game.physics.arcade.enable(this.obj.player.player);
        this.obj.player.player.body.gravity.y = -10;

        player_tween.onComplete.add(function(){
            this.game.state.start("Play Game", true, false, this.obj.map)
        } ,this);
    },

    update: function () {
        //
    }
}