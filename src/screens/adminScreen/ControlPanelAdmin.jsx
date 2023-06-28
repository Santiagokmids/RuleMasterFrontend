import React, { useState } from "react";
import Header from "../../componente/Header";
import { useLocation } from 'react-router-dom';

import "./css/ControlPanel.css";
import ButtonIcon from "../../componente/ButtonIcon";
import IconTextInput from "../../componente/IconTextInput";
import PopUpDropdown from "../../componente/PopUpDropdown";

export default function ControlPanelAdmin({ callback }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    console.log("Botón clickeado");
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const selectOptions = [
    { label: "Eliminar usuario", value: "Eliminar usuario" },
  ];

  const handleLogout = () => {
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  return (
    <div>
      <Header buttonText="Cerrar sesión" headerText="Panel de control" onClick={handleLogout}/>
      <div className="body">
        <div className="containerBase" style={{ width: "80vw" }}>
          <div className="containerBase2">
            <IconTextInput marginT="1.5vw" w="24vw" h="6vh" type="text" placeholder="Buscar Usuario" icon="search-outline" />
            <ButtonIcon onClick={handleClick} marginT="1.5vw" marginL="1vw" text="Gestionar Usuario" w="24vw" h="6vh" img="person-outline" />
            <ButtonIcon onClick={handleClick} marginT="1.5vw" marginL="1vw" text="Crear usuario" w="24vw" h="6vh" img="person-add-outline" />
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <PopUpDropdown button2="Seleccionar accion" button1="Ingrese el ID" textHeader="Gestionar usuarios" selectOptions={selectOptions} onClickHeader={handleClose} />
      )}
    </div>
  );
}
