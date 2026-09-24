# Plan de construction — Site "Parcours de visite"

Ce document ne contient aucun code : c'est le plan que je propose de suivre,
écrit pour être lu et discuté avant que je touche à quoi que ce soit.

## 1. Étapes de construction, dans l'ordre

1. **Squelette du site** : une page qui affiche une liste vide et un détail
   vide, avec la structure visuelle générale (couleurs, typographie,
   disposition mobile puis ordinateur). Rien de fonctionnel encore, mais on
   peut déjà juger si l'allure générale vous plaît avant d'y mettre du
   contenu réel.
2. **Modèle de données** : le fichier qui contiendra les œuvres et les
   parcours, avec la nouvelle structure validée (étapes = salles, chaque
   salle contient une liste d'œuvres dans l'ordre de visite).
3. **Premier parcours réel** : je recherche la localisation (salle/aile/
   niveau) des 5 œuvres validées, je rédige les 5 analyses (150-400 mots,
   tirées de votre cours), et j'insère ce parcours dans le modèle de
   données. C'est le premier test "grandeur nature" du modèle.
4. **Vue détail branchée sur les vraies données** : la page affiche
   effectivement ce premier parcours — étape par salle, œuvres dans l'ordre,
   analyses dépliées, image et lien vers la notice Louvre pour chacune.
5. **Export PDF** : bouton d'impression avec une mise en page pensée pour le
   papier, testé sur ce même parcours.
6. **Dépôt git + configuration GitHub Pages**, prêts localement, avec un
   mode d'emploi pour que vous fassiez la création du dépôt et le premier
   `git push` vous-même.
7. **Vérification finale** : rendu sur mobile, rendu à l'impression, relecture
   du mode d'emploi pour ajouter un futur parcours.

## 2. Choix techniques retenus, et pourquoi

### Où vivent les données
Un seul fichier JavaScript (`data/app-data.js`) contenant deux listes : les
œuvres, et les parcours. Pas de vraie base de données, pas de fichiers
séparés chargés à la demande.

**Pourquoi** : votre Mac n'a pas d'outil déjà installé permettant de "servir"
des fichiers séparés à une page web (Python et Node nécessitent une
installation qui demande votre mot de passe — je n'ai pas voulu le faire
sans vous le signaler). Or un navigateur bloque, pour des raisons de
sécurité, le chargement de fichiers séparés depuis une page ouverte en
double-clic. Regrouper toutes les données dans un seul fichier JavaScript,
lu directement par la page, contourne ce blocage — aussi bien en local
qu'une fois le site déployé sur GitHub Pages (où le blocage ne se pose de
toute façon plus, mais je préfère une seule façon de faire, testée dans les
deux cas).

**Alternative écartée** : une vraie base de données avec un petit serveur —
disproportionné pour un usage à une seule personne, et contraire à la
contrainte "site 100% statique, pas de backend" déjà actée dans la spec.

### Comment l'application s'affiche
Une seule page HTML avec deux "vues" gérées à l'intérieur (liste des
parcours / détail d'un parcours), plutôt que plusieurs pages séparées.

**Pourquoi** : plus fiable sur mobile (pas de rechargement de page entre la
liste et le détail, transition instantanée), et plus simple à maintenir
(la mise en page n'existe qu'à un seul endroit).

**Alternative écartée** : une page par parcours — plus simple à isoler
individuellement, mais oblige à dupliquer la mise en page dans chaque
fichier et complique l'export PDF cohérent entre parcours.

### Ce dont l'application dépend
Rien d'externe : pas de base en ligne, pas de clé, pas de compte à créer,
pas de bibliothèque JavaScript téléchargée. Les deux seuls moments où une
connexion internet est nécessaire : le chargement des images des œuvres
(hébergées sur le site du Louvre) et l'accès au site une fois publié.

**Pourquoi** : conforme à "pas de backend, pas de clé API" déjà acté, et ça
minimise ce qui peut casser avec le temps (rien à renouveler, rien qui
expire).

### Export PDF
La fonction d'impression du navigateur (`Cmd+P` / bouton "imprimer"), avec
une mise en page dédiée à l'impression, plutôt qu'une bibliothèque de
génération de PDF.

**Pourquoi** : la façon la plus simple et la plus fiable de produire un PDF
correct sans rien installer ni dépendre d'un service externe. Fonctionne de
la même manière sur ordinateur et sur mobile.

**Point d'attention** : le rendu peut varier légèrement d'un navigateur à
l'autre (Safari vs Chrome). Et comme expliqué en §5 ci-dessous, si vous êtes
hors connexion au moment d'imprimer, les images ne seront pas dans le PDF.

## 3. Ce que je ne ferai pas dans cette V1

- Pas de recherche ni de filtres dans la liste des parcours : liste
  chronologique simple, comme validé.
- Pas de regroupement par aile ou par période dans la liste (pourra être
  ajouté plus tard si la liste devient longue).
