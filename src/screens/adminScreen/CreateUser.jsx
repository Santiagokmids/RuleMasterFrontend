import React from "react";
import Dropdown from "../../componente/Dropdown";
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";


import "./css/CreateUser.css";

function Createuser() {
  const [dropValue, setDropValue] = React.useState(false);
  const closeOpenDropdown = () => setDropValue(!dropValue);

  return (
    <div >
      <Header buttonText="Regresar" headerText="Crear un usuario" />
      <body className="body">
        <div className="containerBase">
          <h1 className="mainTitle">Datos del usuario</h1>
          <div>
            <FormInput type="text" placeholder="Nombre" h="5vh" w="70vh"/>
            <FormInput type="text" placeholder="Apellido" h="5vh" w="70vh" />
            <FormInput type="text" placeholder="Email"  h="5vh" w="70vh"/>
          </div>

          <Dropdown h="5vh" w="70vh"/>
          <div className="formComponent">
            <button>Crear Usuario</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Createuser;
