import React, { useState, useEffect } from 'react';
import axios from 'axios';      // Importa o axios (para conectar front e o back)
import './Clima.css';

// --- Importando os ícones ---
import { 
    WiDaySunny, 
    WiCloudy, 
    WiRain, 
    WiThunderstorm, 
    WiSnow, 
    WiFog 
} from 'react-icons/wi'; // Pacote de clima
import { BsDropletFill, BsWind } from 'react-icons/bs'; // Pacote de ícones gerais

function Clima () {
    
    // Lógica para decidir qual classe CSS usar (para temperatura)
    const getClasseTemperatura = (temp) => {
        if (temp > 28) {
            return 'temp-alta';         // Acima de 28°C é quente
        }
        if (temp < 15) {
            return 'temp-baixa';        // Abaixo de 15°C é frio
        }
        return 'temp-media';            // Entre 15°C e 28°C é normal
    };

    // --- ALTERAÇÃO: Lógica Corrigida para a direção do vento ---
    const getNomeDirecaoVento = (dir) => {
        if (dir >= 337.5 || dir < 22.5) return "Norte";
        if (dir >= 22.5 && dir < 67.5) return "Nordeste";
        if (dir >= 67.5 && dir < 112.5) return "Leste";
        if (dir >= 112.5 && dir < 157.5) return "Sudeste";
        if (dir >= 157.5 && dir < 202.5) return "Sul";
        if (dir >= 202.5 && dir < 247.5) return "Sudoeste";
        if (dir >= 247.5 && dir < 292.5) return "Oeste";
        if (dir >= 292.5 && dir < 337.5) return "Noroeste";
        return "Variável";
    };

    // --- Função para escolher o Ícone Principal ---
    const getIconePrincipal = (descricao) => {
        if (!descricao) return <WiDaySunny size={80} color="#fbc531" />;
        
        const desc = descricao.toLowerCase();

        if (desc.includes('chuva') || desc.includes('garoa')) return <WiRain size={80} color="#00a8ff" />;
        if (desc.includes('trovoada')) return <WiThunderstorm size={80} color="#485460" />;
        if (desc.includes('nuvem') || desc.includes('nublado')) return <WiCloudy size={80} color="#7f8fa6" />;
        if (desc.includes('neve')) return <WiSnow size={80} color="#dff9fb" />;
        if (desc.includes('neblina') || desc.includes('nevoeiro')) return <WiFog size={80} color="#dcdde1" />;
        
        // Padrão (Sol)
        return <WiDaySunny size={80} color="#fbc531" />;
    };

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
    // ESTE HOOK RODA TODA VEZ QUE 'cidadeBuscada' MUDAR
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
        /* Usamos a classe container para não bugar a Home */
        <main className="pagina-clima-container">

            <h1 className='clima-titulo-principal'>Clima</h1>

            {/* Conectamos o formulário ao React:
             - onSubmit chama nossa função handleSubmit
             - O <input> usa 'value' e 'onChange'
            */}
            <form onSubmit={handleSubmit} className="form-busca">
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

            {/* --- ÁREA DO RESULTADO --- */}

            {/* Mostra "Carregando..." durante a busca */}
            {loading && <p className="loading-msg">Carregando clima...</p>}             {/* Dentro do JSX, qualquer código JS tem que estar entre {} */}

            {/* Mostra o erro, se houver */}
            {erro && <p className='erro-clima'>{erro}</p>}

            {/* Mostra o clima, APENAS se tiver dados (clima não é null) */}
            {/* O nome das variáveis tem que ser O MESMO das variáveis no meu climaDTO!!! */}
            {clima && (
                <div className='clima-container'>
                    <h1 className='clima-titulo'>Clima em: <br/> {clima.cidade} - {clima.pais}</h1>
                    
                    {/* --- Ícone Principal Animado --- */}
                    <div className="icone-destaque">
                        {getIconePrincipal(clima.descricao)}
                    </div>

                    <p className='clima-info'>
                        Temperatura: 
                        <span className={getClasseTemperatura(clima.temperatura)}>
                            {Math.round(clima.temperatura)}°C
                        </span>
                    </p>

                    {/* --- Descrição estilizada --- */}
                    <p className="descricao-texto">{clima.descricao}</p>

                    {/* --- Detalhes com ícones pequenos --- */}
                    <div className='clima-detalhes'>
                        
                        <div className="linha-info">
                            <div className="info-icon"><BsDropletFill size={20} color="#1e8bff"/></div>
                            <strong>Umidade:</strong> 
                            <span>{clima.umidade}%</span>
                        </div>

                        <div className="linha-info">
                            <div className="info-icon"><BsWind size={20} color="#a5b1c2"/></div>
                            <strong>Vento:</strong> 
                            <span>{clima.velocidadeVento} Km/h ({getNomeDirecaoVento(clima.direcaoVento)})</span>
                        </div>

                        <div className="linha-info">
                            <div className="info-icon"><WiCloudy size={24} color="#7f8fa6"/></div>
                            <strong>Nebulosidade:</strong> 
                            <span>{clima.nebulosidade}%</span>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Clima;