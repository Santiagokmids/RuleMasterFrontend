import React from 'react'
import "./css/AddRule.css"
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";
import Button from "../../componente/Button";
import { useNavigate } from "react-router-dom";

export default function AddRecord() {
  const navigation = useNavigate();
  const returnBack = async (event) => {
    event.preventDefault();
    navigation("/recordManagement");
  };

  return (
    <div >
      <Header buttonText="Regresar" headerText="Crear un registro" onClick={returnBack} />
      <body className="body">
        <div className="containerBase">
          <h1 className="mainTitle">Datos del registro</h1>
          <FormInput type="text" placeholder="Column 1" h="5vh" w="34vw" fontsize="1.2rem"/>
          <FormInput type="text" placeholder="Column 2" h="5vh" w="34vw" fontsize="1.2rem"/>
          <FormInput type="text" placeholder="Column 3" h="5vh" w="34vw" fontsize="1.2rem"/>
          <FormInput type="text" placeholder="Column 4" h="5vh" w="34vw" fontsize="1.2rem"/>

          
          <div className="formComponent">
            <Button h="5vh" w="34vw" text="Confirmar" /> 
          </div>
        </div>
      </body>
    </div>
  )
}
