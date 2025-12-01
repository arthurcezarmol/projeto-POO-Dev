import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// ... (Componente MoverMapa fica igual)
function MoverMapa({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// Posição inicial padrão
const latInicial = -21.759;
const lonInicial = -41.339;
const zoomInicial = 15;

// --- Componente Principal ---
function ServicosMap() {
    const [todosServicos, setTodosServicos] = useState([]);
    const [filtro, setFiltro] = useState('Todos');
    const [termoBusca, setTermoBusca] = useState('');
    const [centroMapa, setCentroMapa] = useState([latInicial, lonInicial]);
    const [zoomMapa, setZoomMapa] = useState(zoomInicial);

    // Efeito para buscar os serviços
    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/servicos');
                const data = await response.json();
                setTodosServicos(data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };
        fetchServicos();
    }, []);

    // --- LÓGICA DE FILTRAGEM (COM DEBUG) ---
    const servicosFiltrados = todosServicos.filter(servico => {
        if (filtro === 'Todos') {
            return true; // Mostra todos
        }

        // 1. ADICIONAMOS ESTE CONSOLE.LOG
        // Abra o console (F12) e veja o que aparece aqui!
        console.log(`Comparando: Filtro='${filtro.toLowerCase()}' vs DB Categoria='${servico.categoria ? servico.categoria.toLowerCase() : 'N/A'}'`);

        // A comparação real (garante que servico.categoria não é nulo)
        // A NOVA LINHA (mais flexível):
        return servico.categoria && servico.categoria.toLowerCase().startsWith(filtro.toLowerCase());
    });

    // Função de busca (handleBusca)
    const handleBusca = async (e) => {
        e.preventDefault(); 
        if (!termoBusca) return;

        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(termoBusca)}&format=json&limit=1`;
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                const novoCentro = [parseFloat(lat), parseFloat(lon)];
                setCentroMapa(novoCentro);
                setZoomMapa(13);
            } else {
                alert('Localização não encontrada.');
            }
        } catch (error) {
            console.error("Erro na busca de geocodificação:", error);
            alert('Erro ao buscar localização.');
        }
    };

    return (
        <div>
            {/* Formulário de Busca */}
            <form onSubmit={handleBusca} style={{ marginBottom: '10px' }}>
                <input 
                    type="text" 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    placeholder="Digite um local (ex: Rio de Janeiro)"
                    style={{ padding: '8px', marginRight: '5px' }}
                />
                <button type="submit" style={{ padding: '8px 12px' }}>Buscar</button>
            </form>

            {/* --- FILTROS ATUALIZADOS --- */}
            <div className="filtros" style={{ marginBottom: '10px' }}>
                <strong>Categorias:</strong>
                
                {/* ATENÇÃO: Os valores aqui ('Gelo', 'Mecânico', 'Pesca', 'Sede')
                  devem ser IGUAIS ao que está na coluna 'categoria' do seu banco de dados.
                */}
                
                <button onClick={() => setFiltro('Todos')}>Todos</button>
                
                {/* Se no seu banco a categoria é 'Fábrica de Gelo', 
                  mude aqui para: onClick={() => setFiltro('Fábrica de Gelo')}
                  Ou, melhor, mude no banco para apenas 'Gelo'.
                */}
                <button onClick={() => setFiltro('Gelo')}>Fábricas de Gelo</button>
                <button onClick={() => setFiltro('Mecânico')}>Mecânicos</button>
                
                {/* 2. NOVO BOTÃO ADICIONADO */}
                {/* Para este funcionar, você precisa ter 'Pesca' na sua coluna 'categoria' no banco */}
                <button onClick={() => setFiltro('Pesca')}>Artigos de Pesca</button>

                {/* NOVO BOTÃO (SEDES) */}
                <button onClick={() => setFiltro('Sede')}>Sedes do Pescarte</button>        {/* COLOCAR ISSO NO BANCO */}
            </div>

            {/* Mapa */}
            <MapContainer 
                center={centroMapa} 
                zoom={zoomMapa} 
                style={{ height: '600px', width: '100%' }}
            >
                <MoverMapa center={centroMapa} zoom={zoomMapa} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {servicosFiltrados.map(servico => (
                    <Marker key={servico.id} position={[servico.latitude, servico.longitude]}>
                        <Popup>
                            <strong>{servico.nome}</strong><br />
                            Categoria: {servico.categoria}<br />
                            Telefone: {servico.telefone || 'Não informado'}<br />
                            <em>{servico.descricao}</em>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default ServicosMap;