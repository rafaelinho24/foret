# LE DERNIER FORESTIER — Instructions & Contenu pour Claude Code

## Contexte

Tu travailles sur la présentation interactive du concept **"Le Dernier Forestier"**, une série digitale YouTube produite par Classe 2 (studio audiovisuel à Neuchâtel) en co-production avec LAXARGANG (boîte de prod du Grand JD). Le projet est porté par 10 associations forestières romandes de Suisse.

**Avant de commencer, lis tous les fichiers `.md` du projet** pour comprendre le contexte existant, les assets disponibles et le setup technique.

---

## ÉTAPE 1 — Inspecte le projet

Avant d'écrire une seule ligne de code :

1. Liste tous les fichiers du repo
2. Identifie le setup React (Vite, Next.js, CRA, etc.)
3. Regarde ce qui est dans `public/` et `src/assets/` — images, fonts, fichiers statiques
4. Note les dépendances déjà installées dans `package.json`
5. Lis tous les fichiers `.md` existants dans le projet

Adapte tout ce qui suit à ce que tu trouves.

---

## ÉTAPE 2 — Structure des composants

Crée l'architecture de composants suivante :

```
src/
  features/
    presentation/
      Presentation.tsx        // Composant parent, gère la navigation entre slides
      SlideHero.tsx           // Page d'accueil
      SlideIntro.tsx          // Introduction
      SlideSommaire.tsx       // Sommaire interactif
      SlideChapter.tsx        // Slide séparateur plein écran (template réutilisable)
      SlideContent.tsx        // Slide de contenu avec layout gauche/droite (template réutilisable)
      NavLeft.tsx             // Box gauche — navigation chapitres
      NavControls.tsx         // Flèches + indicateur de progression
  data/
    slides.ts               // Toutes les données des slides (contenu, ordre, type)
```

---

## ÉTAPE 3 — Variables CSS & Typographie

Dans `src/index.css` (section `@theme`) :

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

/* Forest typography */
--font-family-title: 'Bebas Neue', sans-serif;
--font-family-serif-display: 'DM Serif Display', serif;
--font-family-dm: 'DM Sans', sans-serif;

/* Forest colour palette */
--color-forest-black: #080c08;
--color-forest-deep:  #0d140d;
--color-forest:       #1a2e1a;
--color-forest-moss:  #2d4a2d;
--color-forest-sage:  #4a7a4a;
--color-forest-lime:  #c8f53c;
--color-forest-cream: #f0ead6;

/* Format 16/9 */
/* SLIDE_W = 1280px / SLIDE_H = 720px — constantes dans Presentation.tsx */
```

---

## ÉTAPE 4 — Format 16/9 & Layout général

Le format 16/9 doit être maintenu sur tous les écrans. Le slide est centré dans la fenêtre avec des barres noires si nécessaire.

```tsx
// Presentation.tsx — logique de base
const SLIDE_W = 1280;
const SLIDE_H = 720;

