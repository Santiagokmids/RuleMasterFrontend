import React from "react";
import Header from "../../componente/Header";
import dataBaseExample from "../../img/dataBaseExample.jpeg";
import "./css/CalculatorScreen.css";
import Button from "../../componente/Button";
import ButtonType1 from "../../componente/ButtonType1";

export default function ControlPanelRuleManagement() {
  return (
    <div>
        <Header buttonText="Cerrar sesión" headerText="Panel de control" />
      <div className="logicalContainer">
        <div className="imageContainer" style={{marginTop: "4vh", marginBottom: "5vh"}}>
            <img className="exampleBd" src={dataBaseExample} alt="" />
        </div>
        <div>
            <div className="resultContainer">
                <div className="result"></div>
                    <button className="result" style={{width: "4vw", marginLeft: "0.5vw"}}><ion-icon name="arrow-back-outline"></ion-icon></button>
                    <Button text="Guardar regla" w="12vw" h="6vh" marginL="0.6vw"/>
                    <Button text="Gestionar regla" w="12vw" h="6vh" marginL="0.6vw" />
            </div>

            <div className="operationsContainer">
                <ButtonType1 marginL="2vw" marginT="2vh" text={<div>Nueva<br />Expresión</div>} w="10vw" h="15vh" />
                <div className="logicalContainer">
                <ButtonType1 marginL="2vw" marginT="2vh" text="And" w="10vw" h="6vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Or" w="10vw" h="6vh" />
                </div>
                <ButtonType1 marginL="2vw" marginT="2vh" text="Mayor que" w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Menor que" w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Igual a" w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Diferente" w="8vw" h="15vh" />
                <div className="logicalContainer">
                <ButtonType1 marginL="2vw" marginT="2vh" text="True" w="8vw" h="6vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="False" w="8vw" h="6vh" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
