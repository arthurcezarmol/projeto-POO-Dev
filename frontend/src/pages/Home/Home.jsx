import React, { useState, useEffect, use } from 'react';
import axios from 'axios';      // Importa o axios (para conectar front e o back)
import './Home.css';

function Home () {
    return (
        <div>
            <h1>Home</h1>  
            <p>Bem vindo(a) à aplicação feita voltada para pescadores artesanais poderem ter acesso à diversas informações úteis. </p>
            <p>As funcionalidades oferecidas na aplicação são:</p>
            <ul>
                <li><strong>Login</strong> - aba onde o usuário pode logar e acessar suas informações pessoais;</li>
                <li><strong>Cadastro</strong> - aba onde o usuário pode se cadastrar para poder salvar suas informações;</li>
                <li><strong>Serviços</strong> - aba onde o usuário pode navegar no mapa e encontrar serviços úteis para ele, como: localização de fábricas de gelo, mecânicos, loja de artigos de pesca e sedes do pescarte;</li>
                <li><strong>Clima</strong> - aba onde o usuário pode consultar a previsão do tempo para qualquer cidade;</li>
                <li><strong>Financeiro</strong> - aba onde o usuário pode consultar a média de preços de determinados peixes e fazer uma estimativa de quanto ele pode vender por quilo;</li>
                <li><strong>Sobre</strong> - aba onde explica um pouco mais sobre o que é o Pescarte.</li>
            </ul>
        </div>
    );
}

export default Home;