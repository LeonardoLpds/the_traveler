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
        // Carregando mapa
        this.game.load.tilemap('grassland', 'assets/maps/grassland.json', null, Phaser.Tilemap.TILED_JSON);

        // Carregando Tilesets do mapa
        this.game.load.image('ground_brown', 'assets/tilesets/jungle/ground_brown.png');
        this.game.load.image('water',        'assets/tilesets/jungle/water.png');
        this.game.load.image('bottom_water', 'assets/tilesets/jungle/bottom_water.png');
        this.game.load.image('wall_brown',   'assets/tilesets/jungle/wall_brown.png');
        this.game.load.image('bridge',       'assets/tilesets/jungle/bridge.png');
        this.game.load.image('bottom_brown', 'assets/tilesets/jungle/bottom_brown.png');
        this.game.load.image('slopes_brown', 'assets/tilesets/jungle/slopes_brown.png');
        this.game.load.image('collisions',   'assets/tilesets/collisions.png');

        // Carregando nuvens
        this.game.load.image('cloud_1', 'assets/images/bg_cloud01.png');
        this.game.load.image('cloud_2', 'assets/images/bg_cloud02.png');
        this.game.load.image('cloud_3', 'assets/images/bg_cloud03.png');
        this.game.load.image('cloud_4', 'assets/images/bg_cloud04.png');
        this.game.load.image('cloud_5', 'assets/images/bg_cloud05.png');
        this.game.load.image('cloud_6', 'assets/images/bg_cloud06.png');
        this.game.load.image('cloud_7', 'assets/images/bg_cloud07.png');
        this.game.load.image('cloud_8', 'assets/images/bg_cloud08.png');

        // Carrega mushroom
        this.game.load.spritesheet('green_mushroom', 'assets/sprites/green_mushroom.png', 128, 32);

        // Carregando áudios
        this.game.load.audio("jump", "assets/sounds/effects/jump.ogg");
        this.game.load.audio("death", "assets/sounds/effects/death.ogg");
        this.game.load.audio("coin", "assets/sounds/effects/coin.ogg");
        this.game.load.audio("green_mushroom_explode", "assets/sounds/effects/green_mushroom_explode.ogg");
        this.game.load.audio("success", "assets/sounds/effects/success.ogg");
        this.game.load.audio("jungle_bgm", "assets/sounds/bgm/jungle.ogg");

        // Carregando botões
        this.game.load.spritesheet('btn_right', 'assets/sprites/buttons/right.png', 64, 64);
        this.game.load.spritesheet('btn_left', 'assets/sprites/buttons/right.png', 64, 64);
        this.game.load.spritesheet('btn_up', 'assets/sprites/buttons/right.png', 64, 64);

        // Carregando player
        this.game.load.spritesheet('player', 'assets/sprites/traveler.png', 64, 64);

        // Carregando moedas
        this.game.load.spritesheet('coin', 'assets/sprites/coin_gold.png', 32, 21);
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
