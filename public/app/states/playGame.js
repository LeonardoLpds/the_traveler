var playGame = function(game){
    this.map            = {};
    this.player         = new Player(game);
    this.gamepad        = new Gamepad(game);
    this.grapes         = new Grapes(game);
    this.hud            = new Hud(game);
    this.enemies        = new Enemies(game);
}

playGame.prototype = {
    init: function(map) {
        this.map = map;
    },

    create: function () {
        game.time.advancedTiming = true;

        // Carrega os áudios
        this.addAudios();

        // cria o mundo
        this.map.generateWorld();

        // Cria o hud
        this.hud.createHud();

        // Cria as uvas
        this.grapes.spawnGrapes(this.map.world, this.map.objects_ids.grapes, this.hud);

        // Cria os inimigos
        this.enemies.spawnEnemies(this.map.enemies);

        // cria o personagem
        var object = this.map.world.objects.object_layer.find(function(object){ if(object.name == 'player') return object });
        this.player.spawnPlayer(object.x, object.y, this.hud);

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

        game.physics.arcade.overlap(this.player.player, this.grapes.group, this.grapes.collectGrape, null, this);
        game.physics.arcade.overlap(this.player.player, this.enemies.group, this.enemies.checkCollision, null, this);

        // define a camera
        game.camera.follow(this.player.player, Phaser.Camera.FOLLOW_PLATFORMER);

        // verifica movimentos do player
        this.player.move(this.gamepad.keys);

        // Update especial de cada mapa
        this.map.toUpdate(this.player);
    },

    addAudios: function(){
        this.game.sounds = {
            "bgm" : game.add.audio("forest_bgm"),
            "jump" : game.add.audio("jump"),
            "death" : game.add.audio("death"),
            "grape" : game.add.audio("grape", 0.3),
            "success" : game.add.audio("success"),
            "explosion_b" : game.add.audio("explosion_b"),
            "hurt" : game.add.audio("hurt")
        };
    },

    render: function(){
        // game.debug.text('render FPS: ' + (game.time.fps || '--') , 2, 14, "#00ff00");
    }
}