import React from 'react';
import ServicosMap from '../../components/ServicosMap'; 

import './Servicos.css';

function Servicos () {
    return (
        <div className="pagina-servicos"> 
      
            {/* Você pode adicionar um título ou texto que aparecerá acima do mapa */}
            <h1>Encontre Serviços Úteis</h1>
            <p>Para encontrar o serviço que você procura basta pesquisar o nome da cidade desejada e clicar no botão do serviço.</p>
            <p>Navegue pelo mapa para encontrar fábricas de gelo, mecânicos e outros serviços essenciais para a pesca artesanal.</p>
            
            <hr />

            {/* 3. Aqui você renderiza o componente do mapa! */}
            <ServicosMap />

        </div>
    );
}

export default Servicos;