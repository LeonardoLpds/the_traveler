var preload = function(game){
    this.fontsReady  = false;
    this.assetsReady = false;
};

preload.prototype = {
    preload: function () {
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

        this.loadAssets();
        this.loadFonts();
    },

    update: function () {
        if(this.fontsReady && this.assetsReady){
            this.game.state.start("Menu");
        }
    },

    // Carrega as fonts do Google
    loadFonts: function() {
        // Conexão com o Google Fonts
        const WebFontConfig = {
            active: this.fontIsReady.bind(this),
            google: { families: ['Indie Flower',  'Audiowide', 'Press Start 2P', 'VT323'] }
        };

        // Executa o script do Google
        this.load.script('webfont',
            "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
            () => WebFont.load(WebFontConfig)
        );
    },

    // Carrega todos os assets
    loadAssets: function() {
        // Carregando mapas
        this.game.load.tilemap('forest', 'assets/maps/forest/forest.json', null, Phaser.Tilemap.TILED_JSON);

        // Carregando Tilesets do mapa
        this.game.load.image('forest_tileset', 'assets/maps/forest/tilesets/forest_tileset.png');

        this.game.load.image('collisions', 'assets/tilesets/collisions.png');

        // Carregando áudios
        this.game.load.audio("jump", "assets/sounds/effects/jump.ogg");
        this.game.load.audio("death", "assets/sounds/effects/death.ogg");
        this.game.load.audio("grape", "assets/sounds/effects/grape.ogg");
        this.game.load.audio("success", "assets/sounds/effects/success.ogg");
        this.game.load.audio("explosion_b", "assets/sounds/effects/explosion_b.ogg");
        this.game.load.audio("hurt", "assets/sounds/effects/hurt.ogg");
        this.game.load.audio("forest_bgm", "assets/sounds/bgm/forest.ogg");

        // Carregando botões
        this.game.load.spritesheet('btn_right', 'assets/sprites/buttons/right.png', 32, 32);
        this.game.load.spritesheet('btn_left', 'assets/sprites/buttons/right.png', 32, 32);
        this.game.load.spritesheet('btn_up', 'assets/sprites/buttons/right.png', 32, 32);

        // Carregando player
        this.game.load.spritesheet('player', 'assets/sprites/players/fox.png', 32, 32, 13, 0, 1);
        this.game.load.spritesheet('ghost', 'assets/sprites/players/fox_ghost.png', 32, 38, 8);

        // Carregando moedas
        this.game.load.spritesheet('grape', 'assets/sprites/items/grape.png', 16, 16, 8);

        // Carregando corações (heart)
        this.game.load.spritesheet('heart', 'assets/sprites/hud/heart.png', 16, 16, 3);

        // Carregando inimigos
    },

    // Diz a aplicação que as fontes foram carregadas
    fontIsReady: function() {
        this.fontsReady = true;
    },

    // Diz a aplicação que todos os assets foram carregados
    onLoadComplete : function(){
        this.assetsReady = true;
    }
}
