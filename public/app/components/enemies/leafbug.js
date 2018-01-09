class Leafbug {
    constructor(game){
        this.game = game;
    }

    spawn(area){
        // Cria o inseto
        var leafbug = this.game.add.sprite(area.x, area.y, 'leafbug');
        this.game.physics.arcade.enable(leafbug);
        leafbug.anchor.setTo(0.5);
        leafbug.body.setSize(32,32,16,16);
        
        // Cria animações
        leafbug.animations.add('fly');
        leafbug.animations.play('fly', 10, true);

        // cria movimento
        if(area.v) {
            leafbug.body.velocity.y = 20;
            leafbug.update = () => { this._moveVertical(leafbug, area.x, area.y); }
        }
        else {
            leafbug.body.velocity.x = 20;
            leafbug.update = () => { this._moveHorizontal(leafbug, area.x, area.y); }
        }

        leafbug.scale.x = -1;
        return leafbug;
    }

    _moveVertical(leafbug, startX, startY){
        if (leafbug.body.velocity.y > 0 && leafbug.y > startY + 45) {
            leafbug.body.velocity.y = -40;
        } else if (leafbug.body.velocity.y < 0 && leafbug.y < startY - 45) {
            leafbug.body.velocity.y = 40;
        }
    }

    _moveHorizontal(leafbug, startX, startY){
        if (leafbug.body.velocity.x > 0 && leafbug.x > startX + 45) {
            leafbug.body.velocity.x = -40;
        } else if (leafbug.body.velocity.x < 0 && leafbug.x < startX - 45) {
            leafbug.body.velocity.x = 40;
        }

        if (leafbug.body.velocity.x < 0)  leafbug.scale.x = -1;
        else leafbug.scale.x = 1;
    }
}