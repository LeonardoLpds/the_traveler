class Enemies{
    constructor(game){
        this.game  = game;
        this.group = null;
    }

    spawnEnemies(enemies){
        this.group = this.game.add.group();

        // Criando inimigos
        enemies.forEach(enemy => {

            // Cria classe do inimigo definida no array de inimigos e cria um inimigo do tipo para cada área definida
            var enemy_object = new enemy.type(this.game);
            enemy.areas.forEach(area => {
                var temp_enemy = enemy_object.spawn(area)
                this.group.add( temp_enemy );

                // Define callback da morte do inimigo
                temp_enemy.death = ()=>{ this.death(temp_enemy) }
            });
        });
    }

    checkCollision(player, enemy){
        if((player.y + player.body.height * 0.5 < enemy.y) && player.body.velocity.y > 0){
            player.body.velocity.y = -500;
            enemy.death();
        } else {
            player.hurt();
        }
    }

    death(enemy){
        enemy.kill();
    }
}