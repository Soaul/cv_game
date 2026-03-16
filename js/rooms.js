/* =====================================================
   rooms.js — Définition des 5 salles du musée
   Chaque salle contient :
   - floorColor   : couleur de fond du sol
   - wallColor    : couleur des murs
   - wallAccent   : couleur des détails muraux
   - floorTexture : clé de texture pour le sol
   - doors        : { west: bool, east: bool } ouvertures
   - objects[]    : meubles et objets interactifs
     · key      : clé du sprite (chargé dans Preload)
     · c, r     : position en tuiles (col, row) dans la salle
     · iKey     : clé interaction (contenu dans content.js)
     · wall     : true = collé au mur du haut (déco murale)
     · solid    : false = pas de hitbox physique
===================================================== */
var CV = CV || {};

/* Dimensions du monde (en tuiles de 48px) */
CV.TILE       = 48;
CV.ROOM_COLS  = 20;
CV.ROOM_ROWS  = 13;
CV.ROOM_W     = CV.TILE * CV.ROOM_COLS;  // 960
CV.ROOM_H     = CV.TILE * CV.ROOM_ROWS;  // 624
CV.WORLD_W    = CV.ROOM_W * 5;           // 4800
CV.DOOR_ROW   = 5;     // row de début de la porte (3 tiles : 5,6,7)
CV.DOOR_ROWS  = 3;     // hauteur de la porte en tiles
CV.PLAYER_SPEED = 180; // px/s

