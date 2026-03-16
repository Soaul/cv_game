/* =====================================================
   Preload.js — Chargement de tous les assets
===================================================== */

var PreloadScene = new Phaser.Class({

  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key:'Preload' }); },

  preload: function() {
    var W = this.cameras.main.width;
    var H = this.cameras.main.height;

    /* ── Barre de chargement ──────────────────── */
    var barBg = this.add.rectangle(W/2, H/2, 400, 20, 0x2A2010).setOrigin(0.5);
    var barFg = this.add.rectangle(W/2 - 200, H/2, 0, 16, 0xC8A030).setOrigin(0, 0.5);
    var label = this.add.text(W/2, H/2 - 30, 'CHARGEMENT...', {
      fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#C8A030',
    }).setOrigin(0.5);

    this.load.on('progress', function(v) { barFg.width = 396 * v; });
    this.load.on('complete', function() { label.setText('OK'); });

    /* ── Sprites personnage ─────────────────────
       Groom.png : 7 colonnes × 4 rangées, 88×77 px par frame
       Row 0 = bas/sud   Row 1 = gauche/ouest
       Row 2 = droite/est  Row 3 = haut/nord            */
    /* Groom.png : 8 colonnes × 4 rangées, 77×77 px par frame
       Row 0 = front/down  Row 1 = left  Row 2 = right  Row 3 = back/up */
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 77, frameHeight: 77,
    });

    /* ── Tilesets ─────────────────────────────── */
    this.load.image('interiors', 'assets/interiors.png');
    this.load.image('rooms',     'assets/rooms.png');

    /* ── Textures de sol (extraites) ──────────── */
    this.load.image('floor_light_wood', 'assets/floor_light_wood.png');
    this.load.image('floor_dark_wood',  'assets/floor_dark_wood.png');
    this.load.image('floor_carpet',     'assets/floor_carpet.png');
    this.load.image('floor_stone',      'assets/floor_stone.png');
    this.load.image('floor_herring',    'assets/floor_herring.png');
    this.load.image('floor_pale_wood',  'assets/floor_pale_wood.png');

    /* ── Meubles ──────────────────────────────── */
    var furniture = [
      'reception_desk','sofa','plant_large','plant_small',
      'window_curtain','rug_red','rug_large','mirror',
      'frame_sm1','frame_sm2',
      'office_desk','monitor_setup','monitor_large','blackboard',
      'bookshelf','bookshelf_store','globe','calendar',
      'school_desks','whiteboard','desk_chair','desk_small',
      'server_pc','world_map','wardrobe',
      'stove','fridge','sink','cabinet','armchair',
      'door',
    ];
    furniture.forEach(function(key) {
      this.load.image(key, 'assets/' + key + '.png');
    }, this);

    /* ── Audio (optionnel) ────────────────────── */
    this.load.audio('bgm', ['assets/music/theme.ogg', 'assets/music/theme.mp3']);
  },

  create: function() {
    /* ── Animations du joueur ─────────────────── */
    var A = this.anims;
    var fps = 9;

    /* 8 cols × 4 rows = 32 frames, 77×77 px
       Row 0 (frames  0-7 ): facing DOWN
       Row 1 (frames  8-15): facing LEFT
       Row 2 (frames 16-23): facing RIGHT
       Row 3 (frames 24-31): facing UP   */

    // DOWN
    A.create({ key:'walk_down',  frames: A.generateFrameNumbers('player',{start:1, end:6}),  frameRate:fps, repeat:-1 });
    A.create({ key:'idle_down',  frames: [{key:'player', frame:0}], frameRate:1 });

    // LEFT
    A.create({ key:'walk_left',  frames: A.generateFrameNumbers('player',{start:9, end:14}), frameRate:fps, repeat:-1 });
    A.create({ key:'idle_left',  frames: [{key:'player', frame:8}], frameRate:1 });

    // RIGHT
    A.create({ key:'walk_right', frames: A.generateFrameNumbers('player',{start:17, end:22}),frameRate:fps, repeat:-1 });
    A.create({ key:'idle_right', frames: [{key:'player', frame:16}], frameRate:1 });

    // UP
    A.create({ key:'walk_up',    frames: A.generateFrameNumbers('player',{start:25, end:30}),frameRate:fps, repeat:-1 });
    A.create({ key:'idle_up',    frames: [{key:'player', frame:24}], frameRate:1 });

    this.scene.start('Menu');
  },

});
