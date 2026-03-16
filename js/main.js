/* =====================================================
   main.js — Configuration et lancement de Phaser 3
===================================================== */
window.addEventListener('load', function () {

  var config = {
    type: Phaser.AUTO,

    scale: {
      mode:       Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width:  960,
      height: 624,
      parent: 'game-container',
    },

    backgroundColor: '#07050E',

    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug:   false,
      },
    },

    scene: [ PreloadScene, MenuScene, GameScene ],

    pixelArt:       true,
    antialias:      false,
    roundPixels:    true,

    render: {
      pixelArt: true,
    },
  };

  new Phaser.Game(config);

});
