import React from 'react';
import { Link } from 'react-router-dom'; // Para o botão funcionar
import './Sobre.css';

// Ícones (Certifique-se de instalar: npm install react-icons)
import { FaFish, FaHandshake, FaBookOpen, FaMapMarkedAlt } from 'react-icons/fa';

function Sobre() {
    
    const cidades = [
        "Arraial do Cabo", "Armação dos Búzios", "Cabo Frio", 
        "Campos dos Goytacazes", "Carapebus", "Macaé", 
        "Quissamã", "Rio das Ostras", 
        "São Francisco de Itabapoana", "São João da Barra"
    ];

    return (
        <div className="sobre-page">
            
            {/* 1. HERO SECTION */}
            <div className="sobre-hero">
                <h1>Sobre o Pescarte 🐟</h1>
                <p>
                    Uma rede social regional integrada por pescadores artesanais e seus familiares.
                    Tecnologia, educação e geração de renda.
                </p>
            </div>

            {/* 2. CARDS INFORMATIVOS (GRID) */}
            <div className="sobre-grid">
                
                {/* Card 1: O Objetivo */}
                <div className="info-card">
                    <span className="card-icon"><FaFish /></span>
                    <h3>Rede Integrada</h3>
                    <p>
                        O Projeto PESCARTE busca fortalecer a organização comunitária e a qualificação profissional
                        de pescadores artesanais e seus familiares através de uma plataforma integrada.
                    </p>
                </div>

                {/* Card 2: Educação */}
                <div className="info-card">
                    <span className="card-icon"><FaBookOpen /></span>
                    <h3>Educação Ambiental</h3>
                    <p>
                        Realizamos oficinas sobre economia solidária, cooperativismo, políticas públicas
                        e letramento digital, promovendo a construção participativa de conhecimento.
                    </p>
                </div>

                {/* Card 3: Trabalho e Renda */}
                <div className="info-card">
                    <span className="card-icon"><FaHandshake /></span>
                    <h3>Trabalho e Renda</h3>
                    <p>
                        Incentivamos a criação de projetos de geração de trabalho e renda, além de articular
                        reuniões de Grupos de Trabalho e gestão participativa.
                    </p>
                </div>
            </div>

            {/* 3. ABRANGÊNCIA GEOGRÁFICA */}
            <div className="abrangencia-section">
                <span className="card-icon" style={{display: 'inline-block'}}><FaMapMarkedAlt /></span>
                <h2>Onde Atuamos</h2>
                <p style={{marginBottom: '20px'}}>
                    Desde 2014, o PEA Pescarte atua diretamente em 10 municípios da Bacia de Campos:
                </p>
                
                <div className="cidades-grid">
                    {cidades.map((cidade, index) => (
                        <span key={index} className="tag-cidade">
                            📍 {cidade}
                        </span>
                    ))}
                </div>
            </div>

            {/* 4. CALL TO ACTION (CTA) */}
            <div className="sobre-cta">
                <h2>Faça parte dessa transformação!</h2>
                <p>Junte-se a nós e fortaleça a pesca artesanal na sua região.</p>
                <Link to="/cadastro">
                    <button className="btn-participar">Criar Conta Grátis</button>
                </Link>
            </div>

        </div>
    );
}

export default Sobre;