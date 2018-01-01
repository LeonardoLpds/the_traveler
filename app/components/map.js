Map = function(game) {
    this.game = game;
    this.world = null;
    this.layers = {};
    this.tilesets = ["ground_brown","water","bottom_water","wall_brown","bridge","bottom_brown","slopes_brown", "collisions"];
    this.tiles = {"block" : 203, "top" : 200, "kill" : 228}

    this.generateWorld = function(){
        // Define cor do fundo
        this.game.stage.setBackgroundColor("#7ec0ee");

        // Carrega o mapa
        this.world = game.add.tilemap("map");

        // Carrega os tilesets
        this.tilesets.forEach(function(tileset){
            this.world.addTilesetImage(tileset);
        }, this);

        // Cria todas as layers do mapa
        this.layers = {
            "water"         : this.world.createLayer('water'),
            "water_objects" : this.world.createLayer('water_objects'),
            "main_back"     : this.world.createLayer('main_back'),
            "main_front"    : this.world.createLayer('main_front'),
            "bridge_back"   : this.world.createLayer('bridge_back'),
            "bridge_front"  : this.world.createLayer('bridge_front'),
            "collisions"    : this.world.createLayer('collisions'),
        };

        // Cria colisões
        this.createCollisions();

        // Oculta as layers de colisões
        this.layers.collisions.visible = false;

        // Redimensiona o mundo
        this.layers.main_back.resizeWorld();
    }

    this.createCollisions = function() {
        // Cria as colisões completas
        this.world.setCollision([this.tiles.block], true, this.layers.collisions);
        
        // Seta colisões apenas no topo
        var x, y, tile;
        for (x = 0; x < this.world.width; x++) {
            for (y = 1; y < this.world.height; y++) {
                tile = this.world.getTile(x, y, this.layers.collisions);
                if (tile !== null) {
                    if (tile.index == this.tiles.top) {
                        tile.setCollision(false, false, true, false);
                    }
                }
            }
        }
    }
}