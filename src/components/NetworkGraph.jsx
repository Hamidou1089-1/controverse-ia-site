import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NetworkGraph = ({ acteursData, onNodeClick, selectedActeur }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!acteursData || !svgRef.current) return;

        // Nettoyer le SVG existant
        d3.select(svgRef.current).selectAll("*").remove();

        // Dimensions et configuration
        const width = 800;
        const height = 600;
        const nodeRadius = 40;

        // Créer le SVG avec le conteneur principal
        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        // Créer les données pour les liens (arêtes)
        const links = [
            { source: 'etat', target: 'entreprises', value: 85 },
            { source: 'etat', target: 'citoyens', value: 65 },
            { source: 'etat', target: 'academiques', value: 75 },
            { source: 'entreprises', target: 'citoyens', value: 60 },
            { source: 'entreprises', target: 'academiques', value: 70 },
            { source: 'citoyens', target: 'academiques', value: 65 }
        ];

        // Configuration de la simulation de force
        const simulation = d3.forceSimulation(acteursData)
            .force("link", d3.forceLink(links).id(d => d.id).distance(200))
            .force("charge", d3.forceManyBody().strength(-1000))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(nodeRadius * 1.5));

        // Groupe pour contenir les éléments graphiques
        const g = svg.append("g");

        // Création des liens avec épaisseur variable selon la valeur
        const link = g.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke-width", d => Math.sqrt(d.value) / 2)
            .attr("stroke", "#d1d5db")
            .attr("stroke-opacity", 0.6);

        // Création des nœuds
        const node = g.append("g")
            .attr("class", "nodes")
            .selectAll(".node")
            .data(acteursData)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            .on("click", (event, d) => onNodeClick(d.id));

        // Cercles pour les nœuds
        node.append("circle")
            .attr("r", nodeRadius)
            .attr("fill", d => d.couleur)
            .attr("stroke", d => d.id === selectedActeur ? "#fff" : d.couleur)
            .attr("stroke-width", d => d.id === selectedActeur ? 4 : 2)
            .attr("class", d => d.id === selectedActeur ? "selected" : "")
            .append("title")
            .text(d => d.nom);

        // Icônes/texte pour les nœuds (utilisation des initiales)
        node.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .attr("font-size", "16px")
            .text(d => d.nom.split(' ').map(n => n[0]).join(''));

        // Ajout des labels
        node.append("text")
            .attr("dy", nodeRadius * 1.6)
            .attr("text-anchor", "middle")
            .attr("fill", "#374151")
            .attr("font-weight", "bold")
            .attr("font-size", "14px")
            .text(d => d.nom);

        // Mise à jour de la position des éléments à chaque tick de la simulation
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("transform", d => `translate(${d.x},${d.y})`);

            // Maintenir les nœuds dans les limites du SVG
            acteursData.forEach(d => {
                d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x));
                d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y));
            });
        });

        // Fonctions pour le glisser-déposer des nœuds
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Fonction pour le zoom/pan
        const zoom = d3.zoom()
            .scaleExtent([0.5, 2])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        // Activation du zoom
        svg.call(zoom);

        // Nettoyage à la destruction du composant
        return () => {
            simulation.stop();
        };
    }, [acteursData, selectedActeur, onNodeClick]);

    return (
        <div className="network-container">
            <svg ref={svgRef} className="network-graph"></svg>
            <div className="network-instructions">
                <p>Cliquez sur un acteur pour voir ses détails. Vous pouvez déplacer les nœuds pour réorganiser le réseau.</p>
                <p>La taille des connexions représente l'intensité des interactions entre les acteurs.</p>
            </div>
        </div>
    );
};

export default NetworkGraph;