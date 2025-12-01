import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Financeiro.css';

function Financeiro() {
    const [estoque, setEstoque] = useState([]);
    
    // --- NOVO ESTADO: MODO DE VENDA ---
    // Começa como 'direto' por padrão
    const [modoVenda, setModoVenda] = useState('direto'); 

    const [idPeixeSelecionado, setIdPeixeSelecionado] = useState("");
    const [pesoParaVenda, setPesoParaVenda] = useState("");
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        carregarPeixes();
    }, []);

    const carregarPeixes = () => {
        axios.get('http://localhost:8080/api/peixes')
            .then(res => setEstoque(res.data))
            .catch(err => console.error(err));
    }

    // Função auxiliar para pegar o preço certo baseado no modo escolhido
    const getPrecoAtual = (peixe) => {
        if (!peixe) return 0;
        if (modoVenda === 'atacado') {
            return peixe.valorAtacado || 0; // Usa a coluna de atacado
        } else {
            return peixe.valorDireto || 0;  // Usa a coluna direta
        }
    }

    const calcularVenda = (e) => {
        e.preventDefault();
        const peixe = estoque.find(p => p.id === parseInt(idPeixeSelecionado));
        
        if (!peixe) {
            alert("Selecione um peixe!");
            return;
        }

        const peso = parseFloat(pesoParaVenda);
        
        // USA A FUNÇÃO INTELIGENTE PARA PEGAR O PREÇO
        const precoUnitario = getPrecoAtual(peixe); 
        const total = precoUnitario * peso;

        setResultado({
            nome: peixe.tipoPescado,
            peso: peso,
            precoUnitario: precoUnitario, // Salva qual preço foi usado
            total: total,
            modo: modoVenda // (Opcional) Para saber qual modo foi usado
        });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>💰 Simulador de Vendas</h1>

            <div style={containerStyle}>
                
                {/* --- SELEÇÃO DE MODO DE VENDA --- */}
                <div style={{ marginBottom: '20px', padding: '10px', background: '#fff', borderRadius: '5px' }}>
                    <strong>Tipo de Venda: </strong>
                    <label style={{ marginRight: '15px', cursor: 'pointer' }}>
                        <input 
                            type="radio" 
                            value="direto" 
                            checked={modoVenda === 'direto'} 
                            onChange={() => setModoVenda('direto')}
                        /> Venda Direta (Varejo)
                    </label>
                    <label style={{ cursor: 'pointer' }}>
                        <input 
                            type="radio" 
                            value="atacado" 
                            checked={modoVenda === 'atacado'} 
                            onChange={() => setModoVenda('atacado')}
                        /> Atacado
                    </label>
                </div>

                <form onSubmit={calcularVenda}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Peixe:</label>
                        <select 
                            value={idPeixeSelecionado} 
                            onChange={e => setIdPeixeSelecionado(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="">Selecione...</option>
                            {estoque.map(peixe => {
                                // Mostra o preço dinâmico no dropdown também!
                                const preco = getPrecoAtual(peixe);
                                return (
                                    <option key={peixe.id} value={peixe.id}>
                                        {peixe.tipoPescado} - R$ {preco.toFixed(2)}/kg
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label>Peso (Kg):</label>
                        <input 
                            type="number" 
                            step="0.1" 
                            value={pesoParaVenda}
                            onChange={e => setPesoParaVenda(e.target.value)}
                            style={inputStyle}
                        />
                    </div>

                    <button type="submit" style={buttonStyle}>Calcular</button>
                </form>
            </div>

            {resultado && (
                <div style={resultadoStyle}>
                    <h3>Resultado ({resultado.modo === 'atacado' ? 'Atacado' : 'Venda Direta'})</h3>
                    <p>Peixe: <strong>{resultado.nome}</strong></p>
                    <p>Preço Unitário: R$ {resultado.precoUnitario.toFixed(2)}</p>
                    <h2 style={{ color: 'green' }}>Total: R$ {resultado.total.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
}

// Estilos simples (pode manter os seus)
const containerStyle = { background: '#f4f4f4', padding: '20px', borderRadius: '8px' };
const inputStyle = { display: 'block', width: '100%', padding: '8px', marginBottom: '10px' };
const buttonStyle = { background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' };
const resultadoStyle = { marginTop: '20px', padding: '15px', background: '#e8f5e9', border: '1px solid green', borderRadius: '5px' };

export default Financeiro;