class GreenMushroom {
    constructor(game){
        this.game     = game;
        this.mushroom = null;
    }

    spawnMushroom(map, next_map){
        // Cria sprite a partir da layer de objeto
        var mushroom = map.objects.object_layer.find(function(object){ if(object.name == 'green_mushroom') return object });
        this.mushroom = this.game.add.sprite(mushroom.x, mushroom.y, 'green_mushroom');

        // Definições do corpo
        this.game.physics.arcade.enable(this.mushroom);
        this.mushroom.body.setSize(35,30,46,0);
        this.mushroom.body.immovable = true;
        this.mushroom.anchor.setTo(0,1);

        // Cria animação
        this.mushroom.animations.add('explode');
        this.mushroom.animations.frame = 0;

        // Cria evento de finalização
        this.game.sounds.success.onStop.addOnce(function(){
            var map = new next_map(game);
            this.game.state.start("Play Game", true, false, map);
        }, this);
    }

    explode(player, mushroom) {
        if(!mushroom.body.touching.up) return false;

        this.game.sounds.bgm.stop();
        this.game.sounds.green_mushroom_explode.play();
        this.game.sounds.success.play();

        player.kill();

        mushroom.body.enable = false;
        mushroom.animations.play('explode', 10, false, true);
    }
}