class Player {
    constructor(game){
        this.game = game;
        this.player = null;
    }

    spawnPlayer(x, y, hud){
        // Cria o player
        this.player = this.game.add.sprite(x, y, 'player');

        // Carrega animações
        this._createAnimatons();

        // Permite física
        this.game.physics.arcade.enable(this.player);

        // Definições do corpo
        this._createPlayerBody();

        // Define método de morte do player
        this.player.death = () => this._playerDeath();

        // Cria mecanica de vida (health)
        this.player.health = 3;
        this.player.hurt = () => this._hurtPlayer(hud);

        // Cria efeito de spawn
        this._playSpawnEffect(x, y);
    }

    _createAnimatons(){
        this.player.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
        this.player.animations.add('jump', [18, 19, 20, 21, 22, 23, 24, 25], 10, true);
        this.player.animations.add('fall', [28, 29, 30, 31, 32, 33, 34, 35], 10, true);
        this.player.animations.add('death', [36, 37], 5, true);
        this.player.animations.add('run', [38, 39, 40, 41, 42, 43], 12, true);
    }

    _createPlayerBody(){
        this.player.body.gravity.y = 1400;
        this.player.body.setSize(32,60,16,4);
        this.player.animations.play("idle");
        this.player.anchor.setTo(0.5);
        this.player.body.maxVelocity.y = 1000;
    }

    _hurtPlayer(hud) {
        if (this.player.hurting) return;

        this.player.health--;
        hud.loseHeart();
        if (this.player.health < 1) { this.player.death(); return; }

        this.player.hurting = true;
        this.player.tint = 0xff0000;
        this.game.add.tween(this.player).to( { alpha: 0 }, 100, null, true, 0, 10, false);

        setTimeout(()=>{
            this.player.hurting = false;
            this.player.tint = 0xFFFFFF;
            this.game.add.tween(this.player).to( { alpha: 1 }, 0, null, true, 0, 0, false);
        }, 1000);

        this.player.body.velocity.x = (this.player.scale.x == 1) ? -200 : 200;
        this.player.body.velocity.y = -500;
    }

    _playerDeath(){
        this.game.sounds.bgm.stop();
        this.game.sounds.death.play();
        this.game.state.start("Game Over", false, false, this.game.state.callbackContext);
    }

    _playSpawnEffect(x, y){
        var spawnPoint = this.game.add.sprite(x, y + 32, 'green_mushroom');
        spawnPoint.anchor.setTo(0.5,1);
        this.game.sounds.green_mushroom_explode.play();
        spawnPoint.animations.add('explode');
        spawnPoint.animations.play('explode', 10, false, false);
        this.player.body.velocity.y = -400;
    }

    move(keys, sounds){
        if(this.player.hurting) {
            this.player.animations.play("fall"); return;
        }

        // Pulo
        if (keys.up.isDown && this.player.body.onFloor()) {
            this.game.sounds.jump.play();
            this.player.body.velocity.y = -500;
        }

        // Esquerda
        if (keys.left.isDown) {
            if(keys.left.run) this.player.body.velocity.x = -200;
            else this.player.body.velocity.x = -100;

            this.player.scale.x = -1;
            this._moveAnimation();

        // Direita
        } else if (keys.right.isDown){
            if(keys.right.run) this.player.body.velocity.x = 200;
            else this.player.body.velocity.x = 100;

            this.player.scale.x = 1;
            this._moveAnimation();

        // Parado
        } else {
            this.player.body.velocity.x = 0;
            this._stillAnimation();
        }
    }

    _moveAnimation() {
        if (this.player.body.velocity.y < 0) {
            this.player.animations.play("jump");
        } else if (this.player.body.velocity.y > 0) {
            this.player.animations.play("fall");
        } else if (Math.abs(this.player.body.velocity.x) > 100) {
            this.player.animations.play("run");
        } else {
            this.player.animations.play("walk");
        }
    }

    _stillAnimation() {
        if (this.player.body.velocity.y < 0) {
            this.player.animations.play("jump");
        } else if (this.player.body.velocity.y > 0) {
            this.player.animations.play("fall");
        } else {
            this.player.animations.play("idle");
        }
    }

}