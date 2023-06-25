import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";

import "./CreateUser.css";

function Createuser() {
  const [dropValue, setDropValue] = React.useState(false);
  const closeOpenDropdown = () => setDropValue(!dropValue);
  return (
    <div className="createUserWrapper">
      <Header buttonText="Regresar" headerText="Crear un usuario" />
      <body className="body">
        <div className="containerBase">
          <h1 className="mainTitle">Datos del usuario</h1>

          <FormInput type="text" placeholder="Nombre" />
          <FormInput type="text" placeholder="Apellido" />
          <FormInput type="text" placeholder="Email" />

          <div className="formComponent">
            <Dropdown onToggle={closeOpenDropdown}  >
              <DropdownToggle
                caret
                className="rolDropDown"
                value={dropValue}
                onChange={(event) => {
                  setDropValue(event.target.value);
                }}
              >
                Rol
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem>Administrador</DropdownItem>
                <DropdownItem>Gerente reglas</DropdownItem>
                <DropdownItem>Evaluador de reglas</DropdownItem>
                <DropdownItem>Admin</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="formComponent">
            <button>Crear Usuario</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Createuser;
