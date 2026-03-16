# 🎮 Lucas Requena — Portfolio RPG

Site CV interactif sous forme de jeu RPG rétro (style Zelda / A Link to the Past), jouable directement dans le navigateur.

## Jouer

👉 **Démo live :** `https://<ton-username>.github.io/<nom-du-repo>/`

Ou en local :
```bash
# Python 3
python3 -m http.server 8080
# puis http://localhost:8080
```

> ⚠️ Un serveur local est requis (les assets PNG sont chargés via HTTP).
> Ouvrir `index.html` directement avec `file://` ne fonctionnera pas.

---

## Contrôles

| Touche | Action |
|--------|--------|
| `Z Q S D` ou `↑ ↓ ← →` | Déplacer le personnage |
| `E` | Interagir avec un objet |
| `Échap` | Fermer un dialogue |
| `◀ ▶` (dans dialogue) | Page précédente / suivante |
| Bouton `[EN]` / `[FR]` | Changer de langue |

---

## Les 5 salles

| Salle | Contenu |
|-------|---------|
| 🏛 Hall d'Entrée | Bio, Contact, Valeurs & Engagement |
| 🖼 Galerie des Expériences | GIRO, Clever Age, LR Consulting, Ministère |
| 📚 Salle des Compétences | Cloud, Infra, Sécurité, Langages, OSINT |
| 🔬 Laboratoire Projets | Kohbolt, Dungeon of Gluttony, Raspberry Pi IA |
| 🏠 Bureau Personnel | Cuisine, Brassage, Bricolage, Geek & Gaming |

---

## Structure du projet

```
rpg-cv/
├── index.html                  ← Page principale
├── js/
│   ├── content.js              ← 📝 Tout le texte FR/EN (modifier ici)
│   ├── rooms.js                ← 🗺 Layout des salles (modifier ici)
│   ├── dialog.js               ← Système de popups
│   ├── main.js                 ← Config Phaser
│   └── scenes/
│       ├── Preload.js          ← Chargement assets
│       ├── MenuScene.js        ← Écran titre
│       └── GameScene.js        ← Moteur de jeu
├── assets/
│   ├── player.png              ← Sprite sheet joueur (Groom.png, CC0)
│   ├── interiors.png           ← Tileset intérieurs (Modern Interiors, CC0)
│   ├── rooms.png               ← Tileset sols/murs (Modern Interiors, CC0)
│   ├── floor_*.png             ← Textures de sol extraites
│   ├── *.png                   ← Sprites meubles extraits
│   └── music/
│       └── theme.ogg           ← (optionnel, voir ci-dessous)
└── .github/
    └── workflows/
        └── deploy.yml          ← Auto-déploiement GitHub Pages
```

---

## Modifier le contenu

### ✏️ Textes du CV
Ouvre `js/content.js` — chaque objet interactif a son texte en `fr` et `en`.

```js
bio: {
  icon: '🧑‍💻',
  title: { fr: 'À Propos de Lucas', en: 'About Lucas' },
  pages: [
    { fr: 'Texte page 1 en français', en: 'Page 1 text in English' },
    { fr: 'Page 2...', en: 'Page 2...' },
  ],
},
```

### 🗺 Ajouter un objet interactif
Dans `js/rooms.js`, dans le tableau `objects` de la salle :

```js
{ key:'monitor_setup', c:5, r:3, iKey:'ma_cle', solid:true }
```

Puis ajouter le contenu correspondant dans `js/content.js` sous `CV.content.objects.ma_cle`.

---

## Musique

Le jeu démarre avec une **mélodie chiptune procédurale** générée par Web Audio API.

Pour utiliser ta propre piste :
1. Télécharger un fichier `.ogg` ou `.mp3`
2. Le renommer `theme.ogg` (et/ou `theme.mp3`)
3. Le placer dans `assets/music/`

Suggestions CC0 sur [OpenGameArt.org](https://opengameart.org/content/town-theme-rpg) :
- *Town Theme RPG* — CynicMusic (CC0)
- *15 Melodic RPG Chiptunes* — CC0

> ℹ️ Les pistes YouTube ne peuvent pas être utilisées directement (droits d'auteur).
> Le chiptune procédural intégré est une alternative légale et sans dépendance.

---

## Déploiement GitHub Pages

1. **Créer un repo GitHub** et pousser ce dossier
2. Aller dans `Settings > Pages`
3. Source : **GitHub Actions**
4. Le workflow `.github/workflows/deploy.yml` s'exécute automatiquement à chaque `git push`

---

## Assets utilisés

| Asset | Auteur | Licence |
|-------|--------|---------|
| Modern Interiors (tileset) | Limezu | CC0 |
| Groom.png (player sprite) | — | CC0 |
| Phaser 3 | Photon Storm | MIT |
| Press Start 2P (police) | CodeMan38 | SIL OFL |

---

*Portfolio de Lucas Requena — Montréal, QC 🇨🇦*
