import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './screens/Login';
import Header from './componente/Header';


export default function Auth({ children }){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  let route = ""


  const login = (user) => {
    setIsLoggedIn(true);
    route = "/ADMIN" // aqui obtendria el rol
    navigate(route);
  };

  const logout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const renderContent = () => {
    if (isLoggedIn) {
      return children;
    } else {
    

    }
  };


  return (
    <div>
      {/* Renderiza el contenido protegido */}
      {renderContent()}

      {/* Renderiza el componente de inicio de sesión */}
      {isLoggedIn ? (
        <div />
      ) : (
        <Login redirect={login} />
      )}

    </div>
  );
};
