import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Network, ArrowUp, ArrowDown, Calendar, Users, Map, FileText, Filter, ChevronRight, Eye, TrendingUp, Globe, Shield, Briefcase, Users as UsersGroup, Scale, Quote, ExternalLink } from 'lucide-react';
import NetworkGraph from "./components/NetworkGraph";

// Données d'exemple pour la chronologie - enrichies avec des descriptions plus détaillées
const timelineData = [
    {
        date: 'Juin 2017',
        evenement: 'Publication du papier de recherche "Attention is All You Need" par Google',
        impact: 95,
        description: 'Google publie un article introduisant l\'architecture Transformer, qui révolutionne le traitement du langage naturel et jette les bases des modèles d\'IA générative qui domineront plus tard le marché.',
        source: 'https://arxiv.org/abs/1706.03762'
    },
    {
        date: 'Avril 2021',
        evenement: 'Proposition initiale de l\'AI Act par la Commission européenne',
        impact: 75,
        description: 'La Commission européenne présente sa proposition d\'AI Act, première tentative mondiale de réguler l\'intelligence artificielle de manière globale, basée sur une approche par niveaux de risque. Cette initiative positionne l\'UE comme pionnière de la régulation de l\'IA.',
        source: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:52021PC0206'
    },
    {
        date: 'Juin 2022',
        evenement: 'Débats au Parlement européen sur la souveraineté numérique',
        impact: 60,
        description: 'Les eurodéputés débattent de l\'importance d\'une autonomie stratégique dans les technologies numériques face aux géants américains et chinois. Émergence du concept de "souveraineté numérique européenne" comme pilier de la stratégie européenne.',
        source: 'https://www.europarl.europa.eu/doceo/document/TA-9-2022-0252_FR.html'
    },
    {
        date: 'Novembre 2022',
        evenement: 'Lancement de ChatGPT et intensification du débat public',
        impact: 90,
        description: 'Le lancement de ChatGPT par OpenAI bouleverse le débat public en démontrant les capacités avancées de l\'IA générative, accélérant l\'urgence d\'une régulation adaptée et soulevant des questions sur le retard européen en matière d\'IA de pointe.',
        source: 'https://openai.com/blog/chatgpt'
    },
    {
        date: 'Février 2023',
        evenement: 'Prise de position des États membres sur la régulation de l\'IA',
        impact: 70,
        description: 'Les États membres de l\'UE expriment leurs positions sur la régulation de l\'IA, révélant des tensions entre pays privilégiant l\'innovation et ceux insistant davantage sur les protections et garde-fous éthiques.',
        source: 'https://www.consilium.europa.eu/fr/press/press-releases/2023/02/03/artificial-intelligence-act-council-calls-for-promoting-safe-ai-that-respects-fundamental-rights/'
    },
    {
        date: 'Décembre 2023',
        evenement: 'Accord sur l\'AI Act',
        impact: 95,
        description: 'Accord historique sur l\'AI Act européen, introduisant un cadre réglementaire inédit qui catégorise les systèmes d\'IA selon leur niveau de risque et impose des obligations proportionnées. Cette adoption marque un tournant mondial dans la régulation de l\'IA.',
        source: 'https://www.consilium.europa.eu/fr/press/press-releases/2023/12/09/artificial-intelligence-act-council-and-parliament-strike-a-deal-on-the-first-worldwide-rules-for-ai/'
    },
    {
        date: 'Juin 2024',
        evenement: 'Début de la mise en application de certaines dispositions',
        impact: 85,
        description: 'Début de la mise en œuvre progressive des premières dispositions de l\'AI Act, avec des périodes de transition pour permettre aux entreprises et institutions de s\'adapter. Les autorités nationales de contrôle commencent à se structurer et à se coordonner.',
        source: 'https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence'
    },
    {
        date: 'Février 2025',
        evenement: 'Sommet européen sur la souveraineté de l\'IA à Bruxelles',
        impact: 70,
        description: 'Réunion de haut niveau rassemblant les 27 pays membres de l\'UE, institutions européennes, entreprises et chercheurs pour définir une stratégie commune sur la souveraineté numérique et l\'IA, aboutissant à l\'adoption d\'une déclaration commune.',
        source: 'https://digital-strategy.ec.europa.eu/en'
    },
];

