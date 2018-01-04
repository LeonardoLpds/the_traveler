var gameOver = function (game) {
    this.player = {};
};

gameOver.prototype = {
    init: function (player) {
        this.player = player;
        player.kill();
    },

    create: function () {
        var old = this.player;
        this.player = game.add.sprite(old.position.x, old.position.y, 'player');
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        this.player.scale.x = old.scale.x;
        this.player.anchor.setTo(0.5);
        this.player.animations.add('death', [36, 37], 5, true);
        this.player.animations.play('death');

        var player_tween = game.add.tween(this.player).to({ alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
        this.game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = -10;

        player_tween.onComplete.add(function () {
            this.game.state.start("Play Game")

            // Mostra o prompt de instalação postergado -----------------------
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(function (choiceResult) {
                    console.log(choiceResult.outcome);
                    if (choiceResult.outcome === 'dismissed') {
                        console.log('User cancelled installation');
                    } else {
                        console.log('User added to home screen');
                    }
                });
                deferredPrompt = null;
            }
            // FIM Mostra o prompt de instalação postergado --------------------

        }, this);
    },

    update: function () {
        //
    }
}