- Pas de génération d'un parcours sans validation humaine du fil conducteur.
- Pas d'intégration automatisée au moteur de recherche du Louvre (bloqué par
  leur anti-robot) : je continue à chercher moi-même sur le web.
- Pas de compte utilisateur ni de protection par mot de passe (question
  ouverte plus bas si le site doit rester privé).
- Pas de carte/plan visuel interactif du musée : uniquement du texte
  (salle / aile / niveau). Ce n'est pas dans la spec — dites-moi si vous
  l'imaginiez, sinon je ne le construis pas.
- Pas de mode hors-ligne pour le site lui-même : seul le PDF exporté est
  pensé pour un usage hors connexion.

## 4. Comment je compte traiter la partie "interface"

La spec n'a pas de section "interface" à proprement parler, mais plusieurs
exigences d'affichage y sont dispersées (usage mobile en §2, structure par
salle en §4, export PDF en §7/§8). Voici comment je compte les traiter
ensemble :

- **Mobile d'abord** : je conçois l'affichage d'abord pour un écran de
  téléphone (texte lisible sans zoomer, boutons assez grands pour le
  doigt, pas de défilement horizontal), puis je vérifie que ça reste
  correct sur un écran d'ordinateur — plutôt que l'inverse.
- **Une étape = une salle** : l'en-tête de salle (aile / niveau / salle)
  n'apparaît qu'une fois par étape, suivi des œuvres de cette salle les
  unes sous les autres, dans l'ordre de visite, avec leur image et leur
  analyse déjà dépliée (pas besoin de cliquer pour lire le texte).
- **Liste d'accueil** : des cartes cliquables, la plus récente en haut ;
  cliquer ouvre le détail du parcours.
- **Bouton d'export PDF** : visible en haut du détail d'un parcours ; au
  moment de l'impression, les couleurs de fond et les boutons de navigation
  disparaissent pour ne garder que le contenu utile sur papier.
- **Style visuel** : je repars de l'esquisse du tout premier essai (fond
  clair, touche or/beige évoquant un cadre muséal, typographie classique),
  faute de retour de votre part dessus — je vous montrerai le rendu avant
  de le considérer comme figé.

## 5. Endroits où j'ai fait un choix à votre place

À valider ou corriger si ça ne vous convient pas :

1. **Toutes les données dans un seul fichier JS** plutôt que plusieurs
   fichiers séparés (détaillé en §2). Conséquence pratique : ce fichier
   grossit à chaque nouveau parcours ; ça reste gérable à la main jusqu'à
   plusieurs dizaines de parcours, au-delà il faudra revoir l'organisation.
2. **PDF via l'impression du navigateur** plutôt qu'une génération "propre" :
   plus simple, mais légèrement dépendant du navigateur utilisé.
3. **Une page unique à deux vues** plutôt que des pages séparées par
   parcours.
4. **Le style visuel** esquissé au premier essai, repris par défaut faute
   de retour explicite de votre part.
5. **Images affichées directement depuis les serveurs du Louvre**, sans
   copie stockée dans le projet — plus simple et plus léger, mais dépend
   d'internet et soulève la question d'usage détaillée au point 2
   ci-dessous.

## 6. Ce qui me manque encore avant de tout construire sereinement

1. **Confidentialité du site une fois publié.** Un site GitHub Pages
   "classique" est public par défaut : n'importe qui avec le lien — voire
   les moteurs de recherche — peut le consulter. Vos notes de cours et
   leur contenu pédagogique seraient donc visibles publiquement, sauf à
   utiliser une fonctionnalité payante de GitHub restreignant l'accès.
   → **Voulez-vous que le site soit public, ou dois-je prévoir une
   restriction d'accès ?**
2. **Droit d'usage des images du Louvre.** Elles sont en libre consultation,
   mais leur réutilisation est encadrée par les conditions générales du
   site. Pour un usage strictement personnel, ça ne pose normalement pas de
   problème ; si le site est rendu public, je préfère avoir votre feu vert
   explicite plutôt que trancher seul.
3. **Images dans le PDF hors connexion.** Comme les images sont chargées
   depuis internet, un PDF imprimé sans connexion au moment de l'impression
   n'aura pas les images (texte seul). → **Ça vous va comme ça, ou voulez-
   vous que j'intègre les images directement dans les données du parcours**
   (ce qui alourdit le fichier de données, mais rend le PDF fiable hors
   connexion) ?
4. **Nom du projet/dépôt GitHub.** J'ai besoin du nom que vous voulez donner
   au dépôt pour préparer une configuration et une documentation cohérentes
   (l'URL finale du site en dépendra).
5. **Validation du style visuel.** Je n'ai pas eu de retour sur l'esquisse
   esthétique du premier essai — je pars dessus par défaut, dites-moi si
   vous préférez autre chose (couleurs, ambiance).
