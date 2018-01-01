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
        this.game.load.tilemap('map', 'assets/maps/jungle.json', null, Phaser.Tilemap.TILED_JSON);

        // Carregando Tilesets do mapa
        this.game.load.image('ground_brown', 'assets/tilesets/jungle/ground_brown.png');
        this.game.load.image('water',        'assets/tilesets/jungle/water.png');
        this.game.load.image('bottom_water', 'assets/tilesets/jungle/bottom_water.png');
        this.game.load.image('wall_brown',   'assets/tilesets/jungle/wall_brown.png');
        this.game.load.image('bridge',       'assets/tilesets/jungle/bridge.png');
        this.game.load.image('bottom_brown', 'assets/tilesets/jungle/bottom_brown.png');
        this.game.load.image('slopes_brown', 'assets/tilesets/jungle/slopes_brown.png');
        this.game.load.image('collisions',   'assets/tilesets/collisions.png');

        // Carregando player
        this.game.load.spritesheet('player', 'assets/sprites/traveler.png', 64, 64);
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
