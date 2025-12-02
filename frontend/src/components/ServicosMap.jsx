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

        // ADICIONEI ESTE CONSOLE.LOG PARA DEBUG
        console.log(`Comparando: Filtro='${filtro.toLowerCase()}' vs DB Categoria='${servico.categoria ? servico.categoria.toLowerCase() : 'N/A'}'`);

        // A comparação real (garante que servico.categoria não é nulo)
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
                    placeholder="Digite um local (ex: Arraial do Cabo)"
                    style={{ padding: '8px', marginRight: '5px' }}
                    className='input-busca'
                />
                <button type="submit" style={{ padding: '8px 12px' }} className='botao-busca'>Buscar</button>
            </form>

            {/* --- FILTROS ATUALIZADOS --- */}
            <div className="filtros" style={{ marginBottom: '10px' }}>
                <strong>Categorias:</strong>
                {/* Mantém a classe original 'botao-servico'
                  E adiciona 'active' SE for o selecionado */}
                <button
                    onClick={() => setFiltro('Todos')}
                    className={`botao-servico ${filtro === 'Todos' ? 'active' : ''}`}>
                    Todos
                </button>

                <button
                    onClick={() => setFiltro('Fábrica de Gelo')}
                    className={`botao-servico ${filtro === 'Fábrica de Gelo' ? 'active' : ''}`}>
                    Fábricas de Gelo
                </button>

                <button
                    onClick={() => setFiltro('Mecânico')}
                    className={`botao-servico ${filtro === 'Mecânico' ? 'active' : ''}`}>
                    Mecânicos
                </button>

                <button
                    onClick={() => setFiltro('Artigos de Pesca')}
                    className={`botao-servico ${filtro === 'Artigos de Pesca' ? 'active' : ''}`}>
                    Artigos de Pesca
                </button>

                <button
                    onClick={() => setFiltro('Sede')}
                    className={`botao-servico ${filtro === 'Sede' ? 'active' : ''}`}>
                    Sedes do Pescarte
                </button>
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