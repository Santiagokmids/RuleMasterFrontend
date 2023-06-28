import React from "react";
import LogoutButton from "../componente/LogoutButton";
import "./Login.css";
import { useAuth0 } from "@auth0/auth0-react";
import img from "../img/loginCoffee.jpg";
import Button from "../componente/Button";
import { useNavigate } from "react-router-dom";

function Login(prop) {
  const { user, isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const navigation = useNavigate();

  const click = async (event) => {
    event.preventDefault();
    navigation("/ADMIN");
  };

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
              <Button w="20vw" h="6vh" text="Login" marginT="5vh" marginL="0vw" fontsize="1.5rem" onClick={click} />
          </div>
        </div>
        <img className="coffeImg" src={img} alt="" />
      </div>
    </div>
  );
}

export default Login;