// Données enrichies pour les acteurs
const acteursData = [
    {
        id: 'etat',
        nom: 'État français',
        influence: 85,
        position: 'Favorable à une régulation stricte et au développement d\'une IA souveraine',
        couleur: '#3b82f6',
        description: 'L\'État français vise à la fois à développer une IA nationale compétitive et à protéger les valeurs et intérêts européens à travers une régulation adaptée.',
        arguments: [
            'Nécessité d\'une indépendance stratégique vis-à-vis des États-Unis et de la Chine',
            'Protection des données des citoyens et des entreprises françaises',
            'Soutien à l\'innovation tout en cadrant les risques éthiques',
            'Importance de l\'IA pour la défense nationale et la compétitivité économique'
        ],
        sous_acteurs: [
            { nom: 'Ministère de l\'Économie', role: 'Promotion de l\'innovation' },
            { nom: 'Ministère des Armées', role: 'Applications défensives de l\'IA' },
            { nom: 'CNIL', role: 'Protection des données personnelles' }
        ],
        citations: [
            {
                texte: "L'Europe ne peut pas se contenter d'être un consommateur de technologies conçues ailleurs. Notre souveraineté numérique est un enjeu clé pour les années à venir.",
                auteur: "Emmanuel Macron",
                source: "Discours sur l'IA, VivaTech 2023",
                url: "https://www.elysee.fr/emmanuel-macron/2023/06/15/discours-du-president-emmanuel-macron-au-salon-vivatech"
            },
            {
                texte: "La régulation de l'intelligence artificielle doit conjuguer innovation et protection, sans céder aux excès ni d'un côté ni de l'autre.",
                auteur: "Bruno Le Maire",
                source: "Intervention au Forum économique de Davos, janvier 2023",
                url: "https://www.economie.gouv.fr/bruno-le-maire-davos-2023"
            }
        ]
    },
    {
        id: 'entreprises',
        nom: 'Entreprises Tech',
        influence: 75,
        position: 'Préoccupées par les contraintes réglementaires tout en cherchant à développer leurs capacités',
        couleur: '#ef4444',
        description: 'Les acteurs économiques français et européens sont partagés entre la nécessité d\'innover rapidement et les contraintes réglementaires imposées par l\'Europe.',
        arguments: [
            'Besoin de flexibilité pour concurrencer les géants américains et chinois',
            'Demande de soutiens publics pour développer des technologies d\'IA',
            'Inquiétudes quant à la rigidité de certaines régulations européennes',
            'Importance de standards communs pour le marché unique numérique'
        ],
        sous_acteurs: [
            { nom: 'Startups IA françaises', role: 'Recherche et innovation' },
            { nom: 'Grands groupes industriels', role: 'Applications sectorielles' },
            { nom: 'Big Tech européennes', role: 'Services cloud et infrastructures' }
        ],
        citations: [
            {
                texte: "L'Europe doit trouver un équilibre entre régulation et innovation, et ne pas créer un environnement où il devient difficile de développer de nouvelles technologies.",
                auteur: "Alexandre Lebrun",
                source: "Fondateur de Nabla, Conférence AI for Good 2023",
                url: "https://aiforgood.itu.int/"
            },
            {
                texte: "Nous avons besoin d'un cadre réglementaire qui nous permette d'être compétitifs à l'échelle mondiale, sans sacrifier nos valeurs européennes.",
                auteur: "Rodolphe Belmer",
                source: "PDG d'Atos, Forum InnovAI Europe 2023",
                url: "https://www.atos.net/fr/"
            }
        ]
    },
    {
        id: 'citoyens',
        nom: 'Société civile',
        influence: 60,
        position: 'Préoccupée par les implications éthiques et sociales de l\'IA',
        couleur: '#10b981',
        description: 'Les citoyens et organisations civiles s\'inquiètent des impacts de l\'IA sur la vie privée, l\'emploi et les libertés fondamentales.',
        arguments: [
            'Protection contre la surveillance de masse et les biais algorithmiques',
            'Garantie de transparence dans les décisions prises par l\'IA',
            'Préservation des emplois face à l\'automatisation',
            'Accès égalitaire aux bénéfices de l\'IA'
        ],
        sous_acteurs: [
            { nom: 'Associations de consommateurs', role: 'Protection des utilisateurs' },
            { nom: 'Syndicats', role: 'Impact sur l\'emploi' },
            { nom: 'ONG numériques', role: 'Défense des libertés fondamentales' }
        ],
        citations: [
            {
                texte: "La transparence des algorithmes et le contrôle démocratique des systèmes d'IA sont des conditions essentielles pour préserver nos droits fondamentaux à l'ère numérique.",
                auteur: "La Quadrature du Net",
                source: "Communiqué sur l'AI Act, décembre 2023",
                url: "https://www.laquadrature.net/"
            },
            {
                texte: "L'IA doit être un outil d'émancipation collective et non un instrument de renforcement des inégalités ou de surveillance généralisée.",
                auteur: "CNIL",
                source: "Rapport sur l'IA et les données personnelles, 2023",
                url: "https://www.cnil.fr/fr/intelligence-artificielle"
            }
        ]
    },
    {
        id: 'academiques',
        nom: 'Communauté académique',
        influence: 70,
        position: 'Favorable à une recherche ouverte mais éthique',
        couleur: '#8b5cf6',
        description: 'Les chercheurs et institutions académiques prônent une recherche innovante mais responsable, avec un partage des connaissances.',
        arguments: [
            'Importance de la collaboration internationale en recherche',
            'Besoin d\'éthique par conception dans les systèmes d\'IA',
            'Publication ouverte des découvertes scientifiques',
            'Formation de la prochaine génération de talents en IA'
        ],
        sous_acteurs: [
            { nom: 'Universités', role: 'Formation et recherche fondamentale' },
            { nom: 'Instituts spécialisés', role: 'R&D appliquée' },
            { nom: 'Comités d\'éthique', role: 'Cadrage normatif' }
        ],
        citations: [
            {
                texte: "La recherche en IA doit être basée sur des principes d'ouverture et de collaboration, tout en intégrant une réflexion éthique permanente sur les impacts sociétaux.",
                auteur: "Inria",
                source: "Plan stratégique IA, 2023",
                url: "https://www.inria.fr/fr/intelligence-artificielle-plan-strategique"
            },
            {
                texte: "L'Europe peut et doit définir sa propre voie en matière d'IA, fondée sur l'excellence scientifique et des valeurs fortes de respect des droits humains.",
                auteur: "CNRS",
                source: "Position sur l'IA responsable, 2022",
                url: "https://www.cnrs.fr/fr/intelligence-artificielle"
            }
        ]
    }
];

