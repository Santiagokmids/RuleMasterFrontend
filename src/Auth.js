import React from 'react';
import { useNavigate } from 'react-router-dom';
let isLoggedInGlobal = false; // Variable global
const navigate = useNavigate(); // Mueve la declaración aquí para que sea accesible en todo el componente

export function logout() {
  isLoggedInGlobal = false;
  navigate('/login');
}

export function Auth({ children }){
  let route = '';
  const login = () => {
    isLoggedInGlobal = true;
    route = '/ADMIN'; // Simulación de rol
    navigate(route);
  };

  const renderContent = () => {
    if (isLoggedInGlobal) {
      return children;
    } else {
      return <p>Debes iniciar sesión para acceder a esta página.</p>;
    }
  };

  return (
    <div>
      {renderContent()}
      {isLoggedInGlobal ? (
        <button onClick={logout}>Cerrar sesión</button>
      ) : (
        <button onClick={login}>Iniciar sesión</button>
      )}
    </div>
  );
};

export default Auth;
