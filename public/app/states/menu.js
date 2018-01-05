var menu = function(game) {
    this.fontStyle = { font : "Press Start 2P", fontSize : 30, fill : "#FFF", align: "center" };
};

menu.prototype = {
    create: function () {
        var newGameText = game.add.text(
            this.world.centerX,
            this.world.centerY,
            "Novo Jogo",
            this.fontStyle
        );

        newGameText.anchor.setTo(0.5);

        newGameText.inputEnabled = true;
        var map = new Grassland(game);
        newGameText.events.onInputDown.add( () => this.game.state.start("Play Game", true, false, map) );
    },

    update: function () {
        //
    }
}