// Données pour les interactions entre acteurs
const interactionsData = [
    {
        acteur1: 'etat',
        acteur2: 'entreprises',
        description: "L'État français et les entreprises tech collaborent pour développer l'écosystème d'IA nationale, mais des tensions persistent concernant le niveau optimal de régulation. Les entreprises demandent plus de flexibilité tandis que l'État insiste sur la protection des valeurs françaises et européennes.",
        exemples: [
            "Plan national pour l'IA avec financements publics pour les startups",
            "Débats sur l'application de l'AI Act aux PME innovantes",
            "Partenariats public-privé sur des projets d'IA stratégiques"
        ]
    },
    {
        acteur1: 'etat',
        acteur2: 'citoyens',
        description: "L'État doit équilibrer son soutien à l'innovation en IA avec la protection des droits des citoyens. Les organisations de la société civile exercent une pression constante pour renforcer les garanties en matière de vie privée et de surveillance.",
        exemples: [
            "Consultations publiques sur la régulation de l'IA",
            "Actions de la CNIL pour protéger les données personnelles",
            "Mobilisations citoyennes contre les systèmes de reconnaissance faciale"
        ]
    },
    {
        acteur1: 'etat',
        acteur2: 'academiques',
        description: "Relation généralement collaborative entre l'État et le monde académique, avec un financement public substantiel de la recherche, mais des préoccupations persistent concernant la liberté académique et l'influence des intérêts commerciaux ou sécuritaires.",
        exemples: [
            "Création d'instituts de recherche spécialisés en IA",
            "Financement de chaires universitaires",
            "Transfert de technologies vers l'industrie"
        ]
    },
    {
        acteur1: 'entreprises',
        acteur2: 'citoyens',
        description: "Les entreprises tech doivent gagner la confiance des utilisateurs tout en développant des modèles économiques viables. Les associations de consommateurs et ONG surveillent activement les pratiques commerciales et les usages des données.",
        exemples: [
            "Débats sur la transparence algorithmique",
            "Contestations des conditions d'utilisation des services d'IA",
            "Initiatives d'IA éthique par des entreprises socialement responsables"
        ]
    },
    {
        acteur1: 'entreprises',
        acteur2: 'academiques',
        description: "Coopération croissante entre industrie et recherche académique, avec des financements privés, des stages, et des projets communs, mais aussi des tensions autour de l'accès aux données, de la propriété intellectuelle et des priorités de recherche.",
        exemples: [
            "Laboratoires de recherche conjoints université-entreprise",
            "Programmes de doctorants en entreprise (CIFRE)",
            "Controverses sur la fuite des talents académiques vers le privé"
        ]
    },
    {
        acteur1: 'citoyens',
        acteur2: 'academiques',
        description: "La communauté académique joue un rôle crucial dans l'information du public sur les enjeux de l'IA et forme un contrepoids expert aux discours commerciaux. Les citoyens attendent des chercheurs qu'ils développent des technologies responsables.",
        exemples: [
            "Science ouverte et vulgarisation sur l'IA",
            "Participation des chercheurs aux débats publics",
            "Initiatives de sciences participatives impliquant les citoyens"
        ]
    }
];

