# Spec — Parcours Louvre

## 1. Objectif

Convertir les notes de cours d'histoire de l'art de Justine (École du Louvre) en mini
parcours de visite au musée du Louvre, pour réviser en marchant, en autonomie,
en moins d'une heure par parcours.

## 2. Usage

- Utilisatrice unique.
- Outil réutilisé à chaque nouveau cours dont elle veut tirer un parcours.
- Consultation **sur mobile**, pendant la visite, pour voir dans quelle salle
  se trouve chaque œuvre et relire une analyse condensée issue du cours.

## 3. Règles de constitution d'un parcours

- **Un cours peut donner lieu à plusieurs parcours** (autant que nécessaire),
  chacun tenant en **≤ 1h** de visite. Un cours riche peut donc être découpé
  en plusieurs sorties courtes plutôt qu'un seul parcours fourre-tout.
- Ne retenir que les œuvres **effectivement conservées au Louvre** (un cours
  cite souvent des œuvres d'autres musées — Orsay, Rodin, etc. — à exclure).
- Chaque parcours réunit ~5 à 8 œuvres reliées par un **fil conducteur
  explicite** (même artiste, même période, même courant/mouvement).
- **Claude propose** le découpage en parcours, la sélection d'œuvres et le
  fil conducteur de chacun ; **l'utilisatrice valide ou ajuste** avant
  génération définitive.

## 4. Contenu d'un parcours

Un parcours est une suite d'**étapes**. Une étape = **une salle** (identifiée
par aile / niveau / salle), avec la **liste des œuvres à regarder dans cette
salle, dans leur ordre de présentation** (plusieurs œuvres du parcours
peuvent se trouver dans la même salle → une seule étape pour cette salle,
avec plusieurs œuvres listées dans l'ordre où les regarder).

Pour chaque œuvre listée dans une étape :
- Titre, artiste, date.
- Image (vignette).
- Lien vers la notice Louvre (collections.louvre.fr).
- **Analyse condensée** : synthèse des informations du cours concernant
  cette œuvre, **150 à 400 mots** (pas juste titre/artiste — le contenu
  pédagogique du cours doit s'y retrouver).

## 5. Constitution de la base d'œuvres

- Base **construite au fil de l'eau**, cours après cours — pas de préchargement
  générique.
- Le moteur de recherche interne de collections.louvre.fr est protégé par un
  anti-robot : la localisation (salle/aile/niveau) de chaque nouvelle œuvre est
  retrouvée par **recherche web** (pas d'appel automatisé à leur moteur de
  recherche), puis ajoutée à la base.
- Chaque œuvre n'est recherchée qu'une fois ; réutilisée ensuite pour tout
  parcours qui la cite.

## 6. Fonctionnement du "moteur" (aujourd'hui)

Il n'y a pas de bouton "générer" autonome dans l'appli : la génération se fait
**en conversation avec Claude**, dans ce projet, à chaque nouveau cours :

1. Justine donne le texte du cours à Claude.
2. Claude identifie les œuvres du Louvre citées.
3. Claude propose une sélection (~5-8 œuvres) + un fil conducteur.
4. Justine valide ou ajuste.
5. Claude recherche la localisation des œuvres nouvelles (recherche web),
   les ajoute à la base si besoin.
6. Claude rédige l'analyse condensée (150-400 mots) de chaque œuvre à partir
   du cours, et regroupe les œuvres en étapes par salle.
7. Claude enregistre le nouveau parcours dans le site (voir §7).

## 7. Livrables / diffusion

Livrable final unique : le site **"Parcours de visite"**, développé avec
Claude, disponible sur ordinateur et mobile.

- **Site statique déployé sur GitLab Pages.** Claude prépare tout localement
  (fichiers + configuration de publication) ; **c'est Justine qui crée le
  dépôt GitLab et fait le `git push`** — Claude ne pousse pas et ne crée pas
  le dépôt distant.
- **Export PDF par parcours**, à chaque utilisation : un bouton dans le site
  génère un PDF imprimable/téléchargeable du parcours consulté (salle par
  salle, œuvres et analyses incluses), pour un usage hors-ligne pendant la
  visite. Réalisé côté client (mise en page d'impression du navigateur), donc
  sans backend ni service externe.

## 8. Contraintes techniques

- Site **100% statique** (HTML/CSS/JS vanilla), pas de backend, pas de clé
  API, pas d'étape de build.
- Les données (œuvres + parcours) sont embarquées dans un fichier JS
  (`data/app-data.js`) plutôt que chargées en JSON via `fetch`, pour que le
  site fonctionne aussi bien en local (double-clic) qu'une fois déployé sur
  GitLab Pages, sans dépendre d'un serveur de développement.
- Design mobile-first (c'est l'usage principal : consultation en marchant).
- Feuille de style d'impression (`@media print`) dédiée pour l'export PDF
  via l'impression navigateur (`window.print()`), sans dépendance externe.

## 9. Hors périmètre (pour l'instant)

- Pas d'intégration automatisée à l'API/moteur de recherche du Louvre.
- Pas de compte utilisateur, pas de multi-utilisateur.
- Pas de génération 100% autonome sans validation humaine du fil conducteur.
- Pas de croisement automatique de plusieurs cours dans un même parcours
  (une étape/un parcours reste rattaché à un seul cours source).

## 10. Premier cas d'usage validé

Cours : *"Introduction générale"*, Anne-Sophie Godot, École du Louvre,
1er septembre 2025.

Fil conducteur validé : **la naissance du romantisme français face au
néoclassicisme (1804–1830)**, avec la Vénus de Milo comme écho antique.

Œuvres validées :

| Œuvre | Artiste | Date |
|---|---|---|
| Bonaparte visitant les pestiférés de Jaffa | Gros | 1804 |
| Scène de déluge | Girodet | 1806 |
| Les massacres de Scio | Delacroix | 1824 |
| La Liberté guidant le peuple | Delacroix | 1830 |
| Vénus de Milo | — | Antique |

## 11. Convention de nommage des parcours

Titre affiché dans le site, au format demandé :

```
[Louvre] [Aile] [Période] Nom du parcours
```

Exemple pour le premier cas d'usage (§10) :

```
[Louvre] [Aile Denon] [1804-1830] Romantisme contre néoclassicisme
```

Identifiant technique (slug) associé, dérivé du titre, en minuscules,
sans accents ni espaces — sert de clé stable en interne (nom de fichier de
données, ancre d'URL) et n'est jamais affiché à l'utilisatrice :

```
denon_1804-1830_romantisme-contre-neoclassicisme
```

Règle de construction du slug : `<aile-en-minuscules>_<période>_<3-4-mots-clés-du-titre>`.
Le préfixe "Louvre" n'est pas répété dans le slug (redondant, tout le site
lui est dédié) mais reste dans le titre affiché puisque c'est ce que
Justine souhaite y voir.

## 12. Organisation de la liste des parcours

Liste chronologique simple sur la page d'accueil, parcours les plus
récents en premier. Pas de regroupement par aile/période pour l'instant
(pourra être ajouté plus tard si la liste devient difficile à parcourir).

## 13. Points restant à affiner (non bloquants)

- Éventuel tri/regroupement additionnel dans la liste des parcours si leur
  nombre grossit beaucoup (voir §12).
