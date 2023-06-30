import Dropdown from "../../componente/Dropdown";
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/CreateUser.css";
import Button from "../../componente/Button";

const baseUrl = "http://localhost:8091"

function Createuser() {

  const navigation = useNavigate();

  const [dropValue, setDropValue] = React.useState(false);
  const closeOpenDropdown = () => setDropValue(!dropValue);

  const selectOptions = [
    { label: "Administrador", value: "Administrador" },
    { label: "Gestor de registros", value: "Gestor de registros" },
    { label: "Gestor de reglas", value: "Gestor de reglas" },
    { label: "Evaluador de reglas", value: "Evaluador de reglas" },
    { label: "Gestor de Columnas", value: "Gestor de Columnas" },
  ];

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(role !== ""){

      try{
        const response = await axios.post(baseUrl + "/users",
          {
            name,
            lastName,
            email,
            password,
            role
          },
          {
            headers:{
              "Access-Control-Allow-Origin": baseUrl,
              "MediaType" : "application/json",
            }
          }
        );
  
        if (response.status === 200) {
          alert("El usuario fue creado con éxito!");
          navigation("/login");
  
        }
      }
      catch (error) {
        console.log(error)
        alert("No se pudo crear el usuario. "+error.response.data.details[0].errorMessage)
      } 
    }else{
      alert("No se pudo crear el usuario. Por favor seleccione un rol");
    }
  }
  
  

  const handleClick = async (event) => {
    event.preventDefault();
    navigation("/admin");
  }


  return (
    <div >
      <Header buttonText="Regresar" headerText="Crear un usuario" onClick={handleClick} />
      <body className="body">
        <div className="containerBase">
          <h2 className="mainTitle" >Datos del usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <FormInput type="text" placeholder="Nombre" h="5vh" w="34vw" fontsize="1.2rem" value={name} onChange={newName => setName(newName)}/> 
              <FormInput type="text" placeholder="Apellido" h="5vh" w="34vw" fontsize="1.2rem" value={lastName} onChange={newLastName => setLastName(newLastName)}/>
              <FormInput type="email" placeholder="Email"  h="5vh" w="34vw" fontsize="1.2rem" value={email} onChange={newEmail => setEmail(newEmail)}/>
              <FormInput type="password" placeholder="Contraseña"  h="5vh" w="34vw" fontsize="1.2rem" value={password} onChange={newPassword => setPassword(newPassword)}/>
              <Dropdown selectOptions={selectOptions} h="6vh" w="35vw" t="4vh" optionD="Roles" fontsize="1.2rem" value={role} onChange={newRole => setRole(newRole)} />
            </div>
            <div className="formComponent">
              <Button h="5vh" w="35vw" text="Confirmar" type="submit"/> 
            </div>
          </form>
        </div>
      </body>
    </div>
  );
}

export default Createuser;
