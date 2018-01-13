var boot = function(game){ }

boot.prototype = {
    preload: function () {
        //
    },
    create: function () {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(1024/2, 672/2, 1024*2, 672*2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = false;

        this.game.state.start("Preload");
    }
}