import React from 'react';
import axios from 'axios';      // Importa o axios (para conectar front e o back)
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home() {
    const navigate = useNavigate();

    // Dados das funcionalidades para gerar os cards dinamicamente
    const funcionalidades = [
        {
            titulo: "Área do Pescador",
            icon: "👤",
            desc: "Acesse suas informações pessoais, histórico e configurações da conta.",
            rota: "/login"
        },
        {
            titulo: "Serviços Úteis",
            icon: "🗺️",
            desc: "Encontre fábricas de gelo, mecânicos, lojas de pesca e sedes próximas a você.",
            rota: "/servicos"
        },
        {
            titulo: "Previsão do Tempo",
            icon: "🌤️",
            desc: "Consulte a previsão climática e marés para planejar sua saída com segurança.",
            rota: "/clima"
        },
        {
            titulo: "Controle Financeiro",
            icon: "💰",
            desc: "Simule vendas, consulte preços de mercado e gerencie seus lucros.",
            rota: "/financeiro"
        }
    ];

    return (
        <div className="home-container">
            
            {/* --- SEÇÃO HERO (Destaque Principal) --- */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Bem-vindo ao Pescarte Search 🐟</h1>
                    <p className="hero-subtitle">
                        Tecnologia e inovação para fortalecer a pesca artesanal.
                        Tudo o que você precisa reunido em um só lugar.
                    </p>
                    <div className="hero-buttons">
                        <button onClick={() => navigate('/cadastro')} className="btn-primary">Criar Conta Grátis</button>
                        <button onClick={() => navigate('/sobre')} className="btn-outline">Saiba Mais</button>
                    </div>
                </div>
            </header>

            {/* --- SEÇÃO DE FUNCIONALIDADES (Cards) --- */}
            <section className="features-section">
                <h2>O que oferecemos?</h2>
                <div className="features-grid">
                    {funcionalidades.map((item, index) => (
                        <div key={index} className="feature-card" onClick={() => navigate(item.rota)}>
                            <div className="card-icon">{item.icon}</div>
                            <h3>{item.titulo}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SEÇÃO INFORMATIVA --- */}
            <section className="info-section">
                <div className="info-box">
                    <h2>Por que usar o Pescarte Search?</h2>
                    <p>
                        O Pescarte nasceu da necessidade de conectar pescadores artesanais a recursos vitais 
                        para o seu trabalho. Nosso objetivo é valorizar a profissão, aumentar a rentabilidade 
                        através da informação de preços justa e garantir mais segurança com dados climáticos precisos.
                    </p>
                    <ul className="benefits-list">
                        <li>✅ Acesso rápido a fornecedores locais.</li>
                        <li>✅ Transparência nos preços do pescado.</li>
                        <li>✅ Planejamento financeiro simplificado.</li>
                    </ul>
                </div>
            </section>

        </div>
    );
}

export default Home;