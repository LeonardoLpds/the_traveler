GreenMushroom = function(game) {
    this.game  = game;
    this.mushroom = null;

    this.spawnMushroom = function(map) {
        // Cria sprite a partir da layer de objeto
        var mushroom = map.objects.object_layer.find(function(object){ if(object.name == 'green_mushroom') return object });
        this.mushroom = this.game.add.sprite(mushroom.x, mushroom.y - 16, 'green_mushroom');

        // Definições do corpo
        game.physics.arcade.enable(this.mushroom);
        this.mushroom.body.setSize(20,20,54,10);
        this.mushroom.body.checkCollision = {"left" : false, "right" : false, "down" : false, "up":true};
        this.mushroom.body.immovable = true;
        this.mushroom.anchor.setTo(0.5);

        // Cria animação
        this.mushroom.animations.add('explode');
        this.mushroom.animations.frame = 0;

        // Cria evento de finalização
        this.mushroom.events.onKilled.add(function(){
            game.state.start("Play Game", true)
        }, this);
    }

    this.explode = function (player, mushroom) {
        if(!mushroom.body.touching.up) return false;

        game.sounds.bgm.stop();
        game.sounds.death.play();

        player.body.maxVelocity.x = 0;

        mushroom.body.enable = false;
        mushroom.animations.play('explode', 10, false, true);
    }
}