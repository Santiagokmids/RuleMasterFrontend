import React from "react";
import Header from "../../componente/Header";
import dataBaseExample from "../../img/dataBaseExample.jpeg";
import "./css/CalculatorScreen.css";
import Button from "../../componente/Button";
import ButtonType1 from "../../componente/ButtonType1";

export default function Calculator() {
  return (
    <div>
      <div>
        <Header buttonText="Cerrar sesión" headerText="Panel de control" />
      </div>

      <div className="imageContainer">
        <img className="exampleBd" src={dataBaseExample} alt="" />
      </div>

      <div className="resultContainer">
        <div className="result"></div>
        <Button text="back" w="5vw" h="6vh" />
        <Button text="Guardar regla" w="12vw" h="6vh" />
        <Button text="Gestionar regla" w="12vw" h="6vh" />
      </div>

      <div className="operationsContainer">
        <div>
          <ButtonType1 text="Nueva Expresión" w="10vw" h="15vh" />
        </div>
        <div className="logicalContainer">
          <ButtonType1 text="And" w="10vw" h="6vh" />
          <ButtonType1 text="Or" w="10vw" h="6vh" />
        </div>
        <div>
          <ButtonType1 text="Mayor que" w="5vw" h="15vh" />
        </div>
        <div>
          <ButtonType1 text="Menor que" w="5vw" h="15vh" />
        </div>
        <div>
          <ButtonType1 text="igual a" w="5vw" h="15vh" />
        </div>
        <div>
          <ButtonType1 text="diferente" w="5vw" h="15vh" />
        </div>
        <div className="logicalContainer">
          <ButtonType1 text="True" w="10vw" h="6vh" />
          <ButtonType1 text="False" w="10vw" h="6vh" />
        </div>
      </div>
    </div>
  );
}
