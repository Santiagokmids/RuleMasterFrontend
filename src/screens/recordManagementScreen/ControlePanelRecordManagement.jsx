import React, {useState, useEffect} from 'react'
import Header from "../../componente/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/ControlPanelRecord.css";
import ButtonIcon from "../../componente/ButtonIcon";
import Button from "../../componente/Button";
import PopUpDropdown from "../../componente/PopUpDropdown";
import PopUpEvaluateRule from "../../componente/PopUpEvaluateRule";

const baseUrl = "http://192.168.0.139:8091"

function ControlePanelRecordManagement() {
  const [tableData, setTableData] = useState([]);

  const baseUrl = "http://192.168.0.139:8091";

  const [rules, setRules] = useState([]);
  const [records, setRecords] = useState([]);

  const [optionRecords, setOptionRecords] = useState([]);
  const [optionRules, setOptionRules] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState("");
  const [record, setRecord] = useState("");
  const [ruleSelected, setRuleSelected] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  const navigation = useNavigate();

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
          {
            headers: {
              "Access-Control-Allow-Origin": baseUrl,
              "MediaType": "application/json",
              Authorization: `Bearer ${token}` 
            }
          }
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
   
    if(localStorage.getItem("jwt")){
      const user = localStorage.getItem("currentRole");

      if(user){
        setCurrentUser(user);
      }

      async function getData() {
        const resultRules = await getRules();
        setRules(resultRules);
    
        const resultRecords = await getRecords();
        setRecords(resultRecords);
    
        const allRules = resultRules.map(rule => ({
          label: rule.ruleName,
          value: rule.ruleName
        }));
    
        const allRecords = resultRecords.map(record => ({
          label: record.record_id,
          value: record.record_id
        }));
    
        setOptionRecords(allRecords);
        setOptionRules(allRules);
      }
    
      getData();
      
    }else{
      navigation("/NotFound");
    }

    
  
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.setItem("logged_user", JSON.stringify(false))
    localStorage.removeItem('currentRole');
    navigation("/login");
  };

  const handleCreateRecord = async (event) => {
    event.preventDefault();
    navigation("/createRecord");
  };

  const handleOpenRecordManagement = async (event) => {
    event.preventDefault();
    setPopupOpen(0);
  };

  const handleOpenEvaluateRule = async (event) => {
    event.preventDefault();
    setPopupOpen(1);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const handleEvaluateRule = async (event) => {
    event.preventDefault();
    
    try{
      var token=localStorage.getItem("jwt");
      const response = await axios.get(baseUrl + "/rules/evaluate/"+record+"/"+ruleSelected,
        {
          headers:{
            "Access-Control-Allow-Origin": baseUrl,
            "MediaType" : "application/json",
            Authorization: `Bearer ${token}` 
          }
        }
      );

      if (response.status === 200) {
        var result = "";

        if(eval(response.data)){
          result = "verdadero";  

        }else{
          result = "falso";
        }

        alert("El resultado de evaluar el registro "+record+" con la regla "+ruleSelected+" es: "+result);
        handleClose();
      }
    }
    catch (error) {
      console.log(error)
      alert("No se pudo evaluar la regla. "+error.response.data.details[0].errorMessage)
    } 
  };

  const selectOptions = [
    { label: "Eliminar registro", value: "Eliminar registro" },
  ];

  if(currentUser !== "Gestor_de_registros"){
    navigation("/NotFound");
  }

  return (
    <div >
    <Header buttonText="Cerrar sesion" headerText="Panel de control" onClick={handleLogout}/>
    <body className="body">
      <div className="containerBase" style={{width:"80vw"}}>
          <div className="containerBase2">
            <ButtonIcon onClick={handleCreateRecord} marginL="1vw" marginT="1vw" text = "Crear registro"  w="24vw" h="6vh" img="reader-outline"/>
            <ButtonIcon onClick={handleOpenRecordManagement} marginL="1vw" marginT="1vw" text = "Gestionar registro"  w="24vw" h="6vh" img="settings-outline"/>
            <Button text = "Evaluar registro con regla"  w="24vw" h="6vh" marginL="1vw" marginT="1vw" onClick={handleOpenEvaluateRule}/>
          </div>
          <br />
          <p className="h2">Registros</p>

          <div className="table-responsive" style={{ maxWidth: "95%", maxHeight: "28rem", overflow: "auto", marginTop: "20px" }}>
            <div style={{ minWidth: "100%" }}>
              <table className="table table-bordered border-dark" style={{ tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ minWidth: "10rem" }} />
                  {tableData.columnNames &&
                    tableData.columnNames.map((columnName, index) => (
                      columnName !== "record_id" && <col key={index} style={{ minWidth: "10rem" }} />
                    ))}
                </colgroup>
                <thead>
                  <tr>
                    <th key="id" scope="col">ID</th>
                    {tableData.columnNames &&
                      tableData.columnNames.map((columnName, index) => (
                        columnName !== "record_id" && (
                          <th key={index}>{columnName} -
                            {tableData.columnTypes[index] === "numeric"
                              ? " numerica"
                              : tableData.columnTypes[index] === "varchar"
                                ? " texto"
                                : tableData.columnTypes[index] === "bool"
                                  ? " boolean"
                                  : tableData.columnTypes[index]}
                          </th>
                        )
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.records &&
                    tableData.records.map((record, recordIndex) => (
                      <tr key={recordIndex}>
                        <td>{record.record_id}</td>
                        {Object.keys(record).map((key) => (
                          key !== "record_id" && 
                          <td key={key}>
                            {typeof record[key] === 'boolean' ? (
                              record[key] ? 'Verdadero' : 'Falso'
                            ) : (
                              record[key]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>
      {isPopupOpen === 0 && (
            <PopUpDropdown button2="Seleccionar accion" button1="Ingrese el ID" textHeader="Gestionar usuarios" selectOptions={selectOptions} onClickHeader={handleClose} />
      )}

      {isPopupOpen === 1 && (
            <PopUpEvaluateRule button2="Seleccionar regla" button1="Ingrese el ID del registro" textHeader="Evaluar regla" selectRules={optionRules}
              selectRecords={optionRecords}
              onClickHeader={handleClose}
              idValue={record}
              idValueToSet={setRecord}
              value={ruleSelected}
              valueToSet={setRuleSelected}
              onButton={handleEvaluateRule}
            />
      )}
    </body>
  </div>
  )
}

async function getRules(){
  var token=localStorage.getItem("jwt");
  const rules = await axios.get(
    baseUrl+"/rules",
    {
      headers:{
        "Access-Control-Allow-Origin": baseUrl,
        "MediaType" : "application/json",
        Authorization: `Bearer ${token}` 
      }
    }
  )

  return rules.data;
}

async function getRecords(){
  var token=localStorage.getItem("jwt");
  const records = await axios.get(
    baseUrl+"/table/table_data",
    {
      headers:{
        "Access-Control-Allow-Origin": baseUrl,
        "MediaType" : "application/json",
        Authorization: `Bearer ${token}` 
      }
    }
  )

  return records.data.records;
}

export default ControlePanelRecordManagement;