CV.rooms = [

  /* ──────────────────────────────────────────────
     SALLE 0 — Hall d'Entrée
  ────────────────────────────────────────────── */
  {
    nameKey:      'hall',
    floorColor:   0xC09868,
    wallColor:    0x5C3A1E,
    wallAccent:   0x7A4E2A,
    floorTexture: 'floor_light_wood',
    doors:        { east: true },
    objects: [
      // Accueil / bureau réception (interaction: contact)
      { key:'reception_desk', c:6,  r:2, iKey:'contact',    solid:true },
      // Canapé (interaction: bio)
      { key:'sofa',           c:11, r:9, iKey:'bio',         solid:true },
      // Miroir (valeurs)
      { key:'mirror',         c:1,  r:2, iKey:'philosophy',  solid:false },
      // Tapis décoratif
      { key:'rug_red',        c:7,  r:6, solid:false },
      // Plantes
      { key:'plant_large',    c:17, r:1, solid:true  },
      { key:'plant_small',    c:1,  r:10, solid:true },
      // Fenêtre murale
      { key:'window_curtain', c:4,  r:1, solid:false, wall:true },
      { key:'window_curtain', c:13, r:1, solid:false, wall:true },
      // Tableau (philosophie)
      { key:'frame_sm1',      c:9,  r:1, iKey:'philosophy', solid:false, wall:true },
    ],
  },

  /* ──────────────────────────────────────────────
     SALLE 1 — Galerie des Expériences
  ────────────────────────────────────────────── */
  {
    nameKey:      'experience',
    floorColor:   0x3A2810,
    wallColor:    0x1E2A3A,
    wallAccent:   0x2A3A50,
    floorTexture: 'floor_dark_wood',
    doors:        { west: true, east: true },
    objects: [
      // Tableau noir (expertise cloud générale)
      { key:'blackboard',   c:2,  r:1, iKey:'skills_cloud', solid:true, wall:true },
      // Bureau 1 : GIRO
      { key:'office_desk',  c:1,  r:4, iKey:'job_giro',     solid:true },
      { key:'monitor_setup',c:1,  r:3, iKey:'job_giro',     solid:true, wall:false },
      // Bureau 2 : Clever Age DevOps
      { key:'office_desk',  c:7,  r:4, iKey:'job_clever_devops', solid:true },
      { key:'monitor_large',c:7,  r:3, iKey:'job_clever_devops', solid:true },
      // Bureau 3 : Clever Age Jr
      { key:'desk_chair',   c:1,  r:8, iKey:'job_clever_jr', solid:true },
      { key:'monitor_setup',c:1,  r:7, iKey:'job_clever_jr', solid:true },
      // Bureau 4 : LR Consulting
      { key:'desk_chair',   c:7,  r:8, iKey:'job_lr',        solid:true },
      { key:'monitor_setup',c:7,  r:7, iKey:'job_lr',        solid:true },
      // Bureau 5 : Ministère
      { key:'desk_chair',   c:13, r:8, iKey:'job_minist',    solid:true },
      { key:'monitor_setup',c:13, r:7, iKey:'job_minist',    solid:true },
      // Bibliothèque décorative
      { key:'bookshelf',    c:17, r:1, solid:true },
      { key:'bookshelf',    c:17, r:4, solid:true },
      // Cadres sur les murs (tableaux déco)
      { key:'frame_sm2',    c:11, r:1, solid:false, wall:true },
      { key:'frame_sm1',    c:14, r:1, solid:false, wall:true },
      // Globe décoratif
      { key:'globe',        c:16, r:7, solid:true },
    ],
  },

  /* ──────────────────────────────────────────────
     SALLE 2 — Salle des Compétences
  ────────────────────────────────────────────── */
  {
    nameKey:      'skills',
    floorColor:   0x3A2A50,
    wallColor:    0x1A3A3A,
    wallAccent:   0x205050,
    floorTexture: 'floor_carpet',
    doors:        { west: true, east: true },
    objects: [
      // Tableau blanc (sécurité)
      { key:'whiteboard',   c:1,  r:1, iKey:'skills_security', solid:true, wall:true },
      // Bibliothèque store (dev languages)
      { key:'bookshelf_store', c:14, r:1, iKey:'skills_dev', solid:true },
      // Rangées de pupitres
      { key:'school_desks', c:2,  r:4, iKey:'skills_cloud',  solid:true },
      { key:'school_desks', c:2,  r:7, iKey:'skills_infra',  solid:true },
      { key:'school_desks', c:2,  r:10, iKey:'skills_dev',   solid:true },
      // Globe (géopolitique)
      { key:'globe',        c:15, r:5, iKey:'philosophy', solid:true },
      // Calendrier / planning
      { key:'calendar',     c:12, r:4, solid:true },
      // Plantes
      { key:'plant_small',  c:17, r:10, solid:true },
      { key:'plant_large',  c:1,  r:10, solid:true },
    ],
  },

  /* ──────────────────────────────────────────────
     SALLE 3 — Laboratoire Projets
  ────────────────────────────────────────────── */
  {
    nameKey:      'projects',
    floorColor:   0x2A2A3A,
    wallColor:    0x2A2A2A,
    wallAccent:   0x404050,
    floorTexture: 'floor_stone',
    doors:        { west: true, east: true },
    objects: [
      // Serveur / PC (Kohbolt)
      { key:'server_pc',    c:2,  r:2, iKey:'project_kohbolt', solid:true },
      { key:'server_pc',    c:4,  r:2, iKey:'project_kohbolt', solid:true },
      // Monitor setup (Godot game dev)
      { key:'monitor_large',c:8,  r:2, iKey:'project_godot',   solid:true },
      { key:'desk_small',   c:8,  r:4, iKey:'project_godot',   solid:true },
      // Monitor (Raspberry Pi)
      { key:'monitor_large',c:12, r:2, iKey:'project_rpi',     solid:true },
      { key:'desk_small',   c:12, r:4, iKey:'project_rpi',     solid:true },
      // Carte du monde (portfolio/web)
      { key:'world_map',    c:15, r:1, iKey:'project_portfolio', solid:true, wall:true },
      // Tableau blanc
      { key:'whiteboard',   c:2,  r:6, iKey:'skills_infra', solid:true, wall:true },
      // Plantes
      { key:'plant_large',  c:17, r:1, solid:true },
      { key:'plant_small',  c:1,  r:10, solid:true },
      // Armoire / serveurs
      { key:'wardrobe',     c:17, r:5, solid:true },
    ],
  },

  /* ──────────────────────────────────────────────
     SALLE 4 — Bureau Personnel
  ────────────────────────────────────────────── */
  {
    nameKey:      'personal',
    floorColor:   0x6A3A1A,
    wallColor:    0x3A1A0A,
    wallAccent:   0x5A2A12,
    floorTexture: 'floor_herring',
    doors:        { west: true },
    objects: [
      // Cuisinière (cooking)
      { key:'stove',        c:2,  r:2, iKey:'hobby_cooking',  solid:true },
      // Frigo (brewing)
      { key:'fridge',       c:4,  r:2, iKey:'hobby_brewing',  solid:true },
      // Armoire (DIY / bricolage)
      { key:'cabinet',      c:6,  r:2, iKey:'hobby_diy',      solid:true },
      // Canapé (repos / lecture)
      { key:'sofa',         c:10, r:9, iKey:'hobby_geek',     solid:true },
      // Fauteuil (gaming)
      { key:'armchair',     c:14, r:9, iKey:'hobby_geek',     solid:true },
      // Bibliothèque (geek / livres)
      { key:'bookshelf',    c:16, r:1, iKey:'hobby_geek',     solid:true },
      { key:'bookshelf',    c:16, r:4, iKey:'hobby_cooking',  solid:true },
      // Évier
      { key:'sink',         c:8,  r:2, solid:true },
      // Tapis
      { key:'rug_large',    c:9,  r:6, solid:false },
      // Plantes
      { key:'plant_small',  c:1,  r:10, solid:true },
      { key:'plant_large',  c:18, r:10, solid:true },
    ],
  },

];
