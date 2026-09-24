# Parcours de visite — Louvre

Convertit des cours d'histoire de l'art en mini parcours de visite au musée
du Louvre, à consulter sur mobile pendant la visite.

Voir [SPEC.md](SPEC.md) pour le cahier des charges complet et
[PLAN.md](PLAN.md) pour le plan de construction commenté.

## Utilisation au quotidien

1. Donnez à Claude le texte d'un de vos cours, dans ce projet.
2. Claude propose un ou plusieurs parcours (~5-8 œuvres du Louvre reliées
   par un fil conducteur, ≤ 1h chacun) — vous validez ou ajustez.
3. Claude recherche la salle/aile/niveau de chaque œuvre nouvelle, rédige
   les analyses condensées et ajoute le(s) parcours à `data/app-data.js`.
4. Vous consultez le résultat en ouvrant `app/index.html` (voir plus bas
   pour le lancer en local), ou depuis le site publié une fois déployé.

## Lancer le site en local

La page charge ses données depuis `data/app-data.js` via une balise
`<script>` (pas de `fetch`), donc **un double-clic sur `app/index.html`
suffit** — pas besoin de serveur.

(Remarque technique : ce Mac n'a ni Python ni Node ni git installés par
défaut — testé pendant le développement, un serveur local a été lancé une
fois avec Ruby, déjà présent sur macOS, juste pour vérifier le rendu. Ce
n'est pas nécessaire pour l'usage normal du site.)

## Déployer sur GitLab Pages

Tout est prêt dans ce dossier (`.gitlab-ci.yml`, `.gitignore`) ; il ne
reste que la partie que vous seule devez faire, depuis un Terminal :

```bash
cd "/Users/jdufrenois/Documents/louvre-parcours"

# Si git n'est pas encore installé sur ce Mac :
xcode-select --install

git init
git add .
git commit -m "Premier parcours : romantisme contre néoclassicisme"

# Créez un dépôt vide sur gitlab.com (ex. "louvre-parcours"), puis :
git remote add origin git@gitlab.com:<votre-compte>/louvre-parcours.git
git branch -M main
git push -u origin main
```

GitLab détecte automatiquement `.gitlab-ci.yml` et publie le site. L'URL
sera de la forme `https://<votre-compte>.gitlab.io/louvre-parcours/`
(visible dans GitLab sous **Déployer → Pages** une fois le pipeline
terminé).

**Point d'attention (voir aussi PLAN.md §6)** : un projet GitLab Pages
"classique" est **public** par défaut — n'importe qui avec le lien peut
consulter le site, y compris son contenu pédagogique. Si vous voulez le
garder privé, dites-le : il existe des options (dépôt privé avec accès
restreint) mais elles demandent une configuration supplémentaire, parfois
liée au plan GitLab utilisé.

## Structure des données

`data/app-data.js` contient deux listes, exposées comme variables
globales lues directement par `app/index.html` :

### `window.OEUVRES`

Une entrée par œuvre, clé stable = l'ark ID Louvre (issu de
`collections.louvre.fr`) :

```js
{
  id: "cl010065872",
  titre: "Le 28 juillet 1830. La Liberté guidant le peuple",
  artiste: "Eugène Delacroix",
  dates: "1830",
  salle: "Salle 700",
  aile: "Aile Denon",
  niveau: "Niveau 1",
  image: "https://collections.louvre.fr/media/cache/small/.../....JPG",
  notice_url: "https://collections.louvre.fr/ark:/53355/cl010065872"
}
```

La localisation (`salle`/`aile`/`niveau`) est récupérée via la fiche JSON
officielle de l'œuvre (`https://collections.louvre.fr/ark:/53355/<id>.json`
— accessible directement, contrairement à leur moteur de recherche interne
qui est protégé par un anti-robot).

### `window.PARCOURS`

Une entrée par parcours généré. `etapes` est une liste **à plat**,
ordonnée dans l'ordre de visite ; l'application regroupe automatiquement
à l'affichage les étapes consécutives situées dans la même salle (pas
besoin de dupliquer l'info de salle ici) :

```js
{
  id: "denon_1804-1830_romantisme-contre-neoclassicisme",
  titre: "[Louvre] [Aile Denon] [1804-1830] Romantisme contre néoclassicisme",
  date_creation: "2026-09-24",
  cours_source: "Introduction générale — Anne-Sophie Godot, École du Louvre, 1er septembre 2025",
  fil_conducteur: "La naissance du romantisme français face au néoclassicisme...",
  duree_estimee: "45-60 min",
  etapes: [
    { oeuvre_id: "cl010064830", note: "Analyse condensée de 150 à 400 mots, tirée du cours..." },
    { oeuvre_id: "cl010062570", note: "..." }
  ]
}
```

### Convention de nommage

Voir SPEC.md §11 : titre affiché au format
`[Louvre] [Aile] [Période] Nom du parcours`, avec un slug technique associé
(minuscules, sans accents, `<aile>_<période>_<mots-clés>`).
