import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Login from './screens/Login';
import Header from './componente/Header';


export default function Auth({ children }){  
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  let route = ""


  const login = (user) => {
    loginWithRedirect;
    route = "/admin" // aqui obtendria el rol
    navigate(route);
  };

  const logOutC = () => {
    logout
    route = "/login"
    navigate(route);
  };


  const renderContent = () => {
    if (isAuthenticated) {
      return children;
    } else {

    }
  };


  return (
    <div>
      {/* Renderiza el contenido protegido */}
      {renderContent()}

      {isAuthenticated ? (
        <button onClick={logOutC}>Hola</button>
      ) : (
        <Login redirect={login} />
      )}

    </div>
  );
};
