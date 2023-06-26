import React from 'react'
import Header from "../../componente/Header";

import "./css/ControlPanelRecord.css";
import ButtonIcon from "../../componente/ButtonIcon";
import Button from "../../componente/Button";


export default function ControlePanelRecordManagement() {
  return (
    <div >
    <Header buttonText="Cerrar sesion" headerText="Panel de control" />
    <body className="body">
      <div className="containerBase" style={{width:"80vw"}}>
          <div className="containerBase2">
            <ButtonIcon marginL="1vw" marginT="1vw" text = "Crear registro"  w="24vw" h="6vh" img="reader-outline"/>
            <ButtonIcon marginL="1vw" marginT="1vw" text = "Gestionar registro"  w="24vw" h="6vh" img="settings-outline"/>
            <Button text = "Evaluar registro"  w="24vw" h="6vh" marginL="1vw" marginT="1vw"/>

            

          </div>
      </div>
    </body>
  </div>
  )
}
