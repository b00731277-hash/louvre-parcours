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

(Remarque technique : ce Mac n'avait ni Python ni git installés par défaut
— un serveur local a été lancé une fois avec Ruby, déjà présent sur macOS,
juste pour vérifier le rendu pendant le développement. Ce n'est pas
nécessaire pour l'usage normal du site.)

## Déployer sur GitHub Pages

Le dépôt local est déjà initialisé et le premier commit est fait. Le
workflow de publication (`.github/workflows/pages.yml`) est prêt ; il ne
reste que la partie que vous seule devez faire, depuis un Terminal :

```bash
cd "/Users/jdufrenois/Documents/musees-parcours"

# Créez un dépôt vide sur github.com (ex. "musees-parcours"), sans README
# ni .gitignore (déjà présents ici), puis :
git remote add origin https://github.com/b00731277-hash/musees-parcours.git
git branch -M main
git push -u origin main
```

Ensuite, dans le dépôt sur GitHub : **Settings → Pages → Build and
deployment → Source : GitHub Actions**. Le workflow se déclenche
automatiquement à chaque push sur `main`. L'URL sera de la forme
`https://b00731277-hash.github.io/musees-parcours/` (indiquée dans
**Settings → Pages** une fois le déploiement terminé).

**Point d'attention (voir aussi PLAN.md §6)** : un dépôt GitHub Pages
"classique" est **public** par défaut — n'importe qui avec le lien peut
consulter le site, y compris son contenu pédagogique (et le dépôt
lui-même doit être public pour que GitHub Pages fonctionne sans compte
payant). Si vous voulez le garder privé, dites-le : GitHub Pages sur un
dépôt privé demande un abonnement GitHub Pro/Team/Enterprise.

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
