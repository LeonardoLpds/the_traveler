Map = function(game) {
    this.game = game;
    this.world = null;
    this.layers = {};
    
    this.tilesets = ["ground_brown","water","bottom_water","wall_brown","bridge","bottom_brown","slopes_brown", "collisions"];
    this.layers_names = ["water","water_objects","main_back","main_front","bridge_back","bridge_front","collisions"];
    this.tiles = {"block" : 203, "top" : 200, "kill" : 227}

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
        this.layers_names.forEach(function(layer){
            this.layers[layer] = this.world.createLayer(layer);
        }, this);

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
        this.createTopCollisions(this.tiles.top);

        // Zonas de morte
        this.world.setTileIndexCallback(this.tiles.kill, this.killZone, this, this.layers.collisions);
    }

    this.killZone = function(obj) {
        if (obj.key == "player") {
            obj.death();
        }
    }

    this.createTopCollisions = function(tile_key) {
        var x, y, tile;
        for (x = 0; x < this.world.width; x++) {
            for (y = 1; y < this.world.height; y++) {
                tile = this.world.getTile(x, y, this.layers.collisions);
                if (tile !== null) {
                    if (tile.index == tile_key) {
                        tile.setCollision(false, false, true, false);
                    }
                }
            }
        }
    }
}