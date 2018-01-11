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
        var explosion = this.game.add.sprite(enemy.x, enemy.y, 'explosion_b');
        explosion.anchor.setTo(0.5);
        this.game.sounds.explosion_b.play();
        explosion.animations.add('explode');
        explosion.animations.play('explode', 12, false, false);

        enemy.kill();
    }
}