Gamepad = function(game) {
    this.keys = {};
    this.buttons = {};

    this.generateKeys = function(){
        // Criando chaves
        this.keys = {
            'left' : game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            'right' : game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            'up' : game.input.keyboard.addKey(Phaser.Keyboard.UP)
        };

        // Mapeando botões da tela
        this.createButtons();

        // Ativa a habilidade de corrida
        this.enableRun();
    }

    this.createButtons = function(){
        // Esquerda
        this.buttons.left = game.add.button(30, game.height - 100, 'btn_left', null, this, 0, 0, 1, 0);
        this.buttons.left.onInputOver.add(() => this.keys.left.isDown = true, this);
        this.buttons.left.onInputDown.add(() => this.keys.left.isDown = true, this);
        this.buttons.left.onInputOut.add(() => this.keys.left.isDown = false, this);
        this.buttons.left.onInputUp.add(() => this.keys.left.isDown = false, this);

        // Direita
        this.buttons.right = game.add.button(130, game.height - 100, 'btn_right', null, this, 0, 0, 1, 0);
        this.buttons.right.onInputOver.add(() => this.keys.right.isDown = true, this);
        this.buttons.right.onInputDown.add(() => this.keys.right.isDown = true, this);
        this.buttons.right.onInputOut.add(() => this.keys.right.isDown = false, this);
        this.buttons.right.onInputUp.add(() => this.keys.right.isDown = false, this);

        // Cima
        this.buttons.up = game.add.button(game.width - 100, game.height - 100, 'btn_up', null, this, 0, 0, 1, 0);
        this.buttons.up.onInputOver.add(() => this.keys.up.isDown = true, this);
        this.buttons.up.onInputDown.add(() => this.keys.up.isDown = true, this);
        this.buttons.up.onInputOut.add(() => this.keys.up.isDown = false, this);
        this.buttons.up.onInputUp.add(() => this.keys.up.isDown = false, this);

        // Fixando botões na tela
        for (var button in this.buttons ) { this.buttons[button].fixedToCamera = true; }
    }

    this.enableRun = function() {
        //Criando timers
        this.keys.right.timer = game.time.create();
        this.keys.left.timer = game.time.create();

        // Direita
        this.buttons.right.onInputOver.add(function() { this.checkRunKey( this.keys.right ) }, this);
        this.buttons.right.onInputDown.add(function() { this.checkRunKey( this.keys.right ) }, this);
        this.keys.right.onDown.add(function() { this.checkRunKey( this.keys.right ) }, this);

        // Esquerda
        this.buttons.left.onInputOver.add(function() { this.checkRunKey( this.keys.left ) }, this);
        this.buttons.left.onInputDown.add(function() { this.checkRunKey( this.keys.left ) }, this);
        this.keys.left.onDown.add(function() { this.checkRunKey( this.keys.left ) }, this);
    }

    this.checkRunKey = function(key){
        if(key.timer.running == false) { key.run = false; key.timer.start(); }

        else if(key.timer.ms > 0 && key.timer.ms <= 180){ key.run = true; key.timer.stop(); key.timer.ms = 0;}

        else { key.run = false; key.timer.stop(); key.timer.ms = 0; key.timer.start();}
    }
}