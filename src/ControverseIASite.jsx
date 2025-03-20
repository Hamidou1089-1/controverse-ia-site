import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Network, ArrowUp, ArrowDown, Calendar, Users, Map, FileText, Filter, ChevronRight, Eye, TrendingUp, Globe, Shield, Briefcase, Users as UsersGroup, Scale } from 'lucide-react';

// Données d'exemple pour la chronologie
const timelineData = [
    { date: 'Avril 2021', evenement: 'Proposition initiale de l\'AI Act par la Commission européenne', impact: 75 },
    { date: 'Juin 2022', evenement: 'Débats au Parlement européen sur la souveraineté numérique', impact: 60 },
    { date: 'Novembre 2022', evenement: 'Lancement de ChatGPT et intensification du débat public', impact: 90 },
    { date: 'Février 2023', evenement: 'Prise de position des États membres sur la régulation de l\'IA', impact: 70 },
    { date: 'Décembre 2023', evenement: 'Accord sur l\'AI Act', impact: 95 },
    { date: 'Juin 2024', evenement: 'Début de la mise en application de certaines dispositions', impact: 85 },
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
        ]
    }
];

// Données pour les intersections entre acteurs (pour le diagramme de Venn)
const intersectionsData = [
    {
        id: 'etat-entreprises',
        acteurs: ['etat', 'entreprises'],
        points_communs: [
            'Développement d\'une IA compétitive à l\'échelle mondiale',
            'Protection des données stratégiques françaises',
            'Création d\'emplois qualifiés dans le secteur'
        ]
    },
    {
        id: 'etat-citoyens',
        acteurs: ['etat', 'citoyens'],
        points_communs: [
            'Protection des citoyens contre les abus potentiels',
            'Réduction des biais algorithmiques',
            'Transparence des systèmes décisionnels'
        ]
    },
    {
        id: 'entreprises-citoyens',
        acteurs: ['entreprises', 'citoyens'],
        points_communs: [
            'Applications bénéfiques de l\'IA au quotidien',
            'Amélioration des services publics et privés'
        ]
    },
    {
        id: 'etat-academiques',
        acteurs: ['etat', 'academiques'],
        points_communs: [
            'Financement de la recherche fondamentale',
            'Formation de spécialistes en IA',
            'Transfert de technologie vers l\'industrie'
        ]
    },
    {
        id: 'entreprises-academiques',
        acteurs: ['entreprises', 'academiques'],
        points_communs: [
            'Partenariats recherche-industrie',
            'Valorisation des innovations',
            'Stages et recrutement de talents'
        ]
    },
    {
        id: 'citoyens-academiques',
        acteurs: ['citoyens', 'academiques'],
        points_communs: [
            'Diffusion des connaissances sur l\'IA',
            'Réflexion éthique sur les applications',
            'Débat public informé sur les enjeux'
        ]
    },
    {
        id: 'tous',
        acteurs: ['etat', 'entreprises', 'citoyens', 'academiques'],
        points_communs: [
            'Développement d\'une IA européenne respectueuse des valeurs fondamentales',
            'Équilibre entre innovation et protection',
            'Cadre juridique adapté aux réalités technologiques'
        ]
    }
];

// Données pour l'analyse thématique
const themesAnalyse = [
    {
        titre: 'Tension entre compétitivité et éthique',
        description: 'Comment l\'Europe peut-elle développer une IA compétitive tout en maintenant ses exigences éthiques ?',
        aspects: [
            'Vitesse d\'innovation vs rigueur réglementaire',
            'Attraction des talents vs conditions de travail européennes',
            'Exploitation des données vs protection de la vie privée'
        ]
    },
    {
        titre: 'Autonomie stratégique',
        description: 'L\'indépendance technologique est-elle possible face aux géants américains et chinois ?',
        aspects: [
            'Développement d\'infrastructures européennes (cloud, calculateurs)',
            'Autonomie dans les secteurs critiques (défense, santé, énergie)',
            'Contrôle des chaînes d\'approvisionnement technologiques'
        ]
    },
    {
        titre: 'Modèle européen de l\'IA',
        description: 'Existe-t-il une "troisième voie" européenne entre les modèles américain et chinois ?',
        aspects: [
            'IA centrée sur l\'humain vs maximisation du profit',
            'Approche précautionneuse vs innovation disruptive',
            'Valeurs démocratiques intégrées dans la conception des systèmes'
        ]
    }
];

