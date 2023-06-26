import React from 'react'
import "./css/AddRule.css"
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";
import Button from "../../componente/Button";

export default function AddRule() {
  return (
    <div >
      <Header buttonText="Regresar" headerText="Crear un registro" />
      <body className="body">
        <div className="containerBase">
          <h1 className="mainTitle">Datos del registro</h1>
          <FormInput type="text" placeholder="Column 1" h="5vh" w="34vw"/>
          <FormInput type="text" placeholder="Column 2" h="5vh" w="34vw"/>
          <FormInput type="text" placeholder="Column 3" h="5vh" w="34vw"/>
          <FormInput type="text" placeholder="Column 4" h="5vh" w="34vw"/>

          
          <div className="formComponent">
            <Button h="5vh" w="34vw" text="Confirmar" /> 
          </div>
        </div>
      </body>
    </div>
  )
}