// Données améliorées pour l'analyse thématique
const themesAnalyse = [
    {
        titre: 'Tension entre compétitivité et éthique',
        description: 'Comment l\'Europe peut-elle développer une IA compétitive tout en maintenant ses exigences éthiques ?',
        aspects: [
            'Vitesse d\'innovation vs rigueur réglementaire',
            'Attraction des talents vs conditions de travail européennes',
            'Exploitation des données vs protection de la vie privée',
            'Libre concurrence vs régulation préventive des risques'
        ]
    },
    {
        titre: 'Souveraineté technologique et infrastructures',
        description: 'Quelles sont les conditions matérielles et stratégiques d\'une véritable indépendance européenne en matière d\'IA ?',
        aspects: [
            'Développement de clouds souverains et de supercalculateurs européens',
            'Maîtrise des chaînes d\'approvisionnement en composants critiques',
            'Contrôle des données stratégiques et création de lacs de données européens',
            'Financement public massif vs dépendance aux capitaux privés internationaux'
        ]
    },
    {
        titre: 'Gouvernance de l\'IA et coopération internationale',
        description: 'Comment l\'Europe peut-elle promouvoir sa vision régulatrice tout en participant aux forums internationaux sur l\'IA ?',
        aspects: [
            'Effet Bruxelles : influence normative européenne à l\'international',
            'Alliances stratégiques avec des partenaires partageant la même vision',
            'Standards techniques communs et interopérabilité des systèmes',
            'Équilibre entre protection du marché intérieur et coopération scientifique mondiale'
        ]
    }
];

// Données pour la section À propos
const aboutData = {
    projectTitle: "Analyse de la controverse sur la souveraineté de l'IA en Europe",
    description: "Ce projet vise à cartographier et analyser les débats autour de l'autonomie stratégique européenne dans le domaine de l'intelligence artificielle, en mettant en lumière les positions des différents acteurs, les événements clés et les enjeux sous-jacents.",
    methodology: [
        "Cartographie des acteurs et analyse de leurs positions",
        "Chronologie des événements structurants du débat",
        "Analyse des interactions entre parties prenantes",
        "Identification des points de tension et de convergence",
        "Étude des initiatives européennes et de leur réception"
    ],
    casesExamples: [
        {
            title: "L'AI Act européen",
            description: "Premier cadre réglementaire mondial complet sur l'IA, cette législation illustre l'approche européenne basée sur les risques et centrée sur l'humain. Les débats autour de son élaboration révèlent les tensions entre protection des droits fondamentaux et promotion de l'innovation.",
            acteurs: ["Commission européenne", "Parlement européen", "États membres", "Lobbyistes industriels", "Organisations de défense des droits numériques"]
        },
        {
            title: "Le projet GAIA-X",
            description: "Initiative franco-allemande visant à créer une infrastructure cloud européenne souveraine, GAIA-X incarne les ambitions d'autonomie numérique de l'Europe mais aussi les difficultés à concurrencer les géants américains du cloud.",
            acteurs: ["Ministères français et allemand de l'Économie", "Entreprises européennes du numérique", "Utilisateurs industriels", "Big Tech américaines"]
        },
        {
            title: "La controverse des modèles ouverts vs fermés",
            description: "Le débat sur l'ouverture des modèles d'IA (open source vs propriétaires) cristallise les tensions entre sécurité, contrôle et innovation ouverte. L'Europe cherche sa voie entre ces approches antagonistes.",
            acteurs: ["Développeurs open source", "Grandes entreprises d'IA", "Régulateurs", "Communauté académique"]
        }
    ],
    team: [
        { name: "Hamidou Diallo" },
        { name: "Megane" },
        { name: "Nelson Adebayo" }
    ]
};

