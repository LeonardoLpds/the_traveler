var menu = function(game) { };

menu.prototype = {
    create: function () {

        var new_game = this.game.add.sprite(this.world.centerX, this.world.centerY, 'new-game');
        new_game.anchor.setTo(0.5);
        new_game.animations.add('idle')
        new_game.play('idle', 8, true);
        new_game.scale.setTo(1.5);
        
        new_game.inputEnabled = true;
        var map = new Grassland(game);
        new_game.events.onInputDown.add( () => this.game.state.start("Play Game", true, false, map) );
    },

    update: function () {
        //
    }
}