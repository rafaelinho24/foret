/* ═══════════════════════════════════════════════════════════════
   SLIDES DATA — Le Dernier Forestier
   Single source of truth for all slide content and ordering.
   Add new slides here; Presentation.tsx picks them up automatically.
   ═══════════════════════════════════════════════════════════════ */

export type SlideType = 'hero' | 'intro' | 'sommaire' | 'chapter' | 'content';

export type ContentBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'highlight'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'acts'; items: ReadonlyArray<{ title: string; text: string }> }
  | { kind: 'blocks'; items: ReadonlyArray<{ title: string; text: string }> }
  | { kind: 'partners'; items: ReadonlyArray<{ title: string; text: string }> }
  | { kind: 'cantons'; items: ReadonlyArray<{ name: string; text: string }> }
  | { kind: 'tags'; items: string[] }
  | { kind: 'quote'; text: string }
  | { kind: 'placeholder'; text: string };

interface SlideBase {
  id: string;
  type: SlideType;
}

export interface SlideHeroData extends SlideBase {
  type: 'hero';
}

export interface SlideIntroData extends SlideBase {
  type: 'intro';
}

export interface SlideSommaireData extends SlideBase {
  type: 'sommaire';
}

export interface SlideChapterData extends SlideBase {
  type: 'chapter';
  number: string;
  title: string;
}

export interface SlideContentData extends SlideBase {
  type: 'content';
  chapter: number;
  title: string;
  content: ContentBlock[];
}

export type Slide =
  | SlideHeroData
  | SlideIntroData
  | SlideSommaireData
  | SlideChapterData
  | SlideContentData;

