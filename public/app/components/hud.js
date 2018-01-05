class Hud {
    constructor(game){
        this.game = game;
        this.fontStyle = { font : "Press Start 2P", fontSize : 10, fill : "#FFF", align: "center" };
    }

    createHud(){
        // Cria o sprite de coin
        var coin = this.game.add.sprite(10, 10, 'coin');
        coin.animations.add('spin');
        coin.animations.play('spin', 10, true);
        coin.fixedToCamera = true;

        // Cria o texto que irá contar as coins
        this.coinCount = this.game.add.text(43, 16, "0/0", this.fontStyle);
        this.coinCount.fixedToCamera = true;
    }
}