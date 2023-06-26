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
              <IconTextInput marginT="1.5vw" w="24vw" h="6vh" type = "text" placeholder = "Buscar Usuario" icon = "search-outline" />
              <ButtonIcon marginT="1.5vw" marginL="1vw" text = "Gestionar Usuario"  w="24vw" h="10vh" img="person-outline"/>
              <ButtonIcon marginT="1.5vw" marginL="1vw"text = "Crear usuario"  w="24vw" h="6vh" img="person-add-outline"/>
              

            </div>
        </div>
      </body>
    </div>
  )
}
