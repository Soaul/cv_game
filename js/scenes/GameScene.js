/* =====================================================
   GameScene.js — Scène de jeu principale
   5 salles côte à côte dans un monde de 4800×624px.
   Transitions par porte (marcher jusqu'au bord).
===================================================== */

var GameScene = new Phaser.Class({

  Extends: Phaser.Scene,
  initialize: function() { Phaser.Scene.call(this, { key:'Game' }); },

  /* ════════════════════════════════════════════
     CREATE
  ════════════════════════════════════════════ */
  create: function() {
    var self = this;
    var T    = CV.TILE;       // 48
    var RW   = CV.ROOM_W;     // 960
    var RH   = CV.ROOM_H;     // 624
    var WW   = CV.WORLD_W;    // 4800
    var DR   = CV.DOOR_ROW;   // 5
    var DRS  = CV.DOOR_ROWS;  // 3

    this.currentRoom  = 0;
    this.transitioning = false;
    this.playerDir    = 'down';

    /* ── Fond monde (évite le noir entre salles) ─ */
    // Rectangle couvrant tout le monde en couleur neutre de couloir
    var worldBg = this.add.rectangle(0, 0, WW, RH, 0x2A2010).setOrigin(0, 0).setDepth(-10);

    /* ── Groupes physiques ──────────────────────── */
    this.walls     = this.physics.add.staticGroup();
    this.furniture = this.physics.add.staticGroup();

    /* ── Interactibles (zones) ──────────────── */
    this.interactZones = [];   // [{zone: Phaser.Physics.Arcade.Image, iKey, roomIdx}]

    /* ── Construire les 5 salles ──────────── */
    CV.rooms.forEach(function(roomDef, i) {
      self._buildRoom(roomDef, i * RW, 0, i);
    });

    /* ── Joueur ─────────────────────────────── */
    /* Spawn room 0, milieu de la porte */
    this.player = this.physics.add.sprite(
      RW / 2, RH / 2, 'player'
    );
    this.player.setCollideWorldBounds(false);
    /* Pas de scale — frame natif 77×77, character content = x:20-56, y:15-74
       Hitbox = bande aux pieds (bas 16px de la zone de contenu) */
    this.player.body.setSize(34, 14);
    this.player.body.setOffset(22, 60);
    this.player.anims.play('idle_down');

    /* ── Collisions ─────────────────────────── */
    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.furniture);

    /* ── Caméra ─────────────────────────────── */
    this.physics.world.setBounds(0, 0, WW, RH);
    this.cameras.main.setBounds(0, 0, WW, RH);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setDeadzone(160, 80);

    /* ── Input ──────────────────────────────── */
    this.keys = this.input.keyboard.addKeys({
      up:    Phaser.Input.Keyboard.KeyCodes.UP,
      down:  Phaser.Input.Keyboard.KeyCodes.DOWN,
      left:  Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      w:     Phaser.Input.Keyboard.KeyCodes.W,
      s:     Phaser.Input.Keyboard.KeyCodes.S,
      a:     Phaser.Input.Keyboard.KeyCodes.A,
      d:     Phaser.Input.Keyboard.KeyCodes.D,
      q:     Phaser.Input.Keyboard.KeyCodes.Q,   // AZERTY
      z:     Phaser.Input.Keyboard.KeyCodes.Z,   // AZERTY
      e:     Phaser.Input.Keyboard.KeyCodes.E,
    });
    this.eJustPressed = false;

    /* ── HUD ─────────────────────────────────── */
    this._createHUD();

    /* ── Indicateur d'interaction ───────────── */
    this.interactHint = this.add.text(0, 0,
      CV.t(CV.content.ui.interact), {
      fontFamily: '"Press Start 2P"', fontSize: '7px',
      color: '#F8E800', stroke: '#000', strokeThickness: 2,
      padding: { x:6, y:4 }, backgroundColor: '#1A1000',
    }).setOrigin(0.5, 1).setDepth(20).setVisible(false);

    /* ── Audio (graceful) ────────────────────── */
    try {
      if (this.cache.audio.exists('bgm')) {
        this.bgm = this.sound.add('bgm', { loop:true, volume:0.35 });
        this.bgm.play();
      } else {
        this._startChiptune();
      }
    } catch(e) {
      this._startChiptune();
    }

    /* Fade-in */
    this.cameras.main.fadeIn(400, 0, 0, 0);
  },

  /* ════════════════════════════════════════════
     UPDATE
  ════════════════════════════════════════════ */
  update: function() {
    if (this.transitioning || CV.Dialog.isOpen()) {
      this.player.setVelocity(0, 0);
      return;
    }

    this._handleMovement();
    this._checkInteraction();
    this._checkDoors();
    this._updateHUD();
  },

  /* ════════════════════════════════════════════
     BUILD ROOM — construire une salle
  ════════════════════════════════════════════ */
  _buildRoom: function(def, rx, ry, roomIdx) {
    var T   = CV.TILE;
    var RW  = CV.ROOM_W;
    var RH  = CV.ROOM_H;
    var DR  = CV.DOOR_ROW;
    var DRS = CV.DOOR_ROWS;
    var g   = this.add.graphics();

    /* ── Sol ──────────────────────────────── */
    g.fillStyle(def.floorColor, 1);
    // Sol intérieur principal
    g.fillRect(rx + T, ry + T, RW - 2*T, RH - 2*T);
    // Remplir le couloir de porte (ouverture dans le mur) avec la couleur du sol
    // pour éviter que le fond noir de la scène ne soit visible
    if (def.doors && def.doors.east) {
      g.fillRect(rx + RW - T, ry + DR * T, T, DRS * T);
    }
    if (def.doors && def.doors.west) {
      g.fillRect(rx, ry + DR * T, T, DRS * T);
    }

    // Texture sol (TileSprite) si dispo
    if (this.textures.exists(def.floorTexture)) {
      var ts = this.add.tileSprite(rx + T, ry + T, RW - 2*T, RH - 2*T, def.floorTexture)
        .setOrigin(0, 0).setAlpha(0.55);
    }

    /* ── Murs — segments (avec espaces portes) ── */
    g.fillStyle(def.wallColor, 1);

    // Mur du HAUT (plein)
    g.fillRect(rx, ry, RW, T);

    // Mur du BAS (plein)
    g.fillRect(rx, ry + RH - T, RW, T);

    // Mur GAUCHE : avec trou si porte ouest
    if (def.doors && def.doors.west) {
      g.fillRect(rx, ry, T, DR * T);                           // au-dessus
      g.fillRect(rx, ry + (DR + DRS) * T, T, RH - (DR + DRS) * T); // en-dessous
    } else {
      g.fillRect(rx, ry, T, RH);
    }

    // Mur DROIT : avec trou si porte est
    if (def.doors && def.doors.east) {
      g.fillRect(rx + RW - T, ry, T, DR * T);
      g.fillRect(rx + RW - T, ry + (DR + DRS) * T, T, RH - (DR + DRS) * T);
    } else {
      g.fillRect(rx + RW - T, ry, T, RH);
    }

    /* Accent mural (ligne claire sous plafond) */
    g.fillStyle(def.wallAccent, 1);
    g.fillRect(rx + T, ry + T, RW - 2*T, 6);  // liseré bas du mur du haut
    // Lignes verticales gauche/droite
    g.fillRect(rx + T, ry + T, 4, RH - 2*T);
    g.fillRect(rx + RW - T - 4, ry + T, 4, RH - 2*T);

    /* ── Corps physiques des murs ─────────── */
    var self = this;
    function wall(x, y, w, h) {
      var r = self.add.rectangle(x + w/2, y + h/2, w, h, 0, 0).setAlpha(0);
      self.physics.add.existing(r, true);
      self.walls.add(r);
    }

    // Mur haut
    wall(rx, ry, RW, T);
    // Mur bas
    wall(rx, ry + RH - T, RW, T);
    // Mur gauche
    if (def.doors && def.doors.west) {
      wall(rx, ry, T, DR * T);
      wall(rx, ry + (DR + DRS) * T, T, RH - (DR + DRS) * T);
    } else {
      wall(rx, ry, T, RH);
    }
    // Mur droit
    if (def.doors && def.doors.east) {
      wall(rx + RW - T, ry, T, DR * T);
      wall(rx + RW - T, ry + (DR + DRS) * T, T, RH - (DR + DRS) * T);
    } else {
      wall(rx + RW - T, ry, T, RH);
    }

    /* ── Sprites portes ───────────────────── */
    if (this.textures.exists('door')) {
      if (def.doors && def.doors.east) {
        /* door.png = 96×144px (2×3 tiles). Place it so it covers the opening. */
        this.add.image(rx + RW - T * 2, ry + DR * T, 'door').setOrigin(0, 0).setDepth(5);
      }
      if (def.doors && def.doors.west) {
        this.add.image(rx, ry + DR * T, 'door').setOrigin(0, 0).setDepth(5);
      }
    }

    /* ── Meubles / objets ─────────────────── */
    def.objects.forEach(function(obj) {
      self._placeObject(obj, rx, ry, roomIdx);
    });
  },

  /* ── Placer un objet ───────────────────── */
  _placeObject: function(obj, rx, ry, roomIdx) {
    var T = CV.TILE;
    if (!this.textures.exists(obj.key)) return;

    var px = rx + obj.c * T;
    var py = ry + obj.r * T;

    // Déco murale : colle au mur du haut
    if (obj.wall) {
      py = ry + T;
    }

    /* Rendu natif — pas de setDisplaySize.
       Les sprites sont déjà à 48px/tile, scale=1 exact → pas d'artefacts sub-pixel. */
    var img = this.add.image(px, py, obj.key).setOrigin(0, 0);

    /* Dimensions réelles depuis Phaser (après ajout) */
    var srcW = img.width;
    var srcH = img.height;

    /* Depth Y-sort :
       - Déco murale (wall=true) : toujours derrière → depth 0
       - Meubles : basé sur la ligne de "pied" (bas du sprite - 1 tile)
         pour que les objets hauts (étagères, armoires) restent derrière
         le joueur qui passe devant eux */
    if (obj.wall) {
      img.setDepth(0);
    } else {
      // Pied de l'objet = bas du sprite moins demi-tile pour les objets hauts
      var footY = py + Math.min(srcH, srcH - CV.TILE * 0.5);
      img.setDepth(Math.floor(footY / CV.TILE));
    }

    /* Corps physique (si solid) */
    if (obj.solid !== false) {
      /* Hitbox = bande basse du sprite (hauteur 1 tile, pleine largeur) */
      var bH = Math.min(T, srcH);
      var hitbox = this.add.rectangle(
        px + srcW / 2,
        py + srcH - bH / 2,
        srcW * 0.85, bH, 0, 0
      ).setAlpha(0);
      this.physics.add.existing(hitbox, true);
      this.furniture.add(hitbox);
    }

    /* Zone d'interaction */
    if (obj.iKey && CV.content.objects[obj.iKey]) {
      var zone = this.add.zone(
        px + srcW/2,
        py + srcH/2,
        srcW + T,   // zone légèrement plus grande que le sprite
        srcH + T
      );
      this.physics.add.existing(zone, true);
      this.interactZones.push({
        zone:    zone,
        iKey:    obj.iKey,
        roomIdx: roomIdx,
        // Icône flottante au-dessus
        markerX: px + srcW/2,
        markerY: py - 8,
      });
    }
  },

  /* ════════════════════════════════════════════
     MOUVEMENT JOUEUR
  ════════════════════════════════════════════ */
  _handleMovement: function() {
    var spd  = CV.PLAYER_SPEED;
    var keys = this.keys;
    var p    = this.player;
    var vx   = 0, vy = 0;

    if (keys.left.isDown  || keys.a.isDown || keys.q.isDown)  { vx = -1; this.playerDir = 'left';  }
    if (keys.right.isDown || keys.d.isDown)                   { vx =  1; this.playerDir = 'right'; }
    if (keys.up.isDown    || keys.w.isDown || keys.z.isDown)  { vy = -1; this.playerDir = 'up';    }
    if (keys.down.isDown  || keys.s.isDown)                   { vy =  1; this.playerDir = 'down';  }

    // Diagonale normalisée
    if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; }

    p.setVelocity(vx * spd, vy * spd);

    // Animations
    var moving = vx !== 0 || vy !== 0;
    var animKey = (moving ? 'walk_' : 'idle_') + this.playerDir;
    if (p.anims.currentAnim && p.anims.currentAnim.key !== animKey) {
      p.anims.play(animKey, true);
    }

    // Depth sort : pieds du joueur = p.y (body offset already at feet level)
    // Add 0.5 so player is always slightly in front of same-tile furniture
    p.setDepth(Math.floor(p.y / CV.TILE) + 0.5);
  },

  /* ════════════════════════════════════════════
     INTERACTION (touche E)
  ════════════════════════════════════════════ */
  _checkInteraction: function() {
    var keys = this.keys;
    var p    = this.player;
    var self = this;

    /* Debounce sur E */
    var eDown = keys.e.isDown;
    if (!this.eJustPressed && eDown) {
      this.eJustPressed = true;
      this._tryInteract();
    }
    if (!eDown) this.eJustPressed = false;

    /* Afficher indicateur si près d'un objet */
    var nearest  = null;
    var minDist  = 90;  // px

    this.interactZones.forEach(function(iz) {
      var dx   = p.x - iz.zone.x;
      var dy   = p.y - iz.zone.y;
      var dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < minDist) { minDist = dist; nearest = iz; }
    });

    if (nearest) {
      this.interactHint
        .setPosition(nearest.markerX, nearest.markerY)
        .setVisible(true);
    } else {
      this.interactHint.setVisible(false);
    }
  },

  _tryInteract: function() {
    var p    = this.player;
    var best = null;
    var bestDist = 90;

    this.interactZones.forEach(function(iz) {
      var dx   = p.x - iz.zone.x;
      var dy   = p.y - iz.zone.y;
      var dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < bestDist) { bestDist = dist; best = iz; }
    });

    if (!best) return;

    this.transitioning = true;   // bloquer mouvement pendant le dialog
    var self = this;
    CV.Dialog.open(best.iKey, function() {
      self.transitioning = false;
    });
  },

  /* ════════════════════════════════════════════
     PORTES — transition entre salles
  ════════════════════════════════════════════ */
  _checkDoors: function() {
    var p   = this.player;
    var T   = CV.TILE;
    var RW  = CV.ROOM_W;
    var RH  = CV.ROOM_H;
    var DR  = CV.DOOR_ROW;
    var DRS = CV.DOOR_ROWS;
    var self = this;

    var roomIdx = Math.floor(p.x / RW);
    var roomX   = roomIdx * RW;

    // Y de la porte en pixels (milieu)
    var doorYMin = DR * T + T/2;
    var doorYMax = (DR + DRS) * T - T/2;
    var py       = p.y;  // absolu (ry=0)

    /* ── Porte EST (droite → salle suivante) ── */
    var def = CV.rooms[roomIdx];
    if (def && def.doors && def.doors.east) {
      if (p.x > roomX + RW - T * 0.8 && py > doorYMin && py < doorYMax) {
        if (roomIdx < CV.rooms.length - 1) {
          this._doTransition(roomIdx + 1, roomX + RW + T * 1.5, py);
        }
      }
    }

    /* ── Porte OUEST (gauche → salle précédente) ── */
    if (def && def.doors && def.doors.west) {
      if (p.x < roomX + T * 0.8 && py > doorYMin && py < doorYMax) {
        if (roomIdx > 0) {
          this._doTransition(roomIdx - 1, roomX - T * 1.5, py);
        }
      }
    }
  },

  _doTransition: function(targetRoom, targetX, targetY) {
    if (this.transitioning) return;
    this.transitioning = true;
    var self = this;

    this.cameras.main.fade(200, 0, 0, 0);

    this.time.delayedCall(220, function() {
      // Repositionner le joueur dans la nouvelle salle
      var RW = CV.ROOM_W;
      var T  = CV.TILE;

      if (targetX > self.player.x) {
        // Entrée par l'ouest (vient de droite → apparaît à gauche)
        self.player.setPosition(targetRoom * RW + T * 2, targetY);
        self.playerDir = 'right';
        self.player.anims.play('idle_right');
      } else {
        // Entrée par l'est (vient de gauche → apparaît à droite)
        self.player.setPosition(targetRoom * RW + RW - T * 2, targetY);
        self.playerDir = 'left';
        self.player.anims.play('idle_left');
      }

      self.currentRoom = targetRoom;
      self._updateRoomHUD();

      self.cameras.main.fadeIn(200, 0, 0, 0);
      self.time.delayedCall(220, function() {
        self.transitioning = false;
      });
    });
  },

  /* ════════════════════════════════════════════
     HUD INTERFACE
  ════════════════════════════════════════════ */
  _createHUD: function() {
    /* ── Bandeau haut (fixe, hors caméra) ──── */
    var W = this.cameras.main.width;

    // Fond bandeau
    this.hudBg = this.add.rectangle(0, 0, W, 28, 0x07050E, 0.88)
      .setOrigin(0, 0).setScrollFactor(0).setDepth(100);
    this.add.rectangle(0, 27, W, 1, 0x3A2800, 1)
      .setOrigin(0, 0).setScrollFactor(0).setDepth(100);

    // Nom de la salle
    this.hudRoomName = this.add.text(W/2, 7, '', {
      fontFamily: '"Press Start 2P"', fontSize: '8px',
      color: '#C8A030',
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(101);

    // Bouton langue
    this.hudLangBtn = this.add.text(W - 10, 7,
      '[' + CV.t(CV.content.ui.lang) + ']', {
      fontFamily: '"Press Start 2P"', fontSize: '7px',
      color: '#5A4A20',
    }).setOrigin(1, 0).setScrollFactor(0).setDepth(101)
      .setInteractive({ useHandCursor:true });

    this.hudLangBtn.on('pointerover',  function() { this.setColor('#C8A030'); });
    this.hudLangBtn.on('pointerout',   function() { this.setColor('#5A4A20'); });
    this.hudLangBtn.on('pointerdown',  function() {
      CV.lang = (CV.lang === 'fr') ? 'en' : 'fr';
      // Mettre à jour les textes dynamiques
      this._refreshHUDLang();
    }.bind(this));

    // Flèches navigation (mini map rooms)
    this.hudArrowLeft = this.add.text(10, 7, '◀', {
      fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#3A2800',
    }).setOrigin(0, 0).setScrollFactor(0).setDepth(101);

    this.hudArrowRight = this.add.text(W - 54, 7, '▶', {
      fontFamily: '"Press Start 2P"', fontSize: '8px', color: '#3A2800',
    }).setOrigin(0, 0).setScrollFactor(0).setDepth(101);

    this._updateRoomHUD();
  },

  _updateRoomHUD: function() {
    var def = CV.rooms[this.currentRoom];
    if (!def) return;
    var name = CV.t(CV.content.rooms[def.nameKey]) || '';
    this.hudRoomName.setText(name);

    // Flèches visibles selon les portes disponibles
    this.hudArrowLeft.setColor(
      (def.doors && def.doors.west) ? '#7A6030' : '#1A1008'
    );
    this.hudArrowRight.setColor(
      (def.doors && def.doors.east) ? '#7A6030' : '#1A1008'
    );
  },

  _updateHUD: function() {
    /* Pas de mise à jour continue pour le nom — seulement lors des transitions */
  },

  _refreshHUDLang: function() {
    this.hudLangBtn.setText('[' + CV.t(CV.content.ui.lang) + ']');
    this._updateRoomHUD();
    this.interactHint.setText(CV.t(CV.content.ui.interact));
  },

  /* ════════════════════════════════════════════
     CHIPTUNE PROCÉDURAL (Web Audio API)
     Mélodie RPG town en C majeur, 2 canaux
  ════════════════════════════════════════════ */
  _startChiptune: function() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();

      /* Fréquences (Hz) */
      var F = {
        C3:130.8,D3:146.8,E3:164.8,G3:196.0,A3:220.0,B3:246.9,
        C4:261.6,D4:293.7,E4:329.6,F4:349.2,G4:392.0,A4:440.0,B4:493.9,
        C5:523.3,D5:587.3,E5:659.3,G5:784.0, _:0,
      };

      /* BPM 120 → quarter = 0.5s → 8th = 0.25s */
      var q = 0.5, h = 1.0, e = 0.25;

      /* Mélodie (lead) — 16 mesures en C major pentatonic */
      var melody = [
        // Mesure 1-4
        {n:'C4',d:e},{n:'E4',d:e},{n:'G4',d:e},{n:'E4',d:e},
        {n:'C4',d:e},{n:'D4',d:e},{n:'E4',d:h},
        // Mesure 5-8
        {n:'G4',d:e},{n:'A4',d:e},{n:'G4',d:e},{n:'E4',d:e},
        {n:'D4',d:e},{n:'C4',d:e},{n:'D4',d:h},
        // Mesure 9-12
        {n:'E4',d:e},{n:'G4',d:e},{n:'C5',d:q},{n:'B4',d:q},
        {n:'A4',d:e},{n:'G4',d:e},{n:'A4',d:h},
        // Mesure 13-16
        {n:'G4',d:e},{n:'E4',d:e},{n:'D4',d:e},{n:'C4',d:e},
        {n:'E4',d:e},{n:'G4',d:e},{n:'C5',d:h},
      ];

      /* Basse (triangle wave, sous-octave) */
      var bass = [
        {n:'C3',d:q},{n:'_',d:e},{n:'G3',d:e},
        {n:'C3',d:q},{n:'_',d:e},{n:'G3',d:e},
        {n:'D3',d:q},{n:'_',d:e},{n:'A3',d:e},
        {n:'G3',d:q},{n:'_',d:e},{n:'G3',d:e},
        {n:'A3',d:q},{n:'_',d:e},{n:'E3',d:e},
        {n:'F4',d:q},{n:'_',d:e},{n:'C4',d:e},
        {n:'G3',d:q},{n:'_',d:e},{n:'D3',d:e},
        {n:'C3',d:h},{n:'_',d:h},
      ];

      function playSequence(seq, type, gainVal, loop) {
        var gain = ctx.createGain();
        gain.gain.value = gainVal;
        gain.connect(ctx.destination);

        var t = ctx.currentTime + 0.1;

        function schedule(startT) {
          var cur = startT;
          seq.forEach(function(note) {
            if (note.n !== '_') {
              var osc = ctx.createOscillator();
              osc.type = type;
              osc.frequency.value = F[note.n] || 0;
              var env = ctx.createGain();
              env.gain.setValueAtTime(gainVal, cur);
              env.gain.exponentialRampToValueAtTime(0.001, cur + note.d * 0.9);
              osc.connect(env);
              env.connect(ctx.destination);
              osc.start(cur);
              osc.stop(cur + note.d);
            }
            cur += note.d;
          });
          return cur;
        }

        var totalDur = seq.reduce(function(s, n) { return s + n.d; }, 0);
        schedule(t);

        if (loop) {
          var self = this;
          function reloop() {
            t += totalDur;
            schedule(t);
            setTimeout(reloop, totalDur * 1000 - 100);
          }
          setTimeout(reloop, totalDur * 1000 - 100);
        }
      }

      playSequence(melody, 'square',   0.04, true);
      playSequence(bass,   'triangle', 0.06, true);

    } catch(e) {
      /* pas d'audio — pas grave */
    }
  },

});
