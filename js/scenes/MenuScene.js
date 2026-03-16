/* =====================================================
   MenuScene.js — Écran titre
===================================================== */

var MenuScene = new Phaser.Class({

  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key:'Menu' }); },

  create: function() {
    var W = this.cameras.main.width;
    var H = this.cameras.main.height;

    /* ── Fond dégradé ─────────────────────────── */
    var gfx = this.add.graphics();
    gfx.fillGradientStyle(0x07050E, 0x07050E, 0x0E0C1E, 0x0E0C1E, 1);
    gfx.fillRect(0, 0, W, H);

    /* ── Tile floor (décoration bas) ──────────── */
    if (this.textures.exists('floor_dark_wood')) {
      var floor = this.add.tileSprite(0, H - 80, W, 80, 'floor_dark_wood').setOrigin(0, 0);
      floor.setAlpha(0.45);
    }

    /* ── Logo / titre ─────────────────────────── */
    // Sous-titre
    this.add.text(W/2, H * 0.18, 'PORTFOLIO INTERACTIF', {
      fontFamily: '"Press Start 2P"', fontSize: '9px',
      color: '#7A6A40', letterSpacing: 4,
    }).setOrigin(0.5);

    // Titre principal
    this.add.text(W/2, H * 0.28, 'LUCAS\nREQUENA', {
      fontFamily: '"Press Start 2P"', fontSize: '28px',
      color: '#F0D060', align: 'center',
      stroke: '#3A2800', strokeThickness: 4,
      shadow: { offsetX:4, offsetY:4, color:'#000', blur:0, fill:true },
      lineSpacing: 12,
    }).setOrigin(0.5);

    // Classe RPG
    this.add.text(W/2, H * 0.46, 'Cloud Engineer  ·  DevSecOps  ·  OSINT', {
      fontFamily: '"Press Start 2P"', fontSize: '8px',
      color: '#C8A030',
    }).setOrigin(0.5);

    /* ── Règle ornementale ─────────────────────── */
    var ruleGfx = this.add.graphics();
    ruleGfx.lineStyle(1, 0x5A3800, 1);
    ruleGfx.lineBetween(W/2 - 300, H * 0.51, W/2 + 300, H * 0.51);

    /* ── Bouton PLAY ──────────────────────────── */
    var playText = this.add.text(W/2, H * 0.60,
      CV.t(CV.content.ui.newGame), {
      fontFamily: '"Press Start 2P"', fontSize: '12px',
      color: '#F0F0D0',
      stroke: '#000', strokeThickness: 2,
      padding: { x:20, y:12 },
      backgroundColor: '#2A1A08',
    }).setOrigin(0.5).setInteractive({ useHandCursor:true });

    playText.on('pointerover',  function() { this.setColor('#F8E800'); });
    playText.on('pointerout',   function() { this.setColor('#F0F0D0'); });
    playText.on('pointerdown',  function() { this.scene.startGame(); });

    /* Clignotement */
    this.tweens.add({
      targets: playText,
      alpha: { from:1, to:0.4 },
      duration: 700,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    /* ── Bouton langue ─────────────────────────── */
    var langBtn = this.add.text(W - 24, 20,
      '[' + CV.t(CV.content.ui.lang) + ']', {
      fontFamily: '"Press Start 2P"', fontSize: '9px',
      color: '#7A6A40',
    }).setOrigin(1, 0).setInteractive({ useHandCursor:true });

    langBtn.on('pointerover', function() { this.setColor('#C8A030'); });
    langBtn.on('pointerout',  function() { this.setColor('#7A6A40'); });
    langBtn.on('pointerdown', function() {
      CV.lang = (CV.lang === 'fr') ? 'en' : 'fr';
      this.scene.scene.restart();
    });

    /* ── Contrôles ─────────────────────────────── */
    this.add.text(W/2, H * 0.76, CV.t(CV.content.ui.controls), {
      fontFamily: '"Press Start 2P"', fontSize: '7px',
      color: '#4A4030', align: 'center',
    }).setOrigin(0.5);

    /* ── Tagline ───────────────────────────────── */
    this.add.text(W/2, H * 0.84, CV.t(CV.content.ui.tagline), {
      fontFamily: '"Press Start 2P"', fontSize: '7px',
      color: '#3A3020',
    }).setOrigin(0.5);

    /* Crédit assets */
    this.add.text(W/2, H - 18,
      'Sprites: Modern Interiors (Limezu, CC0) · Groom.png (CC0) · Phaser 3', {
      fontFamily: '"Press Start 2P"', fontSize: '5px', color: '#2A2018',
    }).setOrigin(0.5);

    /* ── Entrée clavier ────────────────────────── */
    this.input.keyboard.once('keydown-ENTER', function() { this.startGame(); }, this);
    this.input.keyboard.once('keydown-SPACE', function() { this.startGame(); }, this);
  },

  startGame: function() {
    this.cameras.main.fade(300, 0, 0, 0);
    this.time.delayedCall(300, function() {
      this.scene.start('Game');
    }, [], this);
  },

});
