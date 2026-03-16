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

    pixelArt:    false,   // we set NEAREST filter manually below
    antialias:   false,
    roundPixels: false,   // must stay false — roundPixels splits sprites at fractional zoom

    render: {
      pixelArt:       false,
      antialias:      false,
      antialiasGL:    false,
      roundPixels:    false,
    },
  };

  new Phaser.Game(config);

});
