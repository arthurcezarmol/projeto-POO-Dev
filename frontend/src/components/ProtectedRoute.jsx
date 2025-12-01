import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redireciona para o login, mas salva a localização
    // que ele estava tentando acessar (state: { from: location })
    // para que possamos redirecioná-lo de volta após o login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se está autenticado, renderiza o componente filho (a página)
  return children;
};

export default ProtectedRoute;