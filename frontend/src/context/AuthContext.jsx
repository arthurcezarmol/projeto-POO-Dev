import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; 

// 1. Criar o Contexto
const AuthContext = createContext(null);

// 2. Criar o Provedor (Provider)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Pega o token do localStorage se existir

  // Efeito para carregar dados do usuário se o token existir (ao recarregar a página)
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          // Adiciona o token ao header do axios para esta requisição
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Endpoint /api/me que retorna os dados do usuário logado a partir do token
          const response = await axios.get('http://localhost:8080/api/me'); 
          setUser(response.data);       // Salva o UserDto ({ id, username, nome, corporativa})
        } catch (error) {
          console.error('Falha ao buscar usuário. Token inválido?', error);
          // Se o token for inválido ou expirado, limpa tudo
          logout();
        }
      }
    };

    fetchUserData();
  }, [token]);

  // Função de Login
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', { 
        username: username,
        password: password,
      });

      let responseData = response.data;

      // 1. VERIFICAÇÃO DE TIPO: O 'response.data' é um texto?
      if (typeof responseData === 'string') {
        try {
          // Converte o texto em objeto JSON
          responseData = JSON.parse(responseData); 
        } catch (e) {
          console.error("Falha ao converter a resposta (string) para JSON:", e);
          return false;
        }
      }

      // 2. VERIFICAÇÃO DA CHAVE:
      if (responseData && responseData.accessToken) {
        
        const token = responseData.accessToken;

        // Armazena no estado
        setToken(token);

        // Armazena no localStorage para persistir
        localStorage.setItem('token', token);

        // Configura o header padrão do Axios para futuras requisições
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return true; // Sucesso!
        
      } else {
        console.error("Login teve sucesso (HTTP 200), mas o objeto da resposta não continha um 'accessToken' válido.", responseData);
        return false; 
      }

    } catch (error) {
      console.error('Erro no login (ex: 401 - Não autorizado):', error.response ? error.response.data : error.message);
      return false; 
    }
  };

  // Função de Logout
  const logout = () => {
    // Limpa o estado
    setUser(null);
    setToken(null);

    // Limpa o localStorage
    localStorage.removeItem('token');

    // Remove o header do Axios
    delete axios.defaults.headers.common['Authorization'];
  };

  // 5. O valor que o contexto fornecerá
  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token, // Um booleano simples para verificar se está logado
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 6. Hook customizado para consumir o contexto facilmente
export const useAuth = () => {
  return useContext(AuthContext);
};