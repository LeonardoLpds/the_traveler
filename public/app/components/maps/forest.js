class Forest extends Map{
    constructor(game){
        super(game)

        this.tilesets     = ["forest_tileset", "collisions"];
        this.layers_names = ["main","collisions"];
        this.tiles        = {"block" : 582, "top" : 576, "kill" : 678}
        this.objects_ids  = {"grapes" : 676};
        this.enemies      = [];
        this.next_stage   = Forest;
    }

    generateWorld(){
        // Carrega o mapa
        this.world = game.add.tilemap("forest");

        // Cria o mundo
        super.generateWorld();

        // Define cor do fundo
        this.game.stage.setBackgroundColor("#7ec0ee");
    }

    especials(){ }

    toUpdate(player){ }
}