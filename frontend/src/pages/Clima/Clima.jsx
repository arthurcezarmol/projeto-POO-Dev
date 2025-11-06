import React, { useState, useEffect } from 'react';
import axios from 'axios';      // Importa o axios (para conectar front e o back)
import './Clima.css';

function Clima () {
    // Lógica para decidir qual classe CSS usar (para temperatura) (AINDA NÃO ESTÁ IMPLEMENTADA)
    const getClasseTemperatura = (temp) => {
        if (temp > 28) {
            return 'temp-alta';         // Acima de 28°C é quente
        }
        if (temp < 15) {
            return 'temp-baixa';        // Abaixo de 15°C é frio
        }
        return 'temp-media';            // Entre 15°C e 28°C é normal
    };


    // 1. Cria um "estado" para guardar os dados do clima quando chegarem
    const [clima, setClima] = useState(null);
    const [erro, setErro] = useState(null);

    // 2. useEffect é um "hook" que roda o código DEPOIS que o componente aparece na tela.
    // O [] vazio no final significa "rode apenas uma vez".
    useEffect(() => {
        // 3. A chamada. ESTA É A CONEXÃO!
        // Utilizo axios.get() para fazer uma requisição HTTP GET
        axios.get('http://localhost:8080/api/clima')
            .then(response => {
                // 4. SUCESSO! Spring respondeu.
                // Guardo os dados (response.data) no estado.
                setClima(response.data);
            })
            .catch(error => {
                // 5. ERRO! Algo deu errado.
                console.error('Erro ao buscar dados do clima!', error);
                setErro('Não foi possível carregar o clima.');
            });
    }, []); // O [] vazio garante que isso rode só uma vez


    // 6. Renderização 
    if(erro) {
        return <p>{erro}</p>;
    }

    if(!clima){
        return <p>Carregando clima...</p>;
    }

    // 7. SUCESSO: Mostra os dados que vieram do Spring!
    return (
        <div>
            {/* O nome das variáveis tem que ser O MESMO das variáveis no meu climaDTO!!! */}
            <h1>Clima em: {clima.cidade} - {clima.pais}</h1>
            <p>Temperatura: {clima.temperatura}°C</p>
            <p>Umidade: {clima.umidade}</p>
            <p>Pressão: {clima.pressão} Pascal (Pa)</p>
            <p>Descrição: {clima.descricao}</p>
            <p>Velocidade do vento: {clima.velocidadeVento} Km/h</p>
            <p>Direção do vento: {clima.direcaoVento}°</p>
            <p>Nebulosidade: {clima.nebulosidade}</p>
        </div>
    );
}

export default Clima;