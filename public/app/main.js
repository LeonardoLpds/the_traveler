var deferredPrompt;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log('Service worker registered!');
        })
        .catch(function (err) {
            console.log(err);
        });
}

window.addEventListener('beforeinstallprompt', function (event) {
    alert('Banner de instalação foi postergado');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

// Criando o game
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS);

// Adicionando states
game.state.add("Boot", boot);
game.state.add('Preload', preload);
game.state.add('Menu', menu);
game.state.add('Play Game', playGame);
game.state.add('Game Over', gameOver);

// Inicia a aplicação
game.state.start('Boot');