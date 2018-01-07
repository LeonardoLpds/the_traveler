class Enemies{
    constructor(game){
        this.game  = game;
        this.group = null;
    }

    spawnEnemies(enemies){
        this.group = this.game.add.group();

        // Criando inimigos
        enemies.forEach(enemy => {
            var enemy_object = new enemy.type(this.game);
            enemy.areas.forEach(area => {
                this.group.add( enemy_object.spawn(area) );
            });
        });
    }

    checkCollision(player, enemy){
        
    }
}