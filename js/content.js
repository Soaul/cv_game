/* =====================================================
   content.js — Tout le contenu du CV en FR et EN
   Modifie ce fichier pour mettre à jour le texte
   sans toucher au code du jeu.
===================================================== */
var CV = CV || {};

CV.lang = 'fr'; // 'fr' | 'en'

CV.t = function(obj) {
  return (obj && obj[CV.lang]) || (obj && obj.fr) || obj || '';
};

CV.content = {

  /* ── UI ─────────────────────────────────────── */
  ui: {
    newGame:    { fr: '▶  NOUVELLE PARTIE',       en: '▶  NEW GAME'         },
    lang:       { fr: 'EN',                        en: 'FR'                  },
    interact:   { fr: '[E]  Examiner',             en: '[E]  Examine'        },
    close:      { fr: 'Fermer  [E / Échap]',       en: 'Close  [E / Esc]'   },
    page:       { fr: 'Page',                      en: 'Page'                },
    prev:       { fr: '◀',                         en: '◀'                  },
    next:       { fr: '▶',                         en: '▶'                  },
    tagline:    { fr: 'Un portfolio interactif en pixel art', en: 'An interactive pixel art portfolio' },
    controls:   { fr: 'ZQSD / Flèches : Déplacer  |  E : Interagir  |  Échap : Fermer', en: 'WASD / Arrows: Move  |  E: Interact  |  Esc: Close' },
  },

  /* ── Noms des salles ─────────────────────────── */
  rooms: {
    hall:       { fr: "Hall d'Entrée",              en: 'Entry Hall'         },
    experience: { fr: 'Galerie des Expériences',    en: 'Experience Gallery' },
    skills:     { fr: 'Salle des Compétences',      en: 'Skills Room'        },
    projects:   { fr: 'Laboratoire Projets',         en: 'Project Lab'        },
    personal:   { fr: 'Bureau Personnel',           en: 'Personal Office'    },
  },

  /* ── Objets interactifs ──────────────────────── */
  objects: {

    /* ---- HALL ---------------------------------- */
    bio: {
      icon: '🧑‍💻',
      title: { fr: 'À Propos de Lucas', en: 'About Lucas' },
      pages: [
        { fr: 'Lucas Requena\nCloud Engineer & Expert DevSecOps\n\nBasé à Montréal, QC 🇨🇦\nOrigine : Bordeaux, France 🇫🇷',
          en: 'Lucas Requena\nCloud Engineer & DevSecOps Expert\n\nBased in Montréal, QC 🇨🇦\nOrigin: Bordeaux, France 🇫🇷' },
        { fr: 'Formation : BAC+5 Expert Informatique\nSpécialité Cloud, Sécurité, Infrastructures\nYnov Bordeaux — 2018–2023\n\nLangues : Français (natif) · Anglais · Espagnol',
          en: 'Education: Expert in Computer Science (Bac+5)\nSpecialty: Cloud, Security, Infrastructures\nYnov Bordeaux — 2018–2023\n\nLanguages: French (native) · English · Spanish' },
        { fr: 'Passionné par la défense des droits numériques, je mets mon expertise Cloud & OSINT au service de la transparence et de la souveraineté des données.',
          en: 'Passionate about digital rights, I apply my Cloud & OSINT expertise to serve data transparency and sovereignty.' },
      ],
    },

    contact: {
      icon: '📬',
      title: { fr: 'Contact', en: 'Contact' },
      pages: [
        { fr: '📧  lucasreqpro@gmail.com\n💼  LinkedIn : lucas-requena-92a625155\n💀  Root-Me : glynsh\n📍  Montréal, QC — Canada',
          en: '📧  lucasreqpro@gmail.com\n💼  LinkedIn: lucas-requena-92a625155\n💀  Root-Me: glynsh\n📍  Montréal, QC — Canada' },
        { fr: '⚡ Statut : Disponible\n\nPour toute proposition professionnelle,\nprivilégiez l\'email ou LinkedIn.\nRéponse garantie sous 48h.',
          en: '⚡ Status: Available\n\nFor professional inquiries,\nprefer email or LinkedIn.\nGuaranteed reply within 48h.' },
      ],
    },

    philosophy: {
      icon: '🛡',
      title: { fr: 'Valeurs & Engagements', en: 'Values & Commitments' },
      pages: [
        { fr: '🔐 Souveraineté Numérique\nLes données des citoyens et entreprises doivent rester sous contrôle local. La dépendance aux GAFAM est un risque systémique.',
          en: '🔐 Digital Sovereignty\nCitizen and company data must stay under local control. Dependency on Big Tech is a systemic risk.' },
        { fr: '🌍 Géopolitique du Cloud\nL\'infrastructure cloud est un enjeu géopolitique majeur. Comprendre les flux de données c\'est comprendre les rapports de force mondiaux.',
          en: '🌍 Cloud Geopolitics\nCloud infrastructure is a major geopolitical issue. Understanding data flows means understanding global power dynamics.' },
        { fr: '👁 Transparence & OSINT\nLutter contre la désinformation via l\'investigation numérique. La technologie comme outil citoyen au service des libertés fondamentales.',
          en: '👁 Transparency & OSINT\nFighting disinformation through digital investigation. Technology as a civic tool for fundamental freedoms.' },
        { fr: '🚀 Fibre Entrepreneuriale\nKohbolt : projet de cloud souverain canadien à impact. Parce que l\'infrastructure critique ne devrait pas dépendre de juridictions étrangères.',
          en: '🚀 Entrepreneurial Drive\nKohbolt: Canadian sovereign cloud project with impact. Because critical infrastructure should not depend on foreign jurisdictions.' },
      ],
    },

    /* ---- EXPERIENCE GALLERY -------------------- */
    job_giro: {
      icon: '☁',
      title: { fr: 'Expert Cloud — GIRO', en: 'Cloud Expert — GIRO' },
      pages: [
        { fr: '🏢 GIRO Inc. — Montréal, CA\n📅 Août 2024 → Présent\n\nResponsable de l\'infrastructure cloud\nde 750 employés.',
          en: '🏢 GIRO Inc. — Montréal, CA\n📅 August 2024 → Present\n\nCloud infrastructure owner\nfor 750 employees.' },
        { fr: '🔧 Missions :\n• Gouvernance & IaC (Terraform, Bicep)\n• CI/CD Azure DevOps\n• Sécurité & DevSecOps\n• Architecture multi-cloud',
          en: '🔧 Responsibilities:\n• Governance & IaC (Terraform, Bicep)\n• CI/CD Azure DevOps\n• Security & DevSecOps\n• Multi-cloud architecture' },
        { fr: '⚙ Stack :\nAzure · Kubernetes · Docker\nTerraform · PowerShell · Python\nMicrosoft Sentinel · Azure DevOps',
          en: '⚙ Stack:\nAzure · Kubernetes · Docker\nTerraform · PowerShell · Python\nMicrosoft Sentinel · Azure DevOps' },
      ],
    },

    job_clever_devops: {
      icon: '⚙',
      title: { fr: 'DevOps Engineer — Clever Age', en: 'DevOps Engineer — Clever Age' },
      pages: [
        { fr: '🏢 Clever Age — Bordeaux, FR\n📅 Nov. 2023 → Juil. 2024\n\nConsultant pour deux grands comptes.\nInfrastructure cloud et DevSecOps.',
          en: '🏢 Clever Age — Bordeaux, FR\n📅 Nov. 2023 → Jul. 2024\n\nConsultant for two major accounts.\nCloud infrastructure and DevSecOps.' },
        { fr: '🔧 Missions :\n• Plans d\'architecture cloud\n• Déploiement & maintenance infra\n• Pipelines CI/CD\n• Analyse de code & load testing',
          en: '🔧 Responsibilities:\n• Cloud architecture planning\n• Infra deployment & maintenance\n• CI/CD pipelines\n• Code analysis & load testing' },
        { fr: '⚙ Stack : Azure · AWS · GitLab CI\nDocker · Terraform · Java · Unix',
          en: '⚙ Stack: Azure · AWS · GitLab CI\nDocker · Terraform · Java · Unix' },
      ],
    },

    job_clever_jr: {
      icon: '🎓',
      title: { fr: 'DevOps Junior (Alternance)', en: 'Junior DevOps (Work-Study)' },
      pages: [
        { fr: '🏢 Clever Age — Bordeaux, FR\n📅 Nov. 2021 → Nov. 2023\n\nFormation en alternance.\nAutomatisation et déploiement cloud.',
          en: '🏢 Clever Age — Bordeaux, FR\n📅 Nov. 2021 → Nov. 2023\n\nWork-study program.\nCloud automation and deployment.' },
        { fr: '🔧 Missions :\n• Plans d\'automatisation\n• Infra cloud Terraform\n• Azure · AWS\n• CI/CD pipelines',
          en: '🔧 Responsibilities:\n• Automation planning\n• Terraform cloud infrastructure\n• Azure · AWS\n• CI/CD pipelines' },
      ],
    },

    job_lr: {
      icon: '💼',
      title: { fr: 'Auto-Entrepreneur — LR Consulting', en: 'Freelance — LR Consulting' },
      pages: [
        { fr: '🏢 LR Consulting — Bordeaux / Remote\n📅 Fév. 2022 → Présent\n\nConseil en transformation numérique\npour PME et TPE.',
          en: '🏢 LR Consulting — Bordeaux / Remote\n📅 Feb. 2022 → Present\n\nDigital transformation consulting\nfor SMEs.' },
        { fr: '🔧 Services :\n• Sites web (WordPress, WooCommerce)\n• Shopify & e-commerce\n• Digitalisation processus PME\n• Google Ads & référencement',
          en: '🔧 Services:\n• Web (WordPress, WooCommerce)\n• Shopify & e-commerce\n• SME process digitalization\n• Google Ads & SEO' },
      ],
    },

    job_minist: {
      icon: '🏛',
      title: { fr: 'Expert SSI — Min. Intérieur', en: 'SSI Expert — Ministry of Interior' },
      pages: [
        { fr: '🏢 Ministère de l\'Intérieur 🇫🇷\n📅 Janv. 2020 → Août 2021\n\n• Stage Cybersecurity Analyst (EBIOS RM)\n  Janv.–Fév. 2020\n• Alternance Expert SSI & Gestion de Crise\n  Sept. 2020 – Août 2021',
          en: '🏢 French Ministry of Interior 🇫🇷\n📅 Jan. 2020 → Aug. 2021\n\n• Internship: Cybersecurity Analyst (EBIOS RM)\n  Jan.–Feb. 2020\n• Work-Study: SSI Expert & Crisis Management\n  Sep. 2020 – Aug. 2021' },
        { fr: '🔧 Missions SSI :\n• Conception SI sûreté bâtimentaire\n• Intégration briques cybersécurité\n• Interface direction / ingénieurs\n• Analyse risque EBIOS RM',
          en: '🔧 SSI Responsibilities:\n• Building security IS design\n• Cybersecurity component integration\n• Management/engineering liaison\n• EBIOS RM risk analysis' },
      ],
    },

    /* ---- SKILLS ROOM --------------------------- */
    skills_cloud: {
      icon: '☁',
      title: { fr: 'Compétences Cloud', en: 'Cloud Skills' },
      pages: [
        { fr: 'Microsoft Azure    ████████████ 95%\nAmazon Web Services  ████████░░░░ 75%\nGoogle Cloud Platform ██████░░░░░░ 50%\n\nSpécialité : Architecture, Gouvernance, IaC',
          en: 'Microsoft Azure    ████████████ 95%\nAmazon Web Services  ████████░░░░ 75%\nGoogle Cloud Platform ██████░░░░░░ 50%\n\nSpecialty: Architecture, Governance, IaC' },
        { fr: 'Azure : AKS · App Services · SQL\nFunctions · DevOps · Sentinel · Bicep\nCost Optimization · Workbooks · RBAC\n\nCertifications en cours',
          en: 'Azure: AKS · App Services · SQL\nFunctions · DevOps · Sentinel · Bicep\nCost Optimization · Workbooks · RBAC\n\nCertifications in progress' },
      ],
    },

    skills_infra: {
      icon: '⚙',
      title: { fr: 'Infrastructure & DevOps', en: 'Infrastructure & DevOps' },
      pages: [
        { fr: 'Terraform      ██████████░░ 90%\nKubernetes     █████████░░░ 80%\nDocker         ██████████░░ 90%\nAnsible        ████████░░░░ 70%\nGit            ████████████ 100%',
          en: 'Terraform      ██████████░░ 90%\nKubernetes     █████████░░░ 80%\nDocker         ██████████░░ 90%\nAnsible        ████████░░░░ 70%\nGit            ████████████ 100%' },
        { fr: 'CI/CD :\nAzure DevOps · GitLab CI · Drone CI\n\nMonitoring :\nPrometheus / Grafana · ELK Stack\nZabbix · Azure Monitor',
          en: 'CI/CD:\nAzure DevOps · GitLab CI · Drone CI\n\nMonitoring:\nPrometheus / Grafana · ELK Stack\nZabbix · Azure Monitor' },
      ],
    },

    skills_security: {
      icon: '🔒',
      title: { fr: 'Sécurité & OSINT', en: 'Security & OSINT' },
      pages: [
        { fr: 'DevSecOps     █████████░░░ 80%\nOSINT         ██████████░░ 85%\nEBIOS RM      ████████░░░░ 70%\nAnalyse risque ████████░░░░ 75%',
          en: 'DevSecOps     █████████░░░ 80%\nOSINT         ██████████░░ 85%\nEBIOS RM      ████████░░░░ 70%\nRisk Analysis  ████████░░░░ 75%' },
        { fr: 'Root-Me : glynsh\nChallenges CTF, investigations\nnumériques, analyse de menaces.\n\nFormation : Ministère de l\'Intérieur\n→ EBIOS Risk Manager',
          en: 'Root-Me: glynsh\nCTF challenges, digital investigations,\nthreat analysis.\n\nTraining: French Ministry of Interior\n→ EBIOS Risk Manager' },
      ],
    },

    skills_dev: {
      icon: '💻',
      title: { fr: 'Langages de Programmation', en: 'Programming Languages' },
      pages: [
        { fr: 'Bash / Shell   ██████████░░ 90%\nPython        █████████░░░ 80%\nC# / .NET     ███████░░░░░ 60%\nRust          ██████░░░░░░ 50%\nNode.js       ███████░░░░░ 55%',
          en: 'Bash / Shell   ██████████░░ 90%\nPython        █████████░░░ 80%\nC# / .NET     ███████░░░░░ 60%\nRust          ██████░░░░░░ 50%\nNode.js       ███████░░░░░ 55%' },
        { fr: 'Projets notables :\n• Runbooks PowerShell (Azure Automation)\n• Scripts Terraform & Python\n• Développement jeux Godot (GDScript)\n• Projets Rust en apprentissage',
          en: 'Notable projects:\n• PowerShell Runbooks (Azure Automation)\n• Terraform & Python scripts\n• Godot game dev (GDScript)\n• Rust projects (learning)' },
      ],
    },

    /* ---- PROJECT LAB --------------------------- */
    project_kohbolt: {
      icon: '🚀',
      title: { fr: 'Kohbolt — Cloud Souverain', en: 'Kohbolt — Sovereign Cloud' },
      pages: [
        { fr: 'Projet entrepreneurial\nCloud souverain canadien\n\n🎯 Vision : offrir une alternative\nautonome aux GAFAM pour les\nentreprises et citoyens canadiens.',
          en: 'Entrepreneurial project\nCanadian sovereign cloud\n\n🎯 Vision: provide an autonomous\nalternative to Big Tech for Canadian\nbusinesses and citizens.' },
        { fr: '⚡ Différentiateurs :\n• Refroidissement liquide par immersion\n• Valorisation de la chaleur résiduelle\n• Datacenters ruraux au Québec\n• Conformité LPRPDE / loi 25',
          en: '⚡ Differentiators:\n• Immersion liquid cooling\n• Residual heat valorization\n• Rural Quebec datacenters\n• PIPEDA / Bill 25 compliance' },
        { fr: '📊 Statut : Développement actif\nDeck investisseurs en cours\nRecherche de partenaires stratégiques\n\nIdée portée par Lucas depuis 2022.',
          en: '📊 Status: Active development\nInvestor deck in progress\nSeeking strategic partners\n\nIdea carried by Lucas since 2022.' },
      ],
    },

    project_godot: {
      icon: '🎮',
      title: { fr: 'Dungeon of Gluttony', en: 'Dungeon of Gluttony' },
      pages: [
        { fr: 'Jeu RPG Dungeon Crawler\nDéveloppé sous Godot 4.3\n\nInspirations :\nDelicious in Dungeon · Dark Souls\nRuneScape · Zelda',
          en: 'RPG Dungeon Crawler game\nDeveloped in Godot 4.3\n\nInspired by:\nDelicious in Dungeon · Dark Souls\nRuneScape · Zelda' },
        { fr: '⚔ Mécaniques :\n• Cuisine / survie (collecter des ingrédients\n  dans les donjons pour se soigner)\n• Progression de compétences\n• Combat tactique au tour par tour\n• Lore riche et sombre',
          en: '⚔ Mechanics:\n• Cooking / survival (collect ingredients\n  in dungeons to heal yourself)\n• Skill progression system\n• Tactical turn-based combat\n• Rich dark lore' },
      ],
    },

    project_rpi: {
      icon: '🤖',
      title: { fr: 'Assistant IA Raspberry Pi', en: 'Raspberry Pi AI Assistant' },
      pages: [
        { fr: 'Assistant IA portable\nFormat GameBoy — Raspberry Pi 5\n\n🧠 Stack IA locale :\nOllama + Phi-3 Mini\nFaster-Whisper (STT)\nPygame UI',
          en: 'Portable AI assistant\nGameBoy form factor — Raspberry Pi 5\n\n🧠 Local AI stack:\nOllama + Phi-3 Mini\nFaster-Whisper (STT)\nPygame UI' },
        { fr: '⚙ Features :\n• USB-C OTG (clavier virtuel)\n• Contrôles physiques (boutons)\n• 100% hors ligne\n• Souveraineté IA totale\n\nProjet personnel "maker".',
          en: '⚙ Features:\n• USB-C OTG (virtual keyboard)\n• Physical button controls\n• 100% offline\n• Full AI sovereignty\n\nPersonal "maker" project.' },
      ],
    },

    project_portfolio: {
      icon: '🌐',
      title: { fr: 'Portfolio DOOM', en: 'DOOM Portfolio' },
      pages: [
        { fr: 'Ce portfolio lui-même !\n\nVersions créées :\n• Site DOOM-themed (raycaster JS)\n• Fiche RPG interactive (Pixel art)\n• Ce jeu RPG Zelda-like\n\nFait maison, 100% vanilla.',
          en: 'This very portfolio!\n\nVersions built:\n• DOOM-themed site (JS raycaster)\n• Interactive RPG sheet (Pixel art)\n• This Zelda-like RPG game\n\nHandmade, 100% vanilla.' },
      ],
    },

    /* ---- PERSONAL OFFICE ----------------------- */
    hobby_cooking: {
      icon: '🍳',
      title: { fr: 'Cuisine & Pâtisserie', en: 'Cooking & Baking' },
      pages: [
        { fr: 'Passionné de cuisine depuis toujours.\n\n• Baking maison (pain, viennoiseries)\n• Cuisine créative & expérimentale\n• Meal prep & nutrition consciente\n• Techniques de fermentation',
          en: 'Lifelong cooking enthusiast.\n\n• Home baking (bread, pastries)\n• Creative & experimental cooking\n• Meal prep & mindful nutrition\n• Fermentation techniques' },
      ],
    },

    hobby_brewing: {
      icon: '🍺',
      title: { fr: 'Brassage & Fermentation', en: 'Brewing & Fermentation' },
      pages: [
        { fr: 'Fabrication artisanale de boissons :\n\n🍺 Ginger Beer maison\n  → Fermentation naturelle, épicée\n\n🍯 Hydromel\n  → Méthode traditionnelle\n  → Différentes variantes de miel',
          en: 'Artisanal drink making:\n\n🍺 Homemade Ginger Beer\n  → Natural fermentation, spicy\n\n🍯 Mead (Hydromel)\n  → Traditional method\n  → Different honey varieties' },
        { fr: 'La même rigueur scientifique\nque l\'infrastructure cloud :\n• Monitoring des températures\n• Contrôle de la fermentation\n• Itération sur les recettes\n• Documentation des batches',
          en: 'The same scientific rigor\nas cloud infrastructure:\n• Temperature monitoring\n• Fermentation control\n• Recipe iteration\n• Batch documentation' },
      ],
    },

    hobby_diy: {
      icon: '🔧',
      title: { fr: 'Bricolage & Fabrication', en: 'DIY & Making' },
      pages: [
        { fr: 'Maker dans l\'âme :\n\n⌨ Claviers mécaniques\n  → Assemblage, lubrification, modding\n  → Switches personnalisés\n\n🔧 Projets électronique\n  → Raspberry Pi, Arduino\n  → Impression 3D',
          en: 'Maker at heart:\n\n⌨ Mechanical keyboards\n  → Assembly, lubing, modding\n  → Custom switches\n\n🔧 Electronics projects\n  → Raspberry Pi, Arduino\n  → 3D printing' },
      ],
    },

    hobby_geek: {
      icon: '🎮',
      title: { fr: 'Culture Geek', en: 'Geek Culture' },
      pages: [
        { fr: '🎮 Gaming :\nProject Zomboid · Jeux RPG\nJeux de stratégie\n\n💻 Dev passion :\nCréer des projets dans tous les domaines\n(jeux, IA, hardware, web...)',
          en: '🎮 Gaming:\nProject Zomboid · RPG games\nStrategy games\n\n💻 Dev passion:\nBuilding projects in all domains\n(games, AI, hardware, web...)' },
        { fr: '📷 Photographie :\nPhotographie urbaine & paysages\nRetouche numérique\n\n🔒 Privacy :\nProtection des données personnelles\nDé-googlification, self-hosting',
          en: '📷 Photography:\nUrban & landscape photography\nDigital editing\n\n🔒 Privacy:\nPersonal data protection\nDe-googling, self-hosting' },
      ],
    },

  }, // end objects

}; // end CV.content
