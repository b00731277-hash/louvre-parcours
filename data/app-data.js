// Base de données de l'application "Parcours de visite".
// Régénérée par Claude à chaque nouveau cours traité — voir SPEC.md et PLAN.md
// pour le fonctionnement et README.md pour le schéma détaillé.

window.OEUVRES = [
  {
    id: "cl010062570",
    titre: "Bonaparte visitant les pestiférés de Jaffa (11 mars 1799)",
    artiste: "Antoine-Jean Gros",
    dates: "1804",
    salle: "Salle 700",
    aile: "Aile Denon",
    niveau: "Niveau 1",
    image: "https://collections.louvre.fr/media/cache/small/0000000021/0000062570/0000800444_OG.JPG",
    notice_url: "https://collections.louvre.fr/ark:/53355/cl010062570"
  },
  {
    id: "cl010064830",
    titre: "Scène de déluge",
    artiste: "Anne-Louis Girodet de Roucy-Trioson",
    dates: "1800-1825 (Salons de 1806 et 1814)",
    salle: "Salle 702",
    aile: "Aile Denon",
    niveau: "Niveau 1",
    image: "https://collections.louvre.fr/media/cache/small/0000000021/0000064830/0000136183_OG.JPG",
    notice_url: "https://collections.louvre.fr/ark:/53355/cl010064830"
  },
  {
    id: "cl010065870",
    titre: "Scènes des massacres de Scio. Familles grecques attendant la mort ou l'esclavage",
    artiste: "Eugène Delacroix",
    dates: "1824",
    salle: "Salle 700",
    aile: "Aile Denon",
    niveau: "Niveau 1",
    image: "https://collections.louvre.fr/media/cache/small/0000000021/0000065870/0000974321_OG.JPG",
    notice_url: "https://collections.louvre.fr/ark:/53355/cl010065870"
  },
  {
    id: "cl010065872",
    titre: "Le 28 juillet 1830. La Liberté guidant le peuple",
    artiste: "Eugène Delacroix",
    dates: "1830",
    salle: "Salle 700",
    aile: "Aile Denon",
    niveau: "Niveau 1",
    image: "https://collections.louvre.fr/media/cache/small/0000000021/0000065872/0001264365_OG.JPG",
    notice_url: "https://collections.louvre.fr/ark:/53355/cl010065872"
  },
  {
    id: "cl010277627",
    titre: "Vénus de Milo",
    artiste: "Anonyme (art grec hellénistique)",
    dates: "vers 150-125 av. J.-C.",
    salle: "Salle 345",
    aile: "Aile Sully",
    niveau: "Niveau 0",
    image: "https://collections.louvre.fr/media/cache/small/0000000021/0000277627/0000625031_OG.JPG",
    notice_url: "https://collections.louvre.fr/ark:/53355/cl010277627"
  }
];