export const slides: Slide[] = [
  { id: 'hero', type: 'hero' },
  { id: 'intro', type: 'intro' },
  { id: 'sommaire', type: 'sommaire' },

  /* ── Chapitre 01 ─────────────────────────────────────────────── */
  { id: 'ch1', type: 'chapter', number: '01', title: "L'Accroche" },
  {
    id: 's1',
    type: 'content',
    chapter: 1,
    title: "L'Accroche",
    content: [
      {
        kind: 'paragraph',
        text: "La forêt couvre un tiers de la Suisse. Personne n'en parle.",
      },
      {
        kind: 'paragraph',
        text: "Pas parce que c'est ennuyeux — mais parce que personne n'a encore trouvé la bonne façon de le raconter. Les documentaires institutionnels ne touchent pas les jeunes. Les campagnes de sensibilisation prêchent des convertis. Et les métiers forestiers continuent de souffrir d'un déficit d'image criant auprès des nouvelles générations.",
      },
      { kind: 'highlight', text: 'Le Dernier Forestier change ça.' },
      {
        kind: 'paragraph',
        text: "Pas avec un discours. Pas avec des chiffres. Avec huit personnalités romandes lancées dans l'inconnu, six forêts à traverser, six savoirs ancestraux à maîtriser — et un seul gagnant.",
      },
    ],
  },

  /* ── Chapitre 02 ─────────────────────────────────────────────── */
  { id: 'ch2', type: 'chapter', number: '02', title: 'Le Concept' },
  {
    id: 's2',
    type: 'content',
    chapter: 2,
    title: '8 personnalités. 6 forêts. 6 savoirs. 1 Dernier Forestier.',
    content: [
      {
        kind: 'paragraph',
        text: "Le Dernier Forestier est une série digitale originale produite pour YouTube. Chaque épisode plonge un groupe de personnalités romandes — issues de milieux radicalement différents — dans une forêt d'un canton de Suisse romande. Elles ne savent pas ce qui les attend. Elles ne connaissent pas la forêt. Et c'est exactement pour ça que c'est captivant.",
      },
      {
        kind: 'paragraph',
        text: "Un forestier local leur enseigne un vrai savoir lié à son métier. Puis elles sont mises à l'épreuve. Les points s'accumulent. La saison progresse. Et au final, une épreuve ultime réunit tous les savoirs appris — et révèle le Dernier Forestier.",
      },
      {
        kind: 'paragraph',
        text: "La forêt n'est pas un décor. Elle est le terrain de jeu. Le forestier n'est pas un guide touristique. Il est l'autorité absolue.",
      },
      { kind: 'quote', text: 'Pas de drama. Juste du vrai.' },
    ],
  },

  /* ── Chapitre 03 ─────────────────────────────────────────────── */
  { id: 'ch3', type: 'chapter', number: '03', title: 'Le Format' },
  {
    id: 's3',
    type: 'content',
    chapter: 3,
    title: 'Le Format',
    content: [
      {
        kind: 'blocks',
        items: [
          {
            title: 'La saison',
            text: '8 personnalités romandes · 6 épisodes — 6 forêts — 6 cantons · 1 épreuve par épisode liée à un vrai métier forestier · Points cumulatifs sur toute la saison · Élimination progressive · 1 épisode final — épreuve ultime',
          },
          {
            title: "Le système d'élimination",
            text: "À la fin de chaque épisode, le candidat avec le score le plus bas est éliminé de la compétition — mais pas de la série. Il change de rôle : il devient l'assistant du forestier local. Dans une forêt, personne n'est inutile. Tout le monde a un rôle dans l'écosystème.",
          },
        ],
      },
    ],
  },

  /* ── Chapitre 04 ─────────────────────────────────────────────── */
  { id: 'ch4', type: 'chapter', number: '04', title: "La Mécanique d'un Épisode" },
  {
    id: 's4',
    type: 'content',
    chapter: 4,
    title: "La Mécanique d'un Épisode",
    content: [
      {
        kind: 'acts',
        items: [
          {
            title: 'Acte 1 — Arrivée & mystère',
            text: 'Les personnalités débarquent dans une forêt inconnue. Elles reçoivent un objet ou un indice physique dont elles ne comprennent pas encore la signification.',
          },
          {
            title: "Acte 2 — L'enseignement",
            text: 'Le forestier local prend les commandes. Il enseigne un savoir réel — une technique, une lecture du terrain, un geste du métier. Pas une conférence. Une immersion.',
          },
          {
            title: "Acte 3 — L'épreuve",
            text: "Le savoir est mis à l'épreuve dans un défi spectaculaire. Les points sont attribués par le forestier — l'autorité incontestable de l'épisode.",
          },
          {
            title: 'Acte 4 — La révélation',
            text: "L'objet reçu à l'arrivée prend enfin son sens. Le secret de cette forêt se dévoile. C'est le moment émotionnel fort — celui qu'on partage, qu'on commente, qu'on n'oublie pas.",
          },
        ],
      },
    ],
  },

  /* ── Chapitre 05 ─────────────────────────────────────────────── */
  { id: 'ch5', type: 'chapter', number: '05', title: 'Les Personnalités' },
  {
    id: 's5',
    type: 'content',
    chapter: 5,
    title: 'La diversité comme stratégie.',
    content: [
      {
        kind: 'paragraph',
        text: 'Chaque personnalité est choisie pour deux raisons : son univers propre et son audience. Ensemble, elles couvrent un spectre large de la Suisse romande.',
      },
      {
        kind: 'tags',
        items: [
          'Créateurs de contenu & YouTubeurs romands',
          'Humoristes & comédiens',
          'Musiciens & artistes',
          'Sportifs de haut niveau',
          'Chefs & personnalités culinaires',
          'Figures du gaming & esport',
          'Personnalités médiatiques & journalistes',
          'Figures politiques accessibles',
        ],
      },
      {
        kind: 'paragraph',
        text: "L'audience d'un gamer ne regarde pas la même chose que l'audience d'un chef étoilé. En réunissant ces profils, Le Dernier Forestier touche simultanément des communautés qui ne se croisent jamais — et les amène toutes vers la même forêt.",
      },
    ],
  },

  /* ── Chapitre 06 ─────────────────────────────────────────────── */
  { id: 'ch6', type: 'chapter', number: '06', title: 'Les Forêts & les Cantons' },
  {
    id: 's6',
    type: 'content',
    chapter: 6,
    title: 'Les Forêts & les Cantons',
    content: [
      {
        kind: 'cantons',
        items: [
          {
            name: 'Neuchâtel',
            text: 'Le bois de lutherie de la Vallée de Roux. Des épicéas sélectionnés depuis des siècles pour leur résonance acoustique, qui fournissent les meilleurs luthiers du monde.',
          },
          {
            name: 'Vaud',
            text: 'Le Jorat et ses brigands. La forêt urbaine en tension avec la ville. Un canton où la forêt joue des rôles contradictoires et fascinants.',
          },
          {
            name: 'Valais',
            text: "La forêt protectrice au-dessus de la ligne BLS, arrosée depuis 100 ans. Les coteaux où les pins dépérissent sous l'effet du changement climatique.",
          },
          {
            name: 'Fribourg',
            text: 'Les tourbières, le bois de tavillon, le bois de lune. Des traditions forestières ancrées dans des siècles de savoir-faire.',
          },
          {
            name: 'Genève',
            text: 'La forêt urbaine comme paradoxe. La nature au cœur de la métropole.',
          },
          {
            name: 'Jura',
            text: 'La production de bois comme économie vivante. Le canton le plus boisé de Suisse romande.',
          },
        ],
      },
    ],
  },

  /* ── Chapitre 07 ─────────────────────────────────────────────── */
  { id: 'ch7', type: 'chapter', number: '07', title: 'Les Épreuves' },
  {
    id: 's7',
    type: 'content',
    chapter: 7,
    title: 'Ce qui fait stopper le scroll.',
    content: [
      {
        kind: 'paragraph',
        text: "Chaque épreuve doit être filmable en 30 secondes et donner envie de regarder l'épisode entier. Si l'image ne stoppe pas le scroll — elle est éliminée.",
      },
      {
        kind: 'blocks',
        items: [
          { title: 'Visuellement spectaculaire', text: 'Une image qui arrête le pouce.' },
          {
            title: 'Ancré dans un vrai savoir forestier',
            text: "Pas un défi inventé. Un geste du métier mis à l'épreuve.",
          },
          {
            title: 'Jamais vu faire à des personnalités romandes',
            text: "L'inédit est la garantie du partage.",
          },
        ],
      },
      {
        kind: 'placeholder',
        text: 'Épreuves en cours de définition avec les partenaires forestiers',
      },
    ],
  },

  /* ── Chapitre 08 ─────────────────────────────────────────────── */
  { id: 'ch8', type: 'chapter', number: '08', title: 'Le Final' },
  {
    id: 's8',
    type: 'content',
    chapter: 8,
    title: "L'épreuve ultime.",
    content: [
      {
        kind: 'paragraph',
        text: "Le final réunit les candidats encore en compétition dans une forêt d'exception. Aucun savoir n'est enseigné. Parce que tout a déjà été appris.",
      },
      {
        kind: 'paragraph',
        text: "L'épreuve finale convoque simultanément les six savoirs des six épisodes précédents. Lecture du terrain, techniques d'abattage, gestion des risques, connaissance de la faune et de la flore, travail d'équipe en conditions réelles.",
      },
      {
        kind: 'paragraph',
        text: 'Les éliminés des épisodes précédents — devenus assistants des forestiers — jouent un rôle dans le final. Leur connaissance des secrets de chaque forêt peut aider ou compliquer la tâche des finalistes.',
      },
      {
        kind: 'highlight',
        text: 'Le candidat couronné devient le Dernier Forestier.',
      },
    ],
  },

  /* ── Chapitre 09 ─────────────────────────────────────────────── */
  {
    id: 'ch9',
    type: 'chapter',
    number: '09',
    title: 'Pourquoi ça marche sur YouTube',
  },
  {
    id: 's9',
    type: 'content',
    chapter: 9,
    title: 'Pourquoi ça marche sur YouTube',
    content: [
      {
        kind: 'blocks',
        items: [
          {
            title: "Rétention sur l'épisode",
            text: "L'objet mystérieux remis à l'arrivée retient le spectateur jusqu'à la révélation finale.",
          },
          {
            title: 'Fidélité sur la saison',
            text: "Le système de points cumulatifs crée un enjeu permanent. Rater un épisode c'est rater l'évolution du classement.",
          },
          {
            title: 'Partage organique',
            text: 'Chaque épreuve spectaculaire est un Short potentiel. Chaque révélation est un moment partageable.',
          },
          {
            title: 'Communauté',
            text: 'Les spectateurs débattent du classement, anticipent les épreuves, prennent parti. Une communauté se forme entre les épisodes.',
          },
          {
            title: 'Contenu dérivé',
            text: 'Shorts des épreuves. Behind the scene pour les publics scolaires. Articles presse. La série vit au-delà de YouTube.',
          },
        ],
      },
    ],
  },

  /* ── Chapitre 10 ─────────────────────────────────────────────── */
  { id: 'ch10', type: 'chapter', number: '10', title: 'La Mission des Associations' },
  {
    id: 's10',
    type: 'content',
    chapter: 10,
    title: 'La forêt au cœur — sans jamais le forcer.',
    content: [
      {
        kind: 'paragraph',
        text: 'Le Dernier Forestier ne fait pas de la pédagogie forestière. Il fait vivre la forêt à des gens qui ne la connaissent pas.',
      },
      {
        kind: 'paragraph',
        text: "Les métiers forestiers sont au cœur de chaque épisode parce qu'ils sont indispensables à l'action. Le forestier est l'autorité. Son savoir est la clé. Sans lui, l'épreuve est impossible.",
      },
      {
        kind: 'paragraph',
        text: "Les dix associations forestières romandes sont les garantes de l'authenticité du projet. Elles ouvrent l'accès à leurs forêts, à leurs professionnels, à leurs secrets.",
      },
      {
        kind: 'list',
        items: [
          'Visibilité massive auprès des jeunes générations',
          'Contenu pédagogique dérivé exploitable en milieu scolaire',
          'Image radicalement renouvelée de la filière forestière',
        ],
      },
      {
        kind: 'quote',
        text: '33% de notre territoire. Enfin 100% de visibilité.',
      },
    ],
  },

  /* ── Chapitre 11 ─────────────────────────────────────────────── */
  { id: 'ch11', type: 'chapter', number: '11', title: "L'Équipe & la Production" },
  {
    id: 's11',
    type: 'content',
    chapter: 11,
    title: "L'Équipe & la Production",
    content: [
      {
        kind: 'partners',
        items: [
          {
            title: 'Classe 2',
            text: "Studio audiovisuel basé à Neuchâtel. Direction créative, conception du concept, coordination avec les associations forestières romandes. 15 ans d'expérience en production de contenus pour des marques et institutions exigeantes.",
          },
          {
            title: 'LAXARGANG / Le Grand JD',
            text: "Co-producteur de la série. Expertise YouTube, réseau de créateurs romands, crédibilité auprès des audiences digitales. Garantit l'ancrage dans les codes contemporains de la plateforme.",
          },
          {
            title: 'Les 10 associations forestières romandes',
            text: 'ForêtNeuchâtel · La Forestière VD · ForêtValais · ForêtGenève · ForêtJura · ForêtFribourg · Lignum Romandie · AREF · Forêt JuraBernois · ForêtSuisse',
          },
        ],
      },
      {
        kind: 'paragraph',
        text: "La première saison pose les bases. Chaque saison enrichit la précédente. L'impact grandit avec le temps.",
      },
    ],
  },
];

/** All chapter slides in order — used by NavLeft and SlideSommaire */
export const chapters = slides.filter((s): s is SlideChapterData => s.type === 'chapter');

/** Index of the first slide for a given chapter number */
export function getChapterSlideIndex(chapterNumber: number): number {
  return slides.findIndex(s => s.type === 'chapter' && parseInt(s.number, 10) === chapterNumber);
}
