import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

import './Financeiro.css';

function Financeiro() {
    const { user, isAuthenticated } = useAuth();
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

        // SALVAR NO BANCO SE ESTIVER LOGADO
        if (isAuthenticated && user) {
            const payload = {
                tipoVenda: modoVenda,
                nomePeixe: peixe.tipoPescado,
                peso: peso,
                precoUnitario: precoUnitario,
                valorTotal: total
            };

            axios.post('http://localhost:8080/api/financeiro/salvar', payload)
                .then(res => console.log("Operação salva com sucesso!", res.data))
                .catch(err => console.error("Erro ao salvar operação:", err));
        }
    };

    return (
        <div className="pagina-financeiro">
            <h1 className="financeiro-titulo">💰 Simulador de Vendas</h1>

            <div className="card-principal">

                {/* --- SELEÇÃO DE MODO DE VENDA --- */}
                <div className="grupo-modos">
                    <strong style={{ alignSelf: 'center', marginRight: '10px' }}>Tipo de Venda: </strong>
                    <label className="label-radio">
                        <input
                            type="radio"
                            value="direto"
                            checked={modoVenda === 'direto'}
                            onChange={() => setModoVenda('direto')}
                        /> Venda Direta (Varejo)
                    </label>
                    <label className="label-radio">
                        <input
                            type="radio"
                            value="atacado"
                            checked={modoVenda === 'atacado'}
                            onChange={() => setModoVenda('atacado')}
                        /> Atacado
                    </label>
                </div>

                <form onSubmit={calcularVenda} className="form-calculadora">
                    <div className="input-group">
                        <label>Peixe:</label>
                        <select
                            value={idPeixeSelecionado}
                            onChange={e => setIdPeixeSelecionado(e.target.value)}
                            className="input-estilizado"
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

                    <div className="input-group">
                        <label>Peso (Kg):</label>
                        <input
                            type="number"
                            step="0.1"
                            value={pesoParaVenda}
                            onChange={e => setPesoParaVenda(e.target.value)}
                            className="input-estilizado"
                        />
                    </div>

                    <button type="submit" className="btn-calcular">Calcular</button>
                </form>
            </div>

            {resultado && (
                <div className="resultado-card">
                    <h3>Resultado ({resultado.modo === 'atacado' ? 'Atacado' : 'Venda Direta'})</h3>
                    <p>Peixe: <strong>{resultado.nome}</strong></p>
                    <p>Preço Unitário: R$ {resultado.precoUnitario.toFixed(2)}</p>
                    <h2 className="total-valor">Total: R$ {resultado.total.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
}

export default Financeiro;