// Composant principal
export default function ControverseIASite() {
    const [activeTab, setActiveTab] = useState('accueil');
    const [selectedActeur, setSelectedActeur] = useState(null);
    const [selectedInteraction, setSelectedInteraction] = useState(null);

    // Gestion du survol et de la sélection des acteurs
    const handleActeurHover = (acteurId) => {
        if (!selectedActeur) {
            setSelectedActeur(acteurId);
        }
    };

    const handleActeurClick = (acteurId) => {
        setSelectedActeur(acteurId === selectedActeur ? null : acteurId);
        setSelectedInteraction(null);
    };

    // Trouver un acteur par son ID
    const getActeurById = (id) => {
        return acteursData.find(acteur => acteur.id === id);
    };

    // Trouver une interaction impliquant deux acteurs
    const getInteractionByActeurs = (acteur1Id, acteur2Id) => {
        return interactionsData.find(interaction =>
            (interaction.acteur1 === acteur1Id && interaction.acteur2 === acteur2Id) ||
            (interaction.acteur1 === acteur2Id && interaction.acteur2 === acteur1Id)
        );
    };

    // Mise à jour quand une arête est cliquée (interaction entre acteurs)
    const handleEdgeClick = (acteur1Id, acteur2Id) => {
        setSelectedInteraction({ acteur1: acteur1Id, acteur2: acteur2Id });
        setSelectedActeur(null);
    };

    return (
        <div className="site-container">
            {/* En-tête */}
            <header className="site-header">
                <div className="container header-content">
                    <h1 className="site-title">Souveraineté IA Europe</h1>
                    <div className="header-nav">
                        <button className="header-button" onClick={() => setActiveTab('about')}>À propos</button>
                        <button className="header-button">Contact</button>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="main-content container">
                {/* Navigation par onglets */}
                <div className="tabs-container">
                    <button
                        className={`tab-button ${activeTab === 'accueil' ? 'active' : ''}`}
                        onClick={() => setActiveTab('accueil')}
                    >
                        Accueil
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'acteurs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('acteurs')}
                    >
                        Acteurs
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'chronologie' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chronologie')}
                    >
                        Chronologie
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'interactions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('interactions')}
                    >
                        Interactions
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'analyse' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analyse')}
                    >
                        Analyse
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        À propos
                    </button>
                </div>

                {/* Page d'accueil */}
                {activeTab === 'accueil' && (
                    <div className="content-card">
                        <h2 className="card-title">La souveraineté de l'IA en Europe</h2>
                        <div className="flex flex-col md-flex-row gap-6">
                            <div className="md-w-2-3">
                                <p className="home-text">
                                    Bienvenue sur notre plateforme d'analyse de la controverse entourant la souveraineté de l'intelligence
                                    artificielle en Europe, avec un focus particulier sur la France. Ce site vous permet d'explorer les
                                    différentes dimensions de ce débat crucial pour l'avenir technologique et économique européen.
                                </p>
                                <p className="home-text">
                                    Face à la domination américaine et chinoise dans le domaine de l'IA, l'Europe cherche à définir sa
                                    propre voie, en équilibrant innovation, protection des valeurs fondamentales et indépendance stratégique.
                                    Cette controverse met en lumière des tensions entre différentes visions de la régulation technologique.
                                </p>
                                <p className="home-text">
                                    Notre méthode d'analyse s'appuie sur une cartographie des acteurs impliqués, une chronologie des événements clés,
                                    une analyse des interactions entre les parties prenantes et une étude approfondie des arguments avancés par chacun.
                                </p>
                                <div className="feature-grid">
                                    <div className="feature-card">
                                        <h3 className="feature-title">
                                            <Users className="feature-icon" size={20} /> Acteurs clés
                                        </h3>
                                        <p className="feature-description">Explorez les positions des différentes parties prenantes dans le débat sur la souveraineté de l'IA</p>
                                    </div>
                                    <div className="feature-card">
                                        <h3 className="feature-title">
                                            <Calendar className="feature-icon" size={20} /> Chronologie
                                        </h3>
                                        <p className="feature-description">Suivez l'évolution de la controverse à travers les événements marquants</p>
                                    </div>
                                    <div className="feature-card">
                                        <h3 className="feature-title">
                                            <Network className="feature-icon" size={20} /> Interactions
                                        </h3>
                                        <p className="feature-description">Visualisez les points de convergence et de divergence entre les acteurs</p>
                                    </div>
                                    <div className="feature-card">
                                        <h3 className="feature-title">
                                            <Eye className="feature-icon" size={20} /> Analyse
                                        </h3>
                                        <p className="feature-description">Décryptez les enjeux complexes de cette controverse technologique et politique</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md-w-1-3 sidebar-card">
                                <h3 className="sidebar-title">L'AI Act européen</h3>
                                <p className="mb-4">Le premier cadre juridique complet au monde sur l'IA</p>
                                <ul className="sidebar-list">
                                    <li className="sidebar-list-item">
                                        <ArrowUp className="sidebar-icon" size={16} />
                                        Approche basée sur les risques
                                    </li>
                                    <li className="sidebar-list-item">
                                        <ArrowDown className="sidebar-icon" size={16} />
                                        Interdiction des systèmes à haut risque
                                    </li>
                                    <li className="sidebar-list-item">
                                        <Shield className="sidebar-icon" size={16} />
                                        Protection des droits fondamentaux
                                    </li>
                                    <li className="sidebar-list-item">
                                        <TrendingUp className="sidebar-icon" size={16} />
                                        Soutien à l'innovation responsable
                                    </li>
                                </ul>
                                <button className="sidebar-button" onClick={() => setActiveTab('chronologie')}>
                                    En savoir plus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Page des acteurs */}
                {activeTab === 'acteurs' && (
                    <div className="content-card">
                        <h2 className="card-title">Les acteurs de la controverse</h2>
                        <p className="home-text">
                            La controverse sur la souveraineté de l'IA en Europe implique de nombreux acteurs aux intérêts,
                            positions et influences variés. Découvrez ci-dessous les principales parties prenantes et leurs arguments.
                        </p>

                        <div className="acteurs-grid">
                            {acteursData.map(acteur => (
                                <div
                                    key={acteur.id}
                                    className={`acteur-card ${selectedActeur === acteur.id ? 'acteur-selected' : ''}`}
                                    style={{borderColor: acteur.couleur}}
                                    onClick={() => handleActeurClick(acteur.id)}
                                    onMouseEnter={() => handleActeurHover(acteur.id)}
                                    onMouseLeave={() => !selectedActeur && setSelectedActeur(null)}
                                >
                                    <div className="acteur-header" style={{backgroundColor: acteur.couleur}}>
                                        <h3 className="acteur-title">{acteur.nom}</h3>
                                        <div className="acteur-influence">
                                            Influence: <strong>{acteur.influence}%</strong>
                                        </div>
                                    </div>
                                    <div className="acteur-content">
                                        <p className="acteur-position">{acteur.position}</p>
                                        <div className="acteur-detail">
                                            <h4>Arguments principaux:</h4>
                                            <ul className="acteur-arguments">
                                                {acteur.arguments.map((arg, index) => (
                                                    <li key={index}>
                                                        <ChevronRight size={16} className="argument-icon" />
                                                        {arg}
                                                    </li>
                                                ))}
                                            </ul>

                                            <h4>Citations représentatives:</h4>
                                            <div className="acteur-citations">
                                                {acteur.citations.map((citation, index) => (
                                                    <div key={index} className="acteur-citation">
                                                        <div className="citation-text">
                                                            <Quote size={16} className="quote-icon" />
                                                            {citation.texte}
                                                        </div>
                                                        <div className="citation-source">
                                                            — {citation.auteur}, <span className="citation-context">{citation.source}</span>
                                                            <a href={citation.url} className="citation-link" target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <h4>Sous-acteurs:</h4>
                                            <div className="sous-acteurs-list">
                                                {acteur.sous_acteurs.map((sousActeur, index) => (
                                                    <div key={index} className="sous-acteur-item">
                                                        <span className="sous-acteur-nom">{sousActeur.nom}</span>
                                                        <span className="sous-acteur-role">{sousActeur.role}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="acteurs-visualization">
                            <h3>Influence relative des acteurs</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={acteursData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="nom" />
                                    <YAxis label={{ value: 'Niveau d\'influence (%)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Bar dataKey="influence" name="Influence">
                                        {acteursData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.couleur} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Page de chronologie */}
                {activeTab === 'chronologie' && (
                    <div className="content-card">
                        <h2 className="card-title">Chronologie de la controverse</h2>
                        <p className="home-text">
                            Suivez l'évolution du débat sur la souveraineté de l'IA en Europe à travers les événements majeurs
                            qui ont façonné cette controverse, de la proposition initiale de l'AI Act aux développements récents.
                        </p>

                        <div className="timeline-container">
                            <div className="timeline-events">
                                {timelineData.map((event, index) => (
                                    <div key={index} className="timeline-event">
                                        <div className="timeline-date">{event.date}</div>
                                        <div className="timeline-content">
                                            <h3 className="timeline-title">{event.evenement}</h3>
                                            <div className="timeline-impact">
                                                Impact: <span className="timeline-impact-value">{event.impact}/100</span>
                                            </div>
                                            <div className="timeline-description">
                                                <p>{event.description}</p>
                                                <div className="timeline-source">
                                                    <a href={event.source} target="_blank" rel="noopener noreferrer" className="timeline-source-link">
                                                        Source <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Page des interactions - Remplacée par le réseau interactif D3 */}
                {activeTab === 'interactions' && (
                    <div className="content-card">
                        <h2 className="card-title">Interactions entre les acteurs</h2>
                        <p className="home-text">
                            Cette visualisation représente les dynamiques d'interactions entre les différents acteurs de la controverse.
                            Les liens entre les nœuds montrent l'intensité des relations et les points de tension ou de coopération.
                            Cliquez sur un acteur ou un lien pour explorer ces interactions en détail.
                        </p>

                        <div className="network-visualization">
                            <NetworkGraph
                                acteursData={acteursData}
                                onNodeClick={handleActeurClick}
                                selectedActeur={selectedActeur}
                            />

                            <div className="interaction-details-panel">
                                {selectedActeur && (
                                    <div className="acteur-details">
                                        <h3 style={{ color: getActeurById(selectedActeur).couleur }}>{getActeurById(selectedActeur).nom}</h3>
                                        <p className="interaction-description">{getActeurById(selectedActeur).description}</p>
                                        <h4>Interactions principales:</h4>
                                        <ul className="interaction-list">
                                            {interactionsData
                                                .filter(interaction => interaction.acteur1 === selectedActeur || interaction.acteur2 === selectedActeur)
                                                .map((interaction, index) => {
                                                    const otherActeurId = interaction.acteur1 === selectedActeur ? interaction.acteur2 : interaction.acteur1;
                                                    const otherActeur = getActeurById(otherActeurId);
                                                    return (
                                                        <li key={index} className="interaction-item" onClick={() => setSelectedInteraction(interaction)}>
                                                            <span className="interaction-with" style={{ color: otherActeur.couleur }}>
                                                                Avec {otherActeur.nom}
                                                            </span>
                                                            <p className="interaction-brief">{interaction.description.split('.')[0]}.</p>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    </div>
                                )}

                                {selectedInteraction && (
                                    <div className="interaction-full-details">
                                        <h3>Interaction entre acteurs</h3>
                                        <div className="interaction-actors">
                                            <div className="interaction-actor" style={{ borderColor: getActeurById(selectedInteraction.acteur1).couleur }}>
                                                {getActeurById(selectedInteraction.acteur1).nom}
                                            </div>
                                            <div className="interaction-connector">⟷</div>
                                            <div className="interaction-actor" style={{ borderColor: getActeurById(selectedInteraction.acteur2).couleur }}>
                                                {getActeurById(selectedInteraction.acteur2).nom}
                                            </div>
                                        </div>

                                        <div className="interaction-content">
                                            <p className="interaction-description">
                                                {getInteractionByActeurs(selectedInteraction.acteur1, selectedInteraction.acteur2).description}
                                            </p>

                                            <h4>Exemples concrets:</h4>
                                            <ul className="interaction-examples">
                                                {getInteractionByActeurs(selectedInteraction.acteur1, selectedInteraction.acteur2).exemples.map((exemple, index) => (
                                                    <li key={index}>{exemple}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <button className="interaction-back" onClick={() => setSelectedInteraction(null)}>
                                            Retour aux acteurs
                                        </button>
                                    </div>
                                )}

                                {!selectedActeur && !selectedInteraction && (
                                    <div className="interaction-help">
                                        <p>Cliquez sur un acteur dans le graphe pour explorer ses interactions avec les autres parties prenantes.</p>
                                        <p>La taille des liens entre les acteurs représente l'intensité de leurs interactions.</p>
                                        <p>Vous pouvez déplacer les nœuds pour réorganiser le graphe ou zoomer pour mieux visualiser.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Page d'analyse */}
                {activeTab === 'analyse' && (
                    <div className="content-card">
                        <h2 className="card-title">Analyse de la controverse</h2>
                        <p className="home-text">
                            Notre analyse de la controverse sur la souveraineté de l'IA en Europe met en lumière plusieurs
                            dimensions clés et tensions fondamentales qui traversent ce débat complexe.
                        </p>

                        <div className="themes-container">
                            {themesAnalyse.map((theme, index) => (
                                <div key={index} className="theme-card">
                                    <h3 className="theme-title">{theme.titre}</h3>
                                    <p className="theme-description">{theme.description}</p>
                                    <h4>Aspects clés:</h4>
                                    <ul className="theme-aspects">
                                        {theme.aspects.map((aspect, idx) => (
                                            <li key={idx}>{aspect}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="analyse-conclusion">
                            <h3>Conclusion provisoire</h3>
                            <p>
                                La controverse sur la souveraineté de l'IA en Europe révèle les défis posés par le développement
                                d'une approche spécifiquement européenne de l'intelligence artificielle. Entre ambition d'autonomie
                                stratégique et réalisme face à la domination des géants américains et chinois, l'Europe tente de définir
                                une "troisième voie" qui préserverait ses valeurs tout en assurant sa compétitivité.
                            </p>
                            <p>
                                L'AI Act européen représente une première mondiale en matière de régulation, mais son efficacité dépendra
                                de sa mise en œuvre concrète et de sa capacité à s'adapter à l'évolution rapide des technologies.
                                La tension entre régulation et innovation reste au cœur des débats, tout comme la question de la
                                souveraineté technologique dans un monde numérique globalisé.
                            </p>
                            <p>
                                Cette controverse, loin d'être résolue, continuera d'évoluer au gré des avancées technologiques,
                                des décisions politiques et des mouvements stratégiques des différents acteurs impliqués.
                            </p>
                        </div>

                        <div className="references-section">
                            <h3>Sources et références</h3>
                            <ul className="references-list">
                                <li>Commission européenne, "Proposition d'AI Act", Avril 2021</li>
                                <li>Parlement européen, "Débats sur la souveraineté numérique", 2022-2023</li>
                                <li>Conseil de l'UE, "Accord politique sur l'AI Act", Décembre 2023</li>
                                <li>Rapports du think-tank Digital New Deal, 2022-2024</li>
                                <li>Auditions parlementaires des acteurs de l'IA, 2023</li>
                                <li>Études du CNRS et d'INRIA sur les capacités françaises en IA, 2023</li>
                                <li>Prises de position des associations professionnelles du numérique, 2021-2024</li>
                                <li>Analyses de l'Observatoire de l'IA du CNNUM, 2022-2024</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Page À propos */}
                {activeTab === 'about' && (
                    <div className="content-card">
                        <h2 className="card-title">À propos du projet</h2>

                        <div className="about-section">
                            <h3 className="about-subtitle">Présentation</h3>
                            <p className="about-text">{aboutData.description}</p>

                            <h3 className="about-subtitle">Méthodologie</h3>
                            <ul className="about-list">
                                {aboutData.methodology.map((method, index) => (
                                    <li key={index} className="about-list-item">{method}</li>
                                ))}
                            </ul>

                            <h3 className="about-subtitle">Cas d'étude spécifiques</h3>
                            <div className="about-cases">
                                {aboutData.casesExamples.map((caseExample, index) => (
                                    <div key={index} className="about-case-card">
                                        <h4 className="about-case-title">{caseExample.title}</h4>
                                        <p className="about-case-description">{caseExample.description}</p>
                                        <div className="about-case-acteurs">
                                            <h5>Acteurs impliqués:</h5>
                                            <div className="about-case-acteurs-list">
                                                {caseExample.acteurs.map((acteur, idx) => (
                                                    <span key={idx} className="about-case-acteur">{acteur}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className="about-subtitle">L'équipe</h3>
                            <div className="about-team">
                                {aboutData.team.map((member, index) => (
                                    <div key={index} className="about-team-member">
                                        <div className="about-team-name">{member.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Pied de page */}
            <footer className="site-footer">
                <div className="container">
                    <div className="footer-grid">
                        <div>
                            <h3 className="footer-heading">À propos</h3>
                            <p className="footer-text">
                                Ce site analyse la controverse sur la souveraineté de l'IA en Europe,
                                ses enjeux et les positions des différents acteurs impliqués.
                            </p>
                        </div>
                        <div>
                            <h3 className="footer-heading">Méthodologie</h3>
                            <p className="footer-text">
                                Notre analyse s'appuie sur une cartographie des acteurs,
                                une chronologie des événements et une étude des arguments
                                avancés par chaque partie prenante.
                            </p>
                        </div>
                        <div>
                            <h3 className="footer-heading">Contact</h3>
                            <p className="footer-text">
                                Ce projet a été réalisé dans le cadre d'un cours d'Analyse de
                                Controverse à l'ENSIMAG, 2ème année d'ingénierie financière.
                            </p>
                        </div>
                    </div>
                    <div className="footer-separator">
                        © 2025 Analyse de la Souveraineté IA en Europe
                    </div>
                </div>
            </footer>
        </div>
    );
}