window.PARCOURS = [
  {
    id: "denon_1804-1830_romantisme-contre-neoclassicisme",
    titre: "[Louvre] [Aile Denon] [1804-1830] Romantisme contre néoclassicisme",
    date_creation: "2026-09-24",
    cours_source: "Introduction générale — Anne-Sophie Godot, École du Louvre, 1er septembre 2025",
    fil_conducteur: "La naissance du romantisme français face au néoclassicisme (1804-1830), de Gros à Delacroix, avec la Vénus de Milo comme écho antique à cette tension entre référence et rupture.",
    duree_estimee: "45-60 min",
    etapes: [
      {
        oeuvre_id: "cl010064830",
        note: "Peinte entre 1800 et 1825 et présentée aux Salons de 1806 et de 1814, cette toile de plus de quatre mètres de haut montre des personnages agrippés à un arbre, sous un ciel d'orage zébré d'éclairs, dans un paysage rocheux balayé par la crue. C'est, selon le cours, « une véritable œuvre romantique » : les personnages sont traités dans des teintes sombres, les couleurs se juxtaposent plutôt qu'elles ne se fondent, et le mouvement général du tableau porte cette tension dramatique propre au romantisme naissant. Mais un détail contredit cette lecture d'ensemble : le personnage central, lui, garde les caractères esthétiques du néoclassicisme — pose maîtrisée, anatomie idéalisée, calme presque sculptural au milieu du chaos. Girodet, élève de David comme Gros, illustre ainsi à lui seul la porosité des frontières stylistiques du début du XIXe siècle : un même tableau peut mêler héritage néoclassique et sensibilité romantique naissante, ce qui pousse le cours à conclure que « les choses et définitions des styles sont complexes ». C'est précisément cette hésitation, cet entre-deux, qui fait de cette toile un point de départ pertinent pour ce parcours : avant de voir des œuvres pleinement romantiques dans la salle voisine, elle montre le romantisme en train de se dégager, encore retenu, du modèle néoclassique dominant."
      },
      {
        oeuvre_id: "cl010062570",
        note: "En 1804, Antoine-Jean Gros peint cette immense toile (plus de cinq mètres de haut) qui met en scène Bonaparte, encore Premier consul, visitant l'hôpital militaire de Jaffa pendant la campagne de Syrie : il touche de la main la tumeur pestilentielle d'un malade, tandis qu'un médecin tente de l'en empêcher et qu'un officier se bouche le nez. Le cours situe Gros comme l'élève de David qui reprend son atelier lorsque celui-ci part en Belgique, chargé de poursuivre la « geste napoléonienne » en peinture — un art mis directement au service du pouvoir. Peintre académique et peintre d'histoire de formation, Gros glisse ici vers une tonalité romantique et orientale : les couleurs, l'architecture de la cour de mosquée et ce que le cours appelle le « bruissement romantique » de certaines figures annoncent déjà Delacroix. Pourtant, la frise à l'antique visible à l'arrière-plan rappelle que Gros reste redevable du vocabulaire néoclassique de son maître. Daté de l'année du Sacre de Napoléon, ce tableau illustre bien l'idée développée en cours que règne, politique et style artistique avancent ensemble (« cf. David sous 5 régimes différents ») : ici, c'est le pouvoir consulaire puis impérial qui se construit une image, via un langage pictural encore en transition entre deux esthétiques."
      },
      {
        oeuvre_id: "cl010065870",
        note: "Présentée au Salon de 1824, cette toile de plus de quatre mètres de haut représente des familles grecques dans l'attente de la mort ou de l'esclavage, pendant les massacres perpétrés lors de la guerre d'indépendance grecque sur l'île de Scio. Le cours situe Eugène Delacroix comme un artiste pleinement romantique, mais rattaché à une « filière orientaliste » tournée vers la Méditerranée — un romantisme qui ne se limite pas au sujet contemporain français mais va chercher son inspiration et sa charge dramatique dans un « ailleurs » géographique et culturel. Cette toile s'inscrit dans le mouvement plus large décrit en cours autour de l'internationalisation progressive des regards artistiques au XIXe siècle : au moment même où les expositions universelles commencent à mettre en contact des cultures visuelles éloignées, la peinture française se tourne déjà vers la Méditerranée orientale pour y puiser des sujets d'actualité politique traités avec une intensité émotionnelle et chromatique typiquement romantique. Placée dans la même salle que le Bonaparte de Gros, l'œuvre permet de mesurer, à vingt ans d'écart, le chemin parcouru entre un romantisme encore timide, contenu par l'héritage néoclassique, et une peinture pleinement assumée dans son engagement dramatique et sa charge politique."
      },
      {
        oeuvre_id: "cl010065872",
        note: "Peinte à l'automne 1830 et exposée au Salon de 1831, cette toile commémore les Trois Glorieuses de juillet 1830 : une femme du peuple coiffée du bonnet phrygien, incarnation de la Liberté, mène un groupe hétéroclite par-dessus une barricade, drapeau tricolore dans une main, fusil à baïonnette dans l'autre. Le cours insiste sur un paradoxe : Delacroix, déjà installé comme artiste (« trop âgé » pour être un jeune insurgé), choisit de montrer la Révolution « d'une autre manière » que ses prédécesseurs — non pas un épisode daté et localisé, mais une allégorie intemporelle. Résultat : l'image est devenue au fil du temps LA représentation de la Révolution dans l'imaginaire collectif, au point d'être « trop rarement associée » à son contexte précis, le début de la monarchie de Juillet, plutôt qu'à 1789. Le cours illustre cette persistance de l'image par un exemple contemporain frappant : une reprise du tableau par l'artiste Martin Argyroglo pour son œuvre Nation, publiée en une de L'Obs le 14 janvier 2015 — soit près de deux siècles après sa création, en pleine actualité française. Conclure ce parcours sur cette toile permet de montrer comment une œuvre née d'un moment politique précis peut se détacher de son contexte pour devenir une image collective réactivée à chaque nouvelle crise, comme le sera aussi, mais dans un tout autre registre, la Vénus de Milo à la dernière étape."
      },
      {
        oeuvre_id: "cl010277627",
        note: "Retrouvée en avril 1820 sur l'île de Milo, cette statue hellénistique (vers 150-125 av. J.-C.), incomplète — il lui manque le bras gauche, une grande partie du bras droit et le pied gauche —, entre dans les collections au moment même où se développe la peinture française étudiée dans ce parcours : sa découverte est quasi contemporaine du Bonaparte de Gros et de la Scène de déluge de Girodet. Le cours en fait un cas d'école pour interroger la manière dont une même référence antique peut être utilisée de façons opposées selon les époques : au XIXe siècle, les sculpteurs s'appuient sur elle pour retrouver et faire vivre « la force de l'antique », dans un rapport de continuité et de révérence envers le modèle grec. Au XXe siècle en revanche, elle devient un objet que les artistes détournent et bousculent : la Vénus de Milo aux tiroirs de Salvador Dalí (Art Institute de Chicago), la version d'Arman (1992, rue Jacques Callot), ou encore l'Eroded Venus de Daniel Arsham (2000). Le cours résume ce basculement en une formule : « dans un cas référence et dans le second bouleversement ». En clôture du parcours, la Vénus de Milo permet ainsi de prendre du recul sur tout ce qui a été vu dans les salles précédentes : le XIXe siècle romantique et néoclassique n'a cessé de dialoguer avec l'Antiquité — tantôt en s'y référant, tantôt en s'en émancipant — un dialogue que le XXe siècle poursuivra à sa manière, par la rupture."
      }
    ]
  }
];
