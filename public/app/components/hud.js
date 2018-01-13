class Hud {
    constructor(game){
        this.game = game;
        this.fontStyle = { font : "Press Start 2P", fontSize : 8, fill : "#FFF", align: "center" };
    }

    createHud(){
        // Cria o sprite de uva
        var grape = this.game.add.sprite(10, 10, 'grape');
        grape.fixedToCamera = true;

        // Cria o texto que irá contar as grapes
        this.grapeCount = this.game.add.text(32, 16, "0/0", this.fontStyle);
        this.grapeCount.fixedToCamera = true;

        // Cria contator de vida
        this.heartGroup = this.game.add.group();
        [20, 30, 40].forEach(x => {
            var hearh = this.game.add.sprite(this.game.width - x, 20, 'heart', 0, this.heartGroup);
            hearh.frame = 0;
            hearh.anchor.setTo(0.5);
        });

        this.heartGroup.fixedToCamera = true;
    }

    loseHeart(){
        var heart = this.heartGroup.getFirstAlive();
        heart.alive = false;
        heart.frame = 2;
    }
}