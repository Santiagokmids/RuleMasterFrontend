import React from "react";
import LoginButton from "../componente/LoginButton";
import LogoutButton from "../componente/LogoutButton";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import img from "../img/loginCoffee.jpg";

function Login() {
  const { user, isAuthenticated } = useAuth0();
  console.log(JSON.stringify(user));
  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div className="textCont">
          <div className="loginTextContainer">
            <h1 className="loginText">¡Bienvenido!</h1>
            <h2 className="loginText">Inicia sesión para continuar</h2>
          </div>
          <div className="logButton">
            {isAuthenticated ? (
              <LogoutButton h="6vh" w="12vw" />
            ) : (
              <LoginButton h="6vh" w="12vw" />
            )}
          </div>
        </div>
        <img className="coffeImg" src={img} alt="" />
      </div>
    </div>
  );
}

export default Login;
>>>>>>> login
