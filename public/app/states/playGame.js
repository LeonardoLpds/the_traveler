var playGame = function(game){
    this.map            = {};
    this.player         = new Player(game);
    this.gamepad        = new Gamepad(game);
    this.coins          = new Coins(game);
    this.green_mushroom = new GreenMushroom(game);
}

playGame.prototype = {
    init: function(map) {
        this.map = map;
    },

    create: function () {
        // Carrega os áudios
        this.addAudios();

        // cria o mundo
        this.map.generateWorld();
        this.coins.spawnCoins(this.map.world, this.map.objects_ids.coins);

        // Cria o green mushroom
        this.green_mushroom.spawnMushroom(this.map.world, this.map.next_stage);

        // cria o personagem
        var object = this.map.world.objects.object_layer.find(function(object){ if(object.name == 'player') return object });
        this.player.spawnPlayer(object.x, object.y);

        // Detalhes especiais de cada mapa
        this.map.especials();

        // mapeia controles
        this.gamepad.generateKeys();

        // Inicia o BGM
        this.game.sounds.bgm.loop = true;
        this.game.sounds.bgm.play();
    },

    update: function() {
        // verifica colisões
        game.physics.arcade.collide(this.player.player, this.map.layers.collisions);
        game.physics.arcade.overlap(this.player.player, this.coins.group, this.coins.collectCoin, null, this);
        game.physics.arcade.collide(this.player.player, this.green_mushroom.mushroom, this.green_mushroom.explode, null, this);

        // define a camera
        game.camera.follow(this.player.player, Phaser.Camera.FOLLOW_PLATFORMER);

        // verifica movimentos do player
        this.player.move(this.gamepad.keys);

        // Update especial de cada mapa
        this.map.toUpdate(this.player);
    },

    addAudios: function(){
        this.game.sounds = {
            "bgm"   : game.add.audio("jungle_bgm"),
            "jump"  : game.add.audio("jump"),
            "death" : game.add.audio("death"),
            "coin" : game.add.audio("coin", 0.3)
        };
    }
}