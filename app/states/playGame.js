var playGame = function(game){
    this.map     = new Map(game);
    this.player  = new Player(game);
    this.gamepad = new Gamepad(game);
    this.coins   = new Coins(game);
}

playGame.prototype = {
    create: function () {
        // Carrega os áudios
        this.addAudios();

        // cria o mundo
        this.map.generateWorld();
        this.coins.spawnCoins(this.map.world);

        // cria o personagem
        this.player.spawnPlayer(100, 0);

        // Envia layer para frente do player
        game.world.bringToTop(this.map.layers.bridge_front);

        // mapeia controles
        this.gamepad.generateKeys();

        // Inicia o BGM
        this.game.sounds.bgm.loop = true;
        this.game.sounds.bgm.play();
    },

    update: function() {
        // verifica colisões
        game.physics.arcade.collide(this.player.player, this.map.layers.collisions);
        game.physics.arcade.overlap(this.player.player, this.coins.group, this.coins.collect, null, this);

        // define a camera
        game.camera.follow(this.player.player, Phaser.Camera.FOLLOW_PLATFORMER);

        // verifica movimentos do player
        this.player.move(this.gamepad.keys);

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