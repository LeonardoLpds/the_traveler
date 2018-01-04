Coins = function(game) {
    this.game  = game;
    this.group = null;

    this.spawnCoins = function(map) {
        this.group = this.game.add.group();
        this.group.enableBody = true;

        map.createFromObjects('object_layer', 208, 'coin', 0, true, false, this.group);

        this.group.callAll('animations.add', 'animations', 'spin');
        this.group.callAll('animations.play', 'animations', 'spin', 10, true);
    }

    this.collect = function (player, coin) {
        game.sounds.coin.play();
        coin.kill();
    }
}