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
    }

    this.createButtons = function(){
        // Esquerda
        this.buttons.left = game.add.button(30, game.height - 100, 'btn_left', null, this, 0, 0, 1, 0);
        this.buttons.left.onInputDown.add(() => this.keys.left.isDown = true, this);
        this.buttons.left.onInputUp.add(() => this.keys.left.isDown = false, this);

        // Direita
        this.buttons.right = game.add.button(130, game.height - 100, 'btn_right', null, this, 0, 0, 1, 0);
        this.buttons.right.onInputDown.add(() => this.keys.right.isDown = true, this);
        this.buttons.right.onInputUp.add(() => this.keys.right.isDown = false, this);

        // Cima
        this.buttons.up = game.add.button(game.width - 100, game.height - 100, 'btn_up', null, this, 0, 0, 1, 0);
        this.buttons.up.onInputDown.add(() => this.keys.up.isDown = true, this);
        this.buttons.up.onInputUp.add(() => this.keys.up.isDown = false, this);

        // Fixando botões na tela
        for (var button in this.buttons ) { this.buttons[button].fixedToCamera = true; }

        console.log(game.height);
    }
}