class Map {
    constructor(game) {
        this.game         = game;
        this.world        = null;
        this.layers       = {};
        this.tilesets     = [];
        this.layers_names = [];
        this.tiles        = {};
        this.objects_ids  = {};
        this.next_stage   = {};
    }

    generateWorld(){
        // Carrega os tilesets
        this.tilesets.forEach(function(tileset){
            this.world.addTilesetImage(tileset);
        }, this);

        // Cria todas as layers do mapa
        this.layers_names.forEach(function(layer){
            this.layers[layer] = this.world.createLayer(layer);
            this.layers[layer].renderSettings.enableScrollDelta = false;
        }, this);

        // Cria colisões
        this._createCollisions();

        // Oculta as layers de colisões
        this.layers.collisions.visible = false;

        // Redimensiona o mundo
        this.layers.main.resizeWorld();
    }

    _createCollisions(){
        // Cria as colisões completas
        this.world.setCollision([this.tiles.block], true, this.layers.collisions);

        // Seta colisões apenas no topo
        this._createTopCollisions(this.tiles.top);

        // Zonas de morte
        this.world.setTileIndexCallback(this.tiles.kill, this.killZone, this, this.layers.collisions);
    }

    _createTopCollisions(tile_key){
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

    killZone(obj){
        if (obj.key == "player") {
            obj.death();
        }
    }
}