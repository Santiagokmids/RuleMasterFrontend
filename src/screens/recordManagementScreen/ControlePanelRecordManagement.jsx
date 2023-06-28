import React, {useState} from 'react'
import Header from "../../componente/Header";
import { useNavigate } from "react-router-dom";

import "./css/ControlPanelRecord.css";
import ButtonIcon from "../../componente/ButtonIcon";
import Button from "../../componente/Button";
import PopUpDropdown from "../../componente/PopUpDropdown";

export default function ControlePanelRecordManagement() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigation = useNavigate();
  const handleLogout = async (event) => {
    event.preventDefault();
    navigation("/login");
  };
  const handleClick = () => {
    console.log("Botón clickeado");
    setPopupOpen(true);
  };
  const createRecord = () => {
    console.log("Botón clickeado");
    navigation("/createRecord");
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const selectOptions = [
    { label: "Eliminar registro", value: "Eliminar registro" },
    ];
  return (
    <div >
    <Header buttonText="Cerrar sesion" headerText="Panel de control" onClick={handleLogout}/>
    <body className="body">
      <div className="containerBase" style={{width:"80vw"}}>
          <div className="containerBase2">
            <ButtonIcon onClick={handleClick} marginL="1vw" marginT="1vw" text = "Crear registro"  w="24vw" h="6vh" img="reader-outline" onClick={createRecord}/>
            <ButtonIcon onClick={handleClick} marginL="1vw" marginT="1vw" text = "Gestionar registro"  w="24vw" h="6vh" img="settings-outline"/>
            <Button text = "Evaluar registro"  w="24vw" h="6vh" marginL="1vw" marginT="1vw"/>
          </div>
      </div>
      {isPopupOpen && (
            <PopUpDropdown button2="Seleccionar accion" button1="Ingrese el ID" textHeader="Gestionar usuarios" selectOptions={selectOptions} onClickHeader={handleClose} />
      )}
    </body>
  </div>
  )
}
