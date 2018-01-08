var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var gameRatio = innerWidth / innerHeight;

// Criando o game
var game = new Phaser.Game(Math.floor(400 * gameRatio), 400, Phaser.CANVAS);

// Adicionando states
game.state.add("Boot", boot);
game.state.add('Preload', preload);
game.state.add('Menu', menu);
game.state.add('Play Game', playGame);
game.state.add('Game Over', gameOver);

// Inicia a aplicação
game.state.start('Boot');