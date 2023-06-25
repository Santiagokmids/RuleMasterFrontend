import React from "react";
import Header from "../../componente/Header";

import "./css/ControlPanel.css";
import ButtonIcon from "../../componente/ButtonIcon";
import IconTextInput from "../../componente/IconTextInput";


export default function ControlPanelAdmin() {
  return (
    <div >
      <Header buttonText="Cerrar sesion" headerText="Panel de control" />
      <body className="body">
        <div className="containerBase" style={{width:"80vw"}}>
            <div className="containerBase2">
              <IconTextInput margin="1vw" w="24vw" h="6vh" type = "text" placeholder = "Buscar Usuario" icon = "search-outline" />
              <ButtonIcon margin="1vw" text = "Gestionar Usuario"  w="24vw" h="6vh" img="person-outline"/>
              <ButtonIcon margin="1vw" text = "Crear usuario"  w="24vw" h="6vh" img="person-add-outline"/>
              

            </div>
        </div>
      </body>
    </div>
  )
}