// Composant principal
export default function ControverseIASite() {
    const [activeTab, setActiveTab] = useState('accueil');
    const [selectedActeur, setSelectedActeur] = useState(null);
    const [selectedIntersection, setSelectedIntersection] = useState(null);

    // Gestion du survol et de la sélection des acteurs
    const handleActeurHover = (acteurId) => {
        if (!selectedActeur) {
            setSelectedActeur(acteurId);
        }
    };

    const handleActeurClick = (acteurId) => {
        setSelectedActeur(acteurId === selectedActeur ? null : acteurId);
    };

    // Gestion du survol et de la sélection des intersections
    const handleIntersectionHover = (intersectionId) => {
        if (!selectedIntersection) {
            setSelectedIntersection(intersectionId);
        }
    };

    const handleIntersectionClick = (intersectionId) => {
        setSelectedIntersection(intersectionId === selectedIntersection ? null : intersectionId);
    };

    // Trouver un acteur par son ID
    const getActeurById = (id) => {
        return acteursData.find(acteur => acteur.id === id);
    };

    // Trouver une intersection par son ID
    const getIntersectionById = (id) => {
        return intersectionsData.find(intersection => intersection.id === id);
    };

    return (
        <div className="site-container">
            {/* En-tête */}
            <header className="site-header">
                <div className="container header-content">
                    <h1 className="site-title">Souveraineté IA Europe</h1>
                    <div className="header-nav">
                        <button className="header-button">À propos</button>
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
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart
                                    data={timelineData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis label={{ value: 'Impact sur la controverse', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="impact" stroke="#10b981" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>

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
                                                {index === 0 && (
                                                    <p>La Commission européenne présente sa proposition d'AI Act, première tentative mondiale de réguler l'intelligence artificielle de manière globale, basée sur une approche par niveaux de risque.</p>
                                                )}
                                                {index === 1 && (
                                                    <p>Les eurodéputés débattent de l'importance d'une autonomie stratégique dans les technologies numériques face aux géants américains et chinois. Émergence du concept de "souveraineté numérique européenne".</p>
                                                )}
                                                {index === 2 && (
                                                    <p>Le lancement de ChatGPT bouleverse le débat public en démontrant les capacités avancées de l'IA générative, accélérant l'urgence d'une régulation adaptée et soulevant des questions sur le retard européen.</p>
                                                )}
                                                {index === 3 && (
                                                    <p>Les États membres de l'UE expriment leurs positions sur la régulation de l'IA, certains favorisant l'innovation, d'autres insistant davantage sur la protection et les garde-fous éthiques.</p>
                                                )}
                                                {index === 4 && (
                                                    <p>Accord historique sur l'AI Act européen, introduisant un cadre réglementaire inédit qui catégorise les systèmes d'IA selon leur niveau de risque et impose des obligations proportionnées.</p>
                                                )}
                                                {index === 5 && (
                                                    <p>Début de la mise en œuvre progressive des premières dispositions de l'AI Act, avec des périodes de transition pour permettre aux entreprises et institutions de s'adapter.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Page des interactions */}
                {activeTab === 'interactions' && (
                    <div className="content-card">
                        <h2 className="card-title">Interactions entre les acteurs</h2>
                        <p className="home-text">
                            Cette visualisation représente les points communs et divergences entre les différents acteurs de la controverse.
                            Les zones d'intersection montrent les convergences d'intérêts ou d'opinion. Survolez ou cliquez sur une zone pour voir les détails.
                        </p>

                        <div className="venn-container">
                            <div className="venn-diagram">
                                {/* Cercles représentant chaque acteur */}
                                {acteursData.map((acteur, index) => {
                                    // Positionnement des cercles selon leur ordre (à ajuster selon les besoins visuels)
                                    const positions = [
                                        { top: '30%', left: '25%' }, // État
                                        { top: '30%', left: '65%' }, // Entreprises
                                        { top: '60%', left: '25%' }, // Citoyens
                                        { top: '60%', left: '65%' }  // Académiques
                                    ];

                                    return (
                                        <div
                                            key={acteur.id}
                                            className={`venn-circle ${selectedActeur === acteur.id ? 'venn-selected' : ''}`}
                                            style={{
                                                backgroundColor: `${acteur.couleur}40`, // Couleur avec transparence
                                                borderColor: acteur.couleur,
                                                top: positions[index].top,
                                                left: positions[index].left,
                                                width: `${acteur.influence * 2}px`,
                                                height: `${acteur.influence * 2}px`,
                                                zIndex: selectedActeur === acteur.id ? 10 : 1
                                            }}
                                            onClick={() => handleActeurClick(acteur.id)}
                                            onMouseEnter={() => handleActeurHover(acteur.id)}
                                            onMouseLeave={() => !selectedActeur && setSelectedActeur(null)}
                                        >
                                            <span className="venn-label">{acteur.nom}</span>
                                        </div>
                                    );
                                })}

                                {/* Zones d'intersection (simplifiées) */}
                                {intersectionsData.map((intersection, index) => {
                                    // Positionnement des intersections (simplifié ici)
                                    const getPosition = (id) => {
                                        switch(id) {
                                            case 'etat-entreprises': return { top: '30%', left: '45%' };
                                            case 'etat-citoyens': return { top: '45%', left: '25%' };
                                            case 'entreprises-citoyens': return { top: '45%', left: '45%' };
                                            case 'etat-academiques': return { top: '45%', left: '35%' };
                                            case 'entreprises-academiques': return { top: '45%', left: '65%' };
                                            case 'citoyens-academiques': return { top: '60%', left: '45%' };
                                            case 'tous': return { top: '45%', left: '45%' };
                                            default: return { top: '50%', left: '50%' };
                                        }
                                    };

                                    const position = getPosition(intersection.id);

                                    // Ne pas afficher "tous" comme une zone distincte car c'est trop complexe visuellement
                                    if (intersection.id === 'tous') return null;

                                    return (
                                        <div
                                            key={intersection.id}
                                            className={`venn-intersection ${selectedIntersection === intersection.id ? 'intersection-selected' : ''}`}
                                            style={{
                                                top: position.top,
                                                left: position.left,
                                                zIndex: selectedIntersection === intersection.id ? 20 : 5
                                            }}
                                            onClick={() => handleIntersectionClick(intersection.id)}
                                            onMouseEnter={() => handleIntersectionHover(intersection.id)}
                                            onMouseLeave={() => !selectedIntersection && setSelectedIntersection(null)}
                                        >
                                            <div className="intersection-point"></div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="interaction-details">
                                {selectedActeur && !selectedIntersection && (
                                    <div className="acteur-details">
                                        <h3 style={{ color: getActeurById(selectedActeur).couleur }}>{getActeurById(selectedActeur).nom}</h3>
                                        <p>{getActeurById(selectedActeur).description}</p>
                                        <h4>Arguments clés:</h4>
                                        <ul>
                                            {getActeurById(selectedActeur).arguments.map((arg, index) => (
                                                <li key={index}>{arg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedIntersection && (
                                    <div className="intersection-details">
                                        <h3>Points communs entre {getIntersectionById(selectedIntersection).acteurs.map(id => getActeurById(id).nom).join(' et ')}</h3>
                                        <ul>
                                            {getIntersectionById(selectedIntersection).points_communs.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {!selectedActeur && !selectedIntersection && (
                                    <div className="interaction-help">
                                        <p>Survolez ou cliquez sur un acteur ou une intersection pour afficher plus d'informations.</p>
                                        <p>Les cercles représentent les acteurs principaux, leur taille indique leur niveau d'influence dans le débat.</p>
                                        <p>Les points d'intersection montrent les zones de convergence entre différents acteurs.</p>
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