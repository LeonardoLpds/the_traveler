class Coins {
    constructor(game){
        this.game  = game;
        this.group = null;
    }

    spawnCoins(map, gid) {
        // Criando grupo
        this.group = this.game.add.group();
        this.group.enableBody = true;

        // Criando moedas a partir da layer de objetos
        map.createFromObjects('object_layer', gid, 'coin', 0, true, false, this.group);

        // Animando moedas
        this.group.callAll('animations.add', 'animations', 'spin');
        this.group.callAll('animations.play', 'animations', 'spin', 10, true);
    }

    collectCoin(player, coin) {
        this.game.sounds.coin.play();
        coin.kill();
    }
}