var menu = function(game) {
    this.fontStyle = { font : "Press Start 2P", fontSize : 10, fill : "#FFF", align: "center" };
};

menu.prototype = {
    create: function () {

        var new_game = game.add.text(this.world.centerX, this.world.centerY, "Novo jogo", this.fontStyle);
        new_game.anchor.setTo(0.5);

        new_game.inputEnabled = true;
        var map = new Forest(game);
        new_game.events.onInputDown.add( () => this.game.state.start("Play Game", true, false, map) );
    },

    update: function () {
        //
    }
}