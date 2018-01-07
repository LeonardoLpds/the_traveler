class Bee {
    constructor(game){
        this.game = game;
    }

    spawn(area){
        // Cria a abelha
        var bee = this.game.add.sprite(area.x, area.y, 'bee');
        this.game.physics.arcade.enable(bee);
        bee.anchor.setTo(0.5);
        bee.body.setSize(32,32,16,16);
        
        // Cria animações
        bee.animations.add('fly');
        bee.animations.play('fly', 10, true);

        // cria movimento
        if(area.v) {
            bee.body.velocity.y = 20;
            bee.update = () => { this._moveVertical(bee, area.x, area.y); }
        }
        else {
            bee.body.velocity.x = 20;
            bee.update = () => { this._moveHorizontal(bee, area.x, area.y); }
        }
        
        return bee;
    }

    _moveVertical(bee, startX, startY){
        if (bee.body.velocity.y > 0 && bee.y > startY + 30) {
            bee.body.velocity.y = -40;
        } else if (bee.body.velocity.y < 0 && bee.y < startY - 30) {
            bee.body.velocity.y = 40;
        }
    }

    _moveHorizontal(bee, startX, startY){
        if (bee.body.velocity.x > 0 && bee.x > startX + 30) {
            bee.body.velocity.x = -40;
        } else if (bee.body.velocity.x < 0 && bee.x < startX - 30) {
            bee.body.velocity.x = 40;
        }

        if (bee.body.velocity.x < 0)  bee.scale.x = 1;
        else bee.scale.x = -1;
    }
}