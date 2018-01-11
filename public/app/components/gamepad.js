class Gamepad {
    constructor(game){
        this.game    = game;
        this.keys    = {};
        this.buttons = {};
    }

    generateKeys() {
        // Criando chaves
        this.keys = {
            'left'  : this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            'right' : this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            'up'    : this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
        };

        // Mapeando botões da tela
        if(!this.game.device.desktop){
            this._createButtons();
        }

        // Ativa a habilidade de corrida
        this._enableRun();
    }

    _createButtons() {
        // Esquerda
        this.buttons.left = this.game.add.button(30, this.game.height - 42, 'btn_left', null, this, 0, 0, 1, 0);
        this.buttons.left.onInputDown.add(() => this.keys.left.isDown = true, this);
        this.buttons.left.onInputUp.add(() => this.keys.left.isDown = false, this);

        // Direita
        this.buttons.right = this.game.add.button(92, this.game.height - 42, 'btn_right', null, this, 0, 0, 1, 0);
        this.buttons.right.onInputDown.add(() => this.keys.right.isDown = true, this);
        this.buttons.right.onInputUp.add(() => this.keys.right.isDown = false, this);

        // Cima
        this.buttons.up = this.game.add.button(this.game.width - 62, this.game.height - 42, 'btn_up', null, this, 0, 0, 1, 0);
        this.buttons.up.onInputDown.add(() => this.keys.up.isDown = true, this);
        this.buttons.up.onInputUp.add(() => this.keys.up.isDown = false, this);

        // Fixando botões na tela
        for (var button in this.buttons ) { this.buttons[button].fixedToCamera = true; }
    }

    _enableRun() {
        // Criando timers
        this.keys.right.timer = this.game.time.create();
        this.keys.left.timer = this.game.time.create();

        // Direita
        if(!this.game.device.desktop) this.buttons.right.onInputDown.add( function() { this._checkRunKey( this.keys.right ) }, this);
        this.keys.right.onDown.add( function() { this._checkRunKey( this.keys.right ) }, this);

        // Esquerda
        if(!this.game.device.desktop) this.buttons.left.onInputDown.add( function() { this._checkRunKey( this.keys.left ) }, this);
        this.keys.left.onDown.add( function() { this._checkRunKey( this.keys.left ) }, this);
    }

    _checkRunKey(key) {
        if(key.timer.running == false) { key.run = false; key.timer.start(); }

        else if(key.timer.ms > 0 && key.timer.ms <= 180){ key.run = true; key.timer.stop();}

        else { key.run = false; key.timer.stop(); key.timer.start();}
    }
}