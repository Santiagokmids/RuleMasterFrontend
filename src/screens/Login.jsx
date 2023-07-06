import React, { useState } from "react";
import "./Login.css";
import img from "../img/loginCoffee.jpg";
import Button from "../componente/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import InputLogin from "../componente/InputLogin"




const Login = ({ setLogin }) =>{

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const baseUrl = "http://lb-rulemaster-1959678376.us-east-2.elb.amazonaws.com"

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const { data } = await axios.post(
        baseUrl+"/token",
        {
            username,
            password
        },
        {
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
          },
        }
      );

      if (data.token){
        localStorage.setItem("jwt", data.token);
        setLogin(true);

        const response = await axios.get(baseUrl + "/users/current", {
          headers: {
            "Access-Control-Allow-Origin": baseUrl,
            "MediaType": "application/json",
            "Authorization": "Bearer "+localStorage.getItem('jwt')
          }
        });

        const user=response.data;
        const role=user.role
        localStorage.setItem("currentRole",role);
        if(role === "Administrador"){
            navigation("/admin");
        }

         if(role === "Gestor_de_reglas"){
            navigation("/ruleManagement");
        }

        if(role === "Gestor_de_columnas"){
          navigation("/attributeManagement");
         }
        if(role === "Gestor_de_registros"){
           navigation("/recordManagement");
         }

      }
        
    } catch (error) {
      alert("Credenciales invalidas "+error.response.data.details[0].errorMessage)
    }
  };


  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div className="textCont">
          <div className="loginTextContainer">
            <h1 className="loginText">¡Bienvenido!</h1>
            <h2 className="loginText">Inicia sesión para continuar</h2>
          </div>
          <form onSubmit={handleSubmit}>
           <InputLogin 
            marginT="1.5vw" w="24vw" h="6vh" type="email" 
            placeholder="Email" icon="at-outline" 
            value={username}
            onChange={u => setUsername(u)}                              
          />
          <InputLogin 
            marginT="1.5vw" w="24vw" h="6vh" type="password" 
            placeholder="Contraseña" icon="lock-closed-outline"  
            value={password}onChange={p => setPassword(p)} 
          />

            <div className="logButton">
              <Button type="submit" w="20vw" h="6vh" text="Login" marginT="5vh" marginL="0vw" fontsize="1.5rem"  />
            </div>
          </form>

         
        </div>
        <img className="coffeImg" src={img} alt="" />
      </div>
    </div>
  );
}

export default Login;
