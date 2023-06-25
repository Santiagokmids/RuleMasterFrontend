import React from "react";
import Header from "../../componente/Header";

import "./css/ControlPanel.css";
import addUser from "../../img/addUser.png";
import ButtonIcon from "../../componente/ButtonIcon";


export default function ControlPanelAdmin() {
  return (
    <div >
      <Header buttonText="Cerrar sesion" headerText="Panel de control" />
      <body className="body">
        <div className="containerBase" style={{width:"80vw"}}>
            <ButtonIcon w="30vw" h="5vh" img={addUser} />
        </div>
      </body>
    </div>
  )
}