// Le scale est calculé dynamiquement :
const scale = Math.min(window.innerWidth / SLIDE_W, window.innerHeight / SLIDE_H);
```

Navigation clavier : touches `←` `→` pour changer de slide.
Navigation souris : flèches gauche/droite visibles à l'écran.

---

## ÉTAPE 5 — Layout des slides de contenu

`SlideContent.tsx` est le composant le plus important. Il utilise ce layout :

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌──────────────┐  ┌─────────────────────────────┐ │
│  │              │  │                             │ │
│  │  NAV LEFT    │  │      CONTENU                │ │
│  │  chapitres   │  │      titre                  │ │
│  │  ───────     │  │      texte                  │ │
│  │  > actif     │  │      éléments visuels       │ │
│  │  chapitre    │  │                             │ │
│  │  chapitre    │  │                             │ │
│  │              │  │                             │ │
│  └──────────────┘  └─────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- Box gauche : `~25%` de largeur, fond légèrement plus clair que le fond principal, liste des chapitres avec le chapitre actif mis en évidence en `var(--color-forest-lime)`
- Box droite : `~75%` de largeur, contenu de la slide
- Séparateur vertical subtil entre les deux boxes

---

## ÉTAPE 6 — Données des slides

Dans `slides.ts`, structure les slides dans cet ordre exact :

```ts
export const slides: Slide[] = [
  { id: 'hero',      type: 'hero' },
  { id: 'intro',     type: 'intro' },
  { id: 'sommaire',  type: 'sommaire' },

  { id: 'ch1',  type: 'chapter', number: '01', title: "L'Accroche" },
  { id: 's1',   type: 'content', chapter: 1 },

  { id: 'ch2',  type: 'chapter', number: '02', title: 'Le Concept' },
  { id: 's2',   type: 'content', chapter: 2 },

  { id: 'ch3',  type: 'chapter', number: '03', title: 'Le Format' },
  { id: 's3',   type: 'content', chapter: 3 },

  { id: 'ch4',  type: 'chapter', number: '04', title: "La Mécanique d'un Épisode" },
  { id: 's4',   type: 'content', chapter: 4 },

  { id: 'ch5',  type: 'chapter', number: '05', title: 'Les Personnalités' },
  { id: 's5',   type: 'content', chapter: 5 },

  { id: 'ch6',  type: 'chapter', number: '06', title: 'Les Forêts & les Cantons' },
  { id: 's6',   type: 'content', chapter: 6 },

  { id: 'ch7',  type: 'chapter', number: '07', title: 'Les Épreuves' },
  { id: 's7',   type: 'content', chapter: 7 },

  { id: 'ch8',  type: 'chapter', number: '08', title: 'Le Final' },
  { id: 's8',   type: 'content', chapter: 8 },

  { id: 'ch9',  type: 'chapter', number: '09', title: 'Pourquoi ça marche sur YouTube' },
  { id: 's9',   type: 'content', chapter: 9 },

  { id: 'ch10', type: 'chapter', number: '10', title: 'La Mission des Associations' },
  { id: 's10',  type: 'content', chapter: 10 },

  { id: 'ch11', type: 'chapter', number: '11', title: "L'Équipe & la Production" },
  { id: 's11',  type: 'content', chapter: 11 },
];
```

---

## ÉTAPE 7 — Contenu de chaque slide

---

### SLIDE HERO

**Titre principal :** LE DERNIER FORESTIER
**Sous-titre :** *8 personnalités. 6 forêts. 6 savoirs. 1 gagnant.*
**CTA :** "Découvrir le concept →"
**Ambiance :** fond sombre, vert forêt, accent lime.

---

### SLIDE INTRO

**Titre :** La forêt couvre un tiers de la Suisse. Personne n'en parle.

**Texte :**
Pas parce que c'est ennuyeux — mais parce que personne n'a encore trouvé la bonne façon de le raconter. Les documentaires institutionnels ne touchent pas les jeunes. Les campagnes de sensibilisation prêchent des convertis. Et les métiers forestiers continuent de souffrir d'un déficit d'image criant auprès des nouvelles générations.

**Accroche finale (grande, lime) :** Le Dernier Forestier change ça.

---

### SLIDE SOMMAIRE

Liste des 11 chapitres, cliquables, qui naviguent directement vers la slide chapitre correspondante.

---

### CHAPITRE 01 — L'Accroche

**Contenu slide :**

La forêt couvre un tiers de la Suisse. Personne n'en parle.

Pas parce que c'est ennuyeux — mais parce que personne n'a encore trouvé la bonne façon de le raconter. Les documentaires institutionnels ne touchent pas les jeunes. Les campagnes de sensibilisation prêchent des convertis. Et les métiers forestiers continuent de souffrir d'un déficit d'image criant auprès des nouvelles générations.

**Le Dernier Forestier change ça.**

Pas avec un discours. Pas avec des chiffres. Avec huit personnalités romandes lancées dans l'inconnu, six forêts à traverser, six savoirs forestiers à maîtriser — et un seul gagnant.

---

### CHAPITRE 02 — Le Concept

**Contenu slide :**

**Titre :** 8 personnalités. 6 forêts. 6 savoirs. 1 Dernier Forestier.

Le Dernier Forestier est une série digitale originale produite pour YouTube. Chaque épisode, les candidats arrivent dans une nouvelle forêt d'un canton romand. Un forestier local leur enseigne un vrai savoir — abattage, débardage, lecture du terrain, gestion de la biodiversité, protection contre les risques. Après l'apprentissage, un défi met ce savoir à l'épreuve. Les points s'accumulent. La saison progresse.

La forêt n'est pas un décor. Elle est le terrain de jeu.
Le forestier n'est pas un guide touristique. Il est l'autorité absolue.

> *"Pas de drama. Juste du vrai."*

---

### CHAPITRE 03 — Le Format

**Contenu slide — afficher sous forme de blocs visuels distincts :**

**La saison :**
- 8 personnalités romandes
- 6 épisodes — 6 forêts — 6 cantons
- 1 savoir forestier réel par épisode
- Points cumulatifs sur toute la saison
- Élimination progressive
- 1 épisode final — épreuve ultime

**Le système d'élimination :**
À la fin de chaque épisode, le candidat avec le score le plus bas est éliminé de la compétition — mais pas de la série. Il change de rôle. Il devient l'assistant du forestier local dans les épisodes suivants.

*Dans une forêt, personne n'est inutile. Tout le monde a un rôle dans l'écosystème.*

---

### CHAPITRE 04 — La Mécanique d'un Épisode

**Contenu slide — afficher les 4 actes de façon visuelle, chronologique :**

**Acte 1 — Arrivée**
Les candidats débarquent dans la forêt d'un canton romand. Découverte du terrain, du forestier local et du savoir qu'ils vont apprendre.

**Acte 2 — L'enseignement**
Le forestier local prend les commandes. Il enseigne un vrai savoir du métier — abattage, débardage, lecture du terrain, gestion de la biodiversité, protection contre les risques. Pas une conférence. Une immersion réelle.

**Acte 3 — Le défi**
Le savoir appris est immédiatement mis à l'épreuve dans un défi spectaculaire ancré dans la réalité forestière. Les points sont attribués par le forestier — l'autorité incontestable de l'épisode.

**Acte 4 — Le classement**
Les points s'accumulent sur toute la saison. À la fin de l'épisode, le candidat avec le score le plus bas change de rôle : il devient l'assistant du forestier local pour les épisodes suivants.

---

### CHAPITRE 05 — Les Personnalités

**Contenu slide :**

**Titre :** La diversité comme stratégie.

Chaque personnalité est choisie pour deux raisons : son univers propre et son audience. Ensemble, elles couvrent un spectre large de la Suisse romande.

**Profils recherchés :**
- Créateurs de contenu & YouTubeurs romands
- Humoristes & comédiens
- Musiciens & artistes
- Sportifs de haut niveau
- Chefs & personnalités culinaires
- Figures du gaming & esport
- Personnalités médiatiques & journalistes
- Figures politiques accessibles

**Pourquoi ça fonctionne :**
L'audience d'un gamer ne regarde pas la même chose que l'audience d'un chef étoilé. En réunissant ces profils, Le Dernier Forestier touche simultanément des communautés qui ne se croisent jamais — et les amène toutes vers la même forêt.

---

### CHAPITRE 06 — Les Forêts & les Cantons

**Contenu slide :**

**Neuchâtel** — Le bois de lutherie de la Vallée de Roux. Des épicéas sélectionnés depuis des siècles pour leur résonance acoustique, qui fournissent les meilleurs luthiers du monde.

**Vaud** — Le Jorat et ses brigands. La forêt urbaine en tension avec la ville. Un canton où la forêt joue des rôles contradictoires et fascinants.

**Valais** — La forêt protectrice au-dessus de la ligne BLS, arrosée depuis 100 ans. Les coteaux où les pins dépérissent sous l'effet du changement climatique.

**Fribourg** — Les tourbières, le bois de tavillon, le bois de lune. Des traditions forestières ancrées dans des siècles de savoir-faire.

**Genève** — La forêt urbaine comme paradoxe. La nature au cœur de la métropole.

**Jura** — La production de bois comme économie vivante. Le canton le plus boisé de Suisse romande.

---

### CHAPITRE 07 — Les Épreuves

**Contenu slide :**

**Titre :** Ce qui fait stopper le scroll.

**Le critère absolu :**
Chaque épreuve doit être filmable en 30 secondes et donner envie de regarder l'épisode entier. Si l'image ne stoppe pas le scroll — elle est éliminée.

**Les trois piliers d'une épreuve :**
1. Visuellement spectaculaire
2. Ancrée dans un vrai savoir forestier
3. Jamais vu faire à des personnalités romandes

**Note :** Ce chapitre sera co-construit avec les forestiers locaux et l'équipe de production.

---

### CHAPITRE 08 — Le Final

**Contenu slide :**

**Titre :** L'épreuve ultime.

Le final réunit les candidats encore en compétition dans une forêt d'exception. Aucun savoir n'est enseigné. Parce que tout a déjà été appris.

L'épreuve finale convoque simultanément les six savoirs des six épisodes précédents. Lecture du terrain, techniques d'abattage, gestion des risques, connaissance de la faune et de la flore, travail d'équipe en conditions réelles.

Les éliminés des épisodes précédents — devenus assistants des forestiers — jouent un rôle dans le final. Leur expérience terrain, acquise forêt après forêt, peut aider ou compliquer la tâche des finalistes.

Le candidat couronné devient le **Dernier Forestier**.

---

### CHAPITRE 09 — Pourquoi ça marche sur YouTube

**Contenu slide :**

**Rétention sur l'épisode**
Le savoir enseigné crée une tension narrative claire : est-ce que la personnalité va réussir le défi ? Le spectateur reste jusqu'au score final.

**Fidélité sur la saison**
Le système de points cumulatifs crée un enjeu permanent. Rater un épisode c'est rater l'évolution du classement.

**Partage organique**
Chaque défi spectaculaire est un Short potentiel. Chaque performance inattendue est un moment partageable.

**Communauté**
Les spectateurs débattent du classement, anticipent les épreuves, prennent parti. Une communauté se forme entre les épisodes.

**Contenu dérivé**
Shorts des épreuves. Behind the scene pour les publics scolaires. Articles presse. La série vit au-delà de YouTube.

---

### CHAPITRE 10 — La Mission des Associations

**Contenu slide :**

**Titre :** La forêt au cœur — sans jamais le forcer.

Le Dernier Forestier ne fait pas de la pédagogie forestière. Il fait vivre la forêt à des gens qui ne la connaissent pas.

Les métiers forestiers sont au cœur de chaque épisode parce qu'ils sont indispensables à l'action. Le forestier est l'autorité. Son savoir est la clé. Sans lui, l'épreuve est impossible.

Les dix associations forestières romandes sont les garantes de l'authenticité du projet. Elles ouvrent l'accès à leurs forêts, à leurs professionnels, à leur savoir-faire.

**En échange :**
- Visibilité massive auprès des jeunes générations
- Contenu pédagogique dérivé exploitable en milieu scolaire
- Image radicalement renouvelée de la filière forestière

> *"33% de notre territoire. Enfin 100% de visibilité."*

---

### CHAPITRE 11 — L'Équipe & la Production

**Contenu slide :**

**Classe 2**
Studio audiovisuel basé à Neuchâtel. Direction créative, conception du concept, coordination avec les associations forestières romandes. 15 ans d'expérience en production de contenus pour des marques et institutions exigeantes.

**LAXARGANG / Le Grand JD**
Co-producteur de la série. Expertise YouTube, réseau de créateurs romands, crédibilité auprès des audiences digitales. Garantit l'ancrage dans les codes contemporains de la plateforme.

**Les 10 associations forestières romandes**
ForêtNeuchâtel — La Forestière VD — ForêtValais — ForêtGenève — ForêtJura — ForêtFribourg — Lignum Romandie — AREF — Forêt JuraBernois — ForêtSuisse

Partenaires terrain, garantes de l'authenticité, ambassadrices du projet dans chaque canton.

**Un projet pluriannuel**
La première saison pose les bases. Chaque saison enrichit la précédente. L'impact grandit avec le temps.

---

## ÉTAPE 8 — Assets & images

- Inspecte `public/` et `src/assets/` pour trouver les images disponibles
- Si des images de forêt existent, utilise-les comme fonds des slides chapitres avec un overlay sombre `rgba(8,12,8,0.7)`
- Si aucune image n'est disponible, crée des fonds CSS avec gradients et textures qui correspondent à l'ambiance
- Ne jamais laisser un fond blanc ou générique

---

## ÉTAPE 9 — Animations & transitions

- Transition entre slides : fondu enchaîné doux (300–400ms)
- Apparition du contenu : staggered reveal sur les éléments de chaque slide
- Hover sur les chapitres de la nav gauche : couleur lime, légère translation
- Pas d'animations excessives — chaque animation a un but

---

## ÉTAPE 10 — Vérification finale

Avant de terminer, vérifie :
- [ ] Le format 16/9 tient sur toutes les tailles d'écran
- [ ] La navigation clavier fonctionne (← →)
- [ ] Le sommaire navigue correctement vers les bonnes slides
- [ ] La nav gauche met bien en évidence le chapitre actif
- [ ] Aucun fond blanc ou générique
- [ ] Le contenu est lisible sur fond sombre
- [ ] Les transitions sont fluides

---

*Projet confidentiel — Classe 2 × LAXARGANG × Associations forestières romandes — 2026*
