import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

import './Login.css';

const Login = () => {
  // 1. Pegamos tudo o que precisamos do contexto (AuthContext)
  const { isAuthenticated, user, login, logout } = useAuth();

  // 2. State para o formulário (só usado se não estiver logado)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para msg de erro

  // State para o histórico
  const [historico, setHistorico] = useState([]);

  // Fetch do histórico quando o usuário logar
  useEffect(() => {
    if (isAuthenticated && user) {
      axios.get('http://localhost:8080/api/financeiro/historico')
        .then(res => setHistorico(res.data))
        .catch(err => console.error("Erro ao buscar histórico:", err));
    }
  }, [isAuthenticated, user]);

  // 3. Handler do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros antigos

    const success = await login(username, password);

    if (!success) {
      setError('Usuário ou senha inválidos. Tente novamente.');
      console.log("Login falhou, exibindo erro.");
    }
    // NÃO TEM MAIS 'navigate' AQUI!
    // O componente vai re-renderizar sozinho
    // porque 'isAuthenticated' e 'user' vão mudar no contexto.
  };

  // Função para deletar uma transação do histórico
  const handleDelete = async (id) => {
    // Pergunta de confirmação básica
    if (!window.confirm("Tem certeza que deseja deletar esta transação?")) {
      return;
    }

    try {
      // Chama o endpoint de delete que criamos
      await axios.delete(`http://localhost:8080/api/financeiro/${id}`);

      // Atualiza a lista na tela removendo o item deletado (sem precisar recarregar)
      setHistorico(prevHistorico => prevHistorico.filter(item => item.id !== id));

      alert("Transação removida com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao tentar deletar a transação.");
    }
  };

  // 4. Renderização Condicional

  // SE ESTIVER AUTENTICADO E TIVER INFORMAÇÕES DO USUÁRIO (NÃO FOR NULO)...
  if (isAuthenticated && user) {
    return (
      <div className="login-page"> {/* Reutiliza o fundo cinza */}
        <div className="profile-card">

          {/* Cabeçalho do Perfil com Avatar */}
          <div className="profile-header">
            <div className="profile-avatar">
              {user.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2>Olá, {user.nome}!</h2>
            <span className="profile-role">{user.cargo || 'Usuário'}</span>
          </div>

          <hr className="divider" />

          {/* Detalhes do Usuário */}
          <div className="profile-details">
            <div className="detail-item">
              <span className="label">Idade:</span>
              <span className="value">{user.idade} anos</span>
            </div>
            <div className="detail-item">
              <span className="label">Cidade:</span>
              <span className="value">{user.cidade || 'Não informada'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Corporativa:</span>
              <span className="value">{user.corporativa || '-'}</span>
            </div>
          </div>

          <hr className="divider" />

          {/* Histórico de Operações */}
          <div className="profile-history">
            <h3>Histórico de Vendas</h3>
            {historico.length === 0 ? (
              <p>Nenhuma venda registrada.</p>
            ) : (
              <ul className="history-list">
                {historico.map(op => (
                  // Usamos a classe 'history-item' aqui
                  <li key={op.id} className="history-item">

                    {/* Detalhes da transação */}
                    <div className="item-details">
                      <strong>{op.nomePeixe} <span style={{ fontWeight: 'normal', fontSize: '0.9em' }}>({op.tipoVenda})</span></strong>
                      <div className="item-date">
                        {new Date(op.dataOperacao).toLocaleString()}
                      </div>
                      <div className="item-price">
                        R$ {op.valorTotal.toFixed(2)}
                      </div>
                    </div>

                    {/* Botão de Deletar com classe 'delete-btn' */}
                    <button
                      onClick={() => handleDelete(op.id)}
                      className="delete-btn"
                      title="Remover transação"
                    >
                      🗑️ Deletar
                    </button>

                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botão de Logout */}
          <button onClick={logout} className="logout-btn">
            Sair da Conta
          </button>
        </div>
      </div>
    );
  }

  // SE NÃO ESTIVER AUTENTICADO...
  // Mostra o formulário de login
  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">🔐 Login</h2>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label className="form-label">Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;