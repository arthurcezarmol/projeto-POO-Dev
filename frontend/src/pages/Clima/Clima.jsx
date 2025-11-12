import React, { useState, useEffect, use } from 'react';
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

    // Lógica para decidir qual vai ser a direção do vento baseado no valor recebido (VERIFICAR LÓGICA)
    const getClasseDirecaoVento = (dir) => {
        switch (dir) {
            case 0 || 360:
                return "Norte";
                break;
            case 90:
                return "Leste";
                break;
            case 180:
                return "Sul";
                break;
            case 270:
                return "Oeste";
                break;
        }
    }


    // 1. Cria um "estado" para guardar os dados do clima quando chegarem
    const [clima, setClima] = useState(null);       // Guarda os estados do clima
    const [erro, setErro] = useState(null);         // Guarda a mensagem de erro
    const [loading, setLoading] = useState(false);  // Para mostrar "Carregando..."

    // 1.1 ESTADO PARA O INPUT
    // Guarda o que o usuário está digitando agora
    const [cidadeInput, setCidadeInput] = useState('');

    // 1.2 ESTADO PARA A BUSCA
    // Guarda a última cidade que o usuário confirmou (clicou em "Buscar")
    const [cidadeBuscada, setCidadeBuscada] = useState('');

    // 2. useEffect é um "hook" que roda o código DEPOIS que o componente aparece na tela.
    // O [] vazio no final significa "rode apenas uma vez".
    // ALTERAÇÕES: ESTE HOOK AGORA RODA TODA VEZ QUE 'cidadeBuscada' MUDAR!
    useEffect(() => {
        // Não faz nada se nenhuma cidade foi buscada (evita rodar na primeira vez)
        if (cidadeBuscada === '') {
            return;
        }

        // Prepara para a nova busca:
        setLoading(true);       // Ativa o "Carregando..."
        setClima(null);         // Limpa o clima anterior
        setErro(null);          // Limpa o erro anterior

        // CHAMADA DINÂMICA
        // A URL agora usa a cidade do estado
        const urlAPI = `http://localhost:8080/api/clima?cidade=${cidadeBuscada}`;

        axios.get(urlAPI)
            .then(response => {
                setClima(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados do clima!', error);
                setErro('Cidade não encontrada ou erro na API');
            })
            .finally(() => {
                // Termina o carregamento, independente do sucesso ou erro
                setLoading(false);
            });
    }, [cidadeBuscada]);    // O "gatilho" do useEffect

    // 5. Função de Submit
    const handleSubmit = (event) => {
        // A. Impede o recarregamento da página
        event.preventDefault();

        // B. Define a cidade que queremos buscar (disparando o useEffect)
        setCidadeBuscada(cidadeInput);
    }

    // 6. SUCESSO: Mostra os dados que vieram do Spring!
    return (
        <>
            <main>
                {/* <h1 className='clima-titulo-principal'>Clima</h1> */}

                {/* Conectamos o formulário ao React:
                 - onSubmit chama nossa função handleSubmit
                 - O <input> usa 'value' e 'onChange'
                */}
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type="text" 
                        className='form-control'
                        placeholder='Digite o nome da cidade'
                        required
                        value={cidadeInput}     // O valor do input é controlado pelo React
                        onChange={(e) => setCidadeInput(e.target.value)}    // Atualiza o estado a cada tecla
                        // e - evento que está acontecendo (no caso é change) | 
                        // target é o elemento que desencadeia o evento (no caso é input) |
                        // value é o elemento do input onChange
                        />
                    </div>
                    <button type='submit' className='button-submit'>Descobrir clima</button>
                </form>
            </main>

            {/* --- ÁREA DO RESULTADO --- */}

            {/* Mostra "Carregando..." durante a busca */}
            {loading && <p>Carregando clima...</p>}             {/* Dentro do JSX, qualquer código JS tem que estar entre {} */}

            {/* Mostra o erro, se houver */}
            {erro && <p className='erro-clima'>{erro}</p>}

            {/* Mostra o clima, APENAS se tiver dados (clima não é null) */}
            {/* O nome das variáveis tem que ser O MESMO das variáveis no meu climaDTO!!! */}
            {clima && (
                <div className='clima-container'>
                    <h1 className='clima-titulo'>Clima em: {clima.cidade} - {clima.pais}</h1>
                    <p className='clima-info'>
                        Temperatura: 
                        <span className={getClasseTemperatura(clima.temperatura)}>
                            {clima.temperatura}°C
                        </span>
                    </p>
                    <p className='clima-info'>Umidade: {clima.umidade}</p>
                    <p className='clima-info'>Pressão: {clima.pressão} Pascal</p>
                    <p className='clima-info'>Descrição: {clima.descricao}</p>
                    <p className='clima-info'>Velocidade do vento: {clima.velocidadeVento} Km/h</p>
                    <p className='clima-info'>Direção do vento: {clima.direcaoVento}°</p>
                    <p className='clima-info'>Nebulosidade: {clima.nebulosidade}</p>
                </div>
            )}
        </>
    );
}

export default Clima;