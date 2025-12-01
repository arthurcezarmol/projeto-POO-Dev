import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  // 1. Pegamos tudo o que precisamos do contexto (AuthContext)
  const { isAuthenticated, user, login, logout } = useAuth();

  // 2. State para o formulário (só usado se não estiver logado)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para msg de erro

  // 3. Handler do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros antigos

    const success = await login(username, password);

    if (!success) {
      setError('Usuário ou senha inválidos. Tente novamente.');
      // console.log("Login falhou, exibindo erro.");
    }
    // NÃO TEM MAIS 'navigate' AQUI!
    // O componente vai re-renderizar sozinho
    // porque 'isAuthenticated' e 'user' vão mudar no contexto.
  };

  // 4. Renderização Condicional

  // SE ESTIVER AUTENTICADO...
  if (isAuthenticated) {
    return (
      <div className="profile-container"> {/* Use seu CSS aqui */}
        <h2>Área do Usuário</h2>
        
        {/* Mostra "Carregando..." enquanto o user não chega do useEffect */}
        {!user ? (
          <p>Carregando informações...</p>
        ) : (
          <>
            {/* Ajuste os nomes (user.nome, user.email) para
                bater com o que seu backend envia */}
            <h3>Bem-vindo(a), {user.nome || user.username}!</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
            {/* Adicione mais dados do usuário aqui */}
          </>
        )}
        
        <button onClick={logout}>Sair (Logout)</button>
      </div>
    );
  }

  // SE NÃO ESTIVER AUTENTICADO...
  // Mostra o formulário de login
  return (
    <div className="login-container"> {/* Use seu CSS aqui */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {/* Mostra a mensagem de erro se 'error' não estiver vazio */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;