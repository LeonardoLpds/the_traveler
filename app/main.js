// Criando o game
var game = new Phaser.Game(800, 600, Phaser.CANVAS);

// Adicionando states
game.state.add("Boot", boot);
game.state.add('Preload', preload);
game.state.add('Menu', menu);
game.state.add('Play Game', playGame);
game.state.add('Game Over', gameOver);

// Inicia a aplicação
game.state.start('Boot');