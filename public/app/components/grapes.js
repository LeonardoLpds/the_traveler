class Grapes {
    constructor(game){
        this.game  = game;
        this.group = null;
    }

    spawnGrapes(map, gid, hud) {
        // Criando grupo
        this.group = this.game.add.group();
        this.group.enableBody = true;

        // Criando uvas a partir da layer de objetos
        map.createFromObjects('object_layer', gid, 'grape', 0, true, false, this.group);

        // Armazenando total de uvas e zerando pontos
        this.total = this.group.children.length;
        this.score = 0;

        // Iniciando texto do hud
        hud.grapeCount.text = this.score + "/" + this.total;
    }

    collectGrape(player, grape) {
        this.game.sounds.grape.play();
        grape.kill();
        this.grapes.score += 1;
        this.hud.grapeCount.text = this.grapes.score + "/" + this.grapes.total;
    }
}