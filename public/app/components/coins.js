class Coins {
    constructor(game){
        this.game  = game;
        this.group = null;
    }

    spawnCoins(map, gid, hud) {
        // Criando grupo
        this.group = this.game.add.group();
        this.group.enableBody = true;

        // Criando moedas a partir da layer de objetos
        map.createFromObjects('object_layer', gid, 'coin', 0, true, false, this.group);

        // Animando moedas
        this.group.callAll('animations.add', 'animations', 'spin');
        this.group.callAll('animations.play', 'animations', 'spin', 10, true);

        // Armazenando total de moedas e zerando pontos
        this.total = this.group.children.length;
        this.score = 0;

        // Iniciando texto do hud
        hud.coinCount.text = this.score + "/" + this.total;
    }

    collectCoin(player, coin) {
        this.game.sounds.coin.play();
        coin.kill();
        this.coins.score += 1;
        this.hud.coinCount.text = this.coins.score + "/" + this.coins.total;
    }
}