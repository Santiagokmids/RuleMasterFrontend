import React from "react";
import Header from "../../componente/Header";

import ButtonIcon from "../../componente/ButtonIcon";
import Button from "../../componente/Button";
import "./css/PanelControl.css";
import { useNavigate } from "react-router-dom";

export default function ControlPanelRuleManagement() {
  const navigation = useNavigate();
  const handleLogout = async (event) => {
    event.preventDefault();
    navigation("/login");
  };
  return (
    <div >
    <Header buttonText="Cerrar sesion" headerText="Panel de control" onClick={handleLogout} />
    <body className="body">
      <div className="containerBase" style={{width:"80vw"}}>
          <div className="containerBase2">
            <ButtonIcon marginL="1vw" marginT="1vw" text = "Gestionar Columnas"  w="36vw" h="6vh" img="reader-outline"/>
            <Button text = "Agregar Columnas"  w="36vw" h="6vh" marginL="1vw" marginT="1vw"/>

            

          </div>
      </div>
    </body>
  </div>
  )
}
