import React from "react";
import Dropdown from "../../componente/Dropdown";
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";
import { useNavigate } from "react-router-dom";



import "./css/CreateUser.css";
import Button from "../../componente/Button";

function Createuser() {
  const [dropValue, setDropValue] = React.useState(false);
  const closeOpenDropdown = () => setDropValue(!dropValue);
  const selectOptions = [
    { label: "Gestor de registros", value: "Gestor de registros" },
    { label: "Gestor de reglas", value: "Gestor de reglas" },
    { label: "Evaluador de reglas", value: "Evaluador de reglas" },
    { label: "Gestor de ??????(Columns) Ingles VIII", value: "Gestor de ??????(Columns) Ingles VIII" },
  ];
  const navigation = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    navigation("/admin");
  };

  return (
    <div >
      <Header buttonText="Regresar" headerText="Crear un usuario" onClick={handleLogout}/>
      <body className="body">
        <div className="containerBase">
          <h1 className="mainTitle">Datos del usuario</h1>
          <FormInput type="text" placeholder="Nombre" h="5vh" w="34vw" fontsize="1.2rem"/>
          <FormInput type="text" placeholder="Apellido" h="5vh" w="34vw" fontsize="1.2rem"/>
          <Dropdown selectOptions={selectOptions} h="6vh" w="35vw" t="4vh" optionD="Roles" fontsize="1.2rem"/>
          <FormInput type="email" placeholder="Email"  h="5vh" w="34vw" fontsize="1.2rem"/>
          <FormInput type="password" placeholder="Contraseña"  h="5vh" w="34vw" fontsize="1.2rem"/>
          
          
          <div className="formComponent">
            <Button h="5vh" w="35vw" text="Confirmar" /> 
          </div>
        </div>
      </body>
    </div>
  );
}

export default Createuser;
