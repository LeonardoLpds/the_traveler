var playGame = function(game){ 
    this.map    = new Map(game);
    this.player = new Player(game); 
    
    this.keys   = {}
}

playGame.prototype = {
    create: function () {
        // cria o mundo
        this.map.generateWorld();
        
        // cria o personagem
        this.player.spawnPlayer(100, 0);

        // Envia layer para frente do player
        game.world.bringToTop(this.map.layers.bridge_front);

        // mapeia controles
        this.keys = {
            'left' : game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            'right' : game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            'up' : game.input.keyboard.addKey(Phaser.Keyboard.UP)
        }
    },

    update: function() {
        // verifica colisões
        game.physics.arcade.collide(this.player.player, this.map.layers.collisions);

        // define a camera
        game.camera.follow(this.player.player, Phaser.Camera.FOLLOW_PLATFORMER);

        // verifica movimentos do player
        this.player.move(this.keys);

    }
}