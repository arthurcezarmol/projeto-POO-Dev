import React from 'react';
import ServicosMap from '../../components/ServicosMap'; 

import './Servicos.css';

function Servicos () {
    return (
        <div className="pagina-servicos"> 
      
            {/* Você pode adicionar um título ou texto que aparecerá acima do mapa */}
            <h1>Encontre Serviços Úteis</h1>
            <p>Navegue pelo mapa para encontrar fábricas de gelo, mecânicos e outros serviços essenciais para a pesca artesanal.</p>
            <p>Para encontrar o serviço que você procura basta pesquisar o nome da cidade desejada e clicar no botão do serviço.</p>
            <p>Para descobrir mais informações sobre o serviço basta clicar no marcador azul que irá aparecer no mapa.</p>
            <p>Cidades cadastradas:</p>
            <ul>
                <li>Arraial do Cabo</li>
                <li>Armação dos Búzios</li>
                <li>Cabo Frio</li>
                <li>Campos dos Goytacazes</li>
                <li>Carapebus</li>
                <li>Macaé</li>
                <li>Quissamã</li>
                <li>Rio das Ostras</li>
                <li>São Francisco de Itabapoana</li>
                <li>São João da Barra</li>
            </ul>
            
            <hr />

            {/* 3. Aqui você renderiza o componente do mapa! */}
            <ServicosMap />

        </div>
    );
}

export default Servicos;