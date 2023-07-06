import React from 'react'
import "./css/AddRule.css"
import Header from "../../componente/Header";
import FormInput from "../../componente/FormInput";
import Button from "../../componente/Button";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";


export default function AddRecord() {

  const [tableData, setTableData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  

  const baseUrl = "http://3.142.245.159:8091"  const navigation = useNavigate();

  const record = {
    
      record_id:null
 
  };

  
  useEffect(() => {
   
    if(localStorage.getItem("jwt")){
      const user = localStorage.getItem("currentRole");

      if(user){
        setCurrentUser(user);
      }

      const fetchTable = async () => {
        var token=localStorage.getItem("jwt");
        const response = await axios.get(
            baseUrl + "/table/table_data",
            { headers: { 
                "Access-Control-Allow-Origin":baseUrl,
                "MediaType":"application/json",
                Authorization: `Bearer ${token}` 
            } }
            );
        const responseData = response.data;
        setTableData(responseData);
  
      };
      fetchTable();
    }else{
      navigation("/NotFound");
    }

    
  }, []);

  useEffect(() => {
    if (tableData && tableData.columnNames) {
      tableData.columnNames.forEach((col,index) => {
        if (col !== "record_id") {
          if(tableData.columnTypes[index] === "bool"){
            record[col] = false;
          }else{
            record[col] = null;
          }
          
        }
      });
    }
  }, [tableData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
      try{
        var token=localStorage.getItem("jwt");
        const response = await axios.post(baseUrl + "/table/addRecord",
          {
            tableName:"table_data",
            record:record
          },
          {
            headers:{
              "Access-Control-Allow-Origin": baseUrl,
              "MediaType" : "application/json",
              Authorization: `Bearer ${token}` 
            }
          }
        );
  
          alert("El registro fue creado con exito");
          window.location.reload();          
        
      }
      catch (error) {
        alert("No se pudo crear el registro. "+error.response.data.details[0].errorMessage)
      } 
  }

  const returnBack = async (event) => {
    event.preventDefault();
    navigation("/recordManagement");
  };

  if(currentUser !== "Gestor_de_registros"){
    navigation("/NotFound");
  }

  return (
    <div >
      <Header buttonText="Regresar" headerText="Crear un registro" onClick={returnBack} />
      <body className="body">
        <div className="containerBase">
          <h1 className="mainTitle">Datos del registro</h1>
        
          {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                         columnName !== "record_id"  &&(
                         tableData.columnTypes[index] === "numeric" ?
                            <FormInput type="number" placeholder={columnName} h="5vh" w="34vw" fontsize="1.2rem" value={record[columnName]} onChange={newVal =>record[columnName]=parseFloat(newVal) }/> : 

                        tableData.columnTypes[index] === "varchar"  ? 
                             <FormInput type="text" placeholder={columnName} h="5vh" w="34vw" fontsize="1.2rem" value={record[columnName]} onChange={newVal =>record[columnName]=newVal }/> : 
                        tableData.columnTypes[index] === "bool"  ?
                          <div  className="form-check">
                              <input className="form-check-input" type="checkbox" checked={record[columnName]} onChange={event=>{record[columnName]=event.target.checked}}  />
                              <label className="form-check-label formInput" style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: "1.2rem"}}>
                                {columnName}
                              </label> 
                            </div>: 
                        
                       tableData.columnTypes[index])
                         
          ))}
                    
          <div className="formComponent">
            <Button h="5vh" w="34vw" text="Confirmar" onClick={handleSubmit}/> 
          </div>
        </div>
      </body>
    </div>
  )
}
