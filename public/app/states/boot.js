var boot = function(game){ }

boot.prototype = {
    preload: function () {
        //
    },
    create: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.refresh();

        this.game.state.start("Preload");
    }
}