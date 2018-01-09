class Grassland extends Map{
    constructor(game){
        super(game)

        this.tilesets     = ["ground_brown","water","bottom_water","wall_brown","bridge","bottom_brown","slopes_brown", "collisions","tree_light", "plants_objects"];
        this.layers_names = ["water","water_objects","main_back","main","bridge_back","bridge_front","collisions","decoration"];
        this.tiles        = {"block" : 203, "top" : 200, "kill" : 227}
        this.objects_ids  = {"coins" : 208};
        this.enemies      = [
            {"type":Bee,"areas":[{"x":500,"y":150,"v":true}, {"x":1320,"y":288,"v":false}, {"x":5524,"y":418,"v":true}, {"x":5755,"y":224,"v":false}]},
            {"type":Leafbug,"areas":[{"x":1000,"y":160,"v":false},{"x":1696,"y":280,"v":true},{"x":2432,"y":160,"v":false},{"x":2898,"y":448,"v":false},{"x":3536,"y":384,"v":true},{"x":4432,"y":348,"v":true}]}
        ];
        this.next_stage   = Grassland;

        this.clouds_positions = [{x:100, y:0, id:1},{x:300, y:100, id:2},{x:800, y:100,id:3},{x:1000, y:200,id:7},{x:1400, y:0,id:5},{x:1600, y:0,id:8},{x:1700, y:100,id:6},{x:2200, y:50,id:6},{x:2500, y:-30,id:8},{x:3000, y:200,id:2},{x:3600, y:50,id:6},{x:4500, y:0,id:2},{x:4700, y:150,id:1}];
    }

    generateWorld(){
        // Carrega o mapa
        this.world = game.add.tilemap("grassland");

        // Cria o mundo
        super.generateWorld();

        // Define cor do fundo
        this.game.stage.setBackgroundColor("#7ec0ee");

        // Cria as nuvens
        this.clouds = this.game.add.group();
        this.clouds_positions.forEach(function(position){
            var cloud = this.game.add.image(position.x, position.y, 'cloud_'+position.id, 0, this.clouds);
            this.game.add.tween(cloud).to({y : position.y + (Math.floor(Math.random() * 20) + 10)}, Math.floor(Math.random() * 2500) + 1800, null, true, 0, Number.MAX_VALUE, true);
        }, this);
    }

    especials(){
        this.game.world.bringToTop(this.layers.bridge_front);
        this.game.world.sendToBack(this.clouds);
    }

    toUpdate(player){
        this.clouds.x = (player.player.position.x) / 5;
    }
}