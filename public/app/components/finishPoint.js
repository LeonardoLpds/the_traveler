FinishPoint = function(game) {
    this.game  = game;
    this.point = null;

    this.spawnFinishPoint = function(map) {
        // Cria sprite a partir da layer de objeto
        var mushroom = map.objects.object_layer.find(function(object){ if(object.name == 'green_mushroom') return object });
        this.point = this.game.add.sprite(mushroom.x, mushroom.y - 16, 'green_mushroom');
        
        // Definições do corpo
        game.physics.arcade.enable(this.point);
        this.point.body.setSize(20,20,54,10);
        this.point.body.checkCollision.left = false;
        this.point.body.checkCollision.right = false;
        this.point.body.checkCollision.bottom = false;
        this.point.body.immovable = true;
        this.point.anchor.setTo(0.5);
        
        // Cria animação
        this.point.animations.add('explode');
        this.point.animations.frame = 0;

        // Cria evento de finalização
        this.point.events.onKilled.add(function(){
            game.state.start("Play Game", true)
        }, this);
    }

    this.finishLevel = function (player, point) {
        if(!point.body.touching.up) return false;
        
        game.sounds.bgm.stop();
        game.sounds.death.play();

        player.body.maxVelocity.x = 0;
        
        point.body.checkCollision.up = false;
        point.animations.play('explode', 10, false, true);
    }
}