import React from 'react'
import "./css/AddColumn.css"
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";
import Button from "../../componente/Button";
import Dropdown from "../../componente/Dropdown";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

export default function AddColumn() {

  const backUrl = process.env.BACK_END_URL;

  const baseUrl = "http://"+backUrl+":8091"

  const [name, setName] = useState("");

  const [colType, setColType] = useState("");

  const navigation = useNavigate();

  const [currentUser, setCurrentUser] = useState("");

  const selectOptions = [
    { label: "Texto", value: "varchar" },
    { label: "Numerica", value: "numeric" },
    { label: "Booleana", value: "boolean" }
  ];
  
  useEffect(() => {
    if(localStorage.getItem("jwt")){
      const user = localStorage.getItem("currentRole");

      if(user){
        setCurrentUser(user);
      }

    }else{
      navigation("/NotFound");
    }
       
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
      try{
        var token=localStorage.getItem("jwt");
        const response = await axios.post(baseUrl + "/table/addColumn",
          {
            tableName:"table_data",
            columnName:name,
            columnType:colType
          },
          {
            headers:{
              "Access-Control-Allow-Origin": baseUrl,
              "MediaType" : "application/json",
              Authorization: `Bearer ${token}` 
            }
          }
        );
  
          alert("La columna fue agregada con exito");
          window.location.reload();          
        
      }
      catch (error) {
        alert("No se pudo agregar la columna. "+error.response.data.details[0].errorMessage)
      } 
  }

  const returnBack = async (event) => {
    event.preventDefault();
    navigation("/attributeManagement");
  };

  if(currentUser !== "Gestor_de_columnas"){
    navigation("/NotFound");
  }

  return (
    <div >
      <Header buttonText="Regresar" headerText="Agregar Columna" onClick={returnBack} />
      <body className="body">
        <div className="containerBase">
          <h1 className="mainTitle">Datos de columna</h1>
          <FormInput type="text" placeholder="Nombre" h="5vh" w="34vw" fontsize="1.2rem" value={name} onChange={newName => setName(newName)}/> 
          <Dropdown selectOptions={selectOptions} h="6vh" w="35vw" t="4vh" optionD="Tipo" fontsize="1.2rem" value={colType} onChange={newType => setColType(newType)} />                
          <div className="formComponent">
            <Button h="5vh" w="34vw" text="Confirmar" onClick={handleSubmit} /> 
          </div>
        </div>
      </body>
    </div>
  )
}
