import React, {useState, useEffect} from 'react'
import Header from "../../componente/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/ControlPanelRecord.css";
import ButtonIcon from "../../componente/ButtonIcon";
import Button from "../../componente/Button";
import PopUpDropdown from "../../componente/PopUpDropdown";
import PopUpEvaluateRule from "../../componente/PopUpEvaluateRule";

const baseUrl = "http://localhost:8091"

function ControlePanelRecordManagement() {

  const [rules, setRules] = useState([]);
  const [records, setRecords] = useState([]);

  const [optionRecords, setOptionRecords] = useState([]);
  const [optionRules, setOptionRules] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState("");
  const [record, setRecord] = useState("");
  const [ruleSelected, setRuleSelected] = useState("");

  const navigation = useNavigate();

  useEffect(() => {

    async function getData() {

      const resultRules = await getRules();
      setRules(resultRules);

      const resultRecords = await getRecords();
      setRecords(resultRecords);
    }

    getData();
    
    const allRules = rules.map(rule => ({
      label: rule.ruleName,
      value: rule.ruleName
    }));

    const allRecords = records.map(record => ({
      label: record.record_id,
      value: record.record_id
    }));

    setOptionRecords(allRecords);
    setOptionRules(allRules);

  }, [rules, records]);

  const handleLogout = async (event) => {
    event.preventDefault();
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
      const response = await axios.get(baseUrl + "/rules/evaluate/"+record+"/"+ruleSelected,
        {
          headers:{
            "Access-Control-Allow-Origin": baseUrl,
            "MediaType" : "application/json",
          }
        }
      );

      if (response.status === 200) {
        alert("El resultado de evaluar el registro con id "+record+" con la regla "+ruleSelected+" es: "+eval(response.data));
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

  return (
    <div >
    <Header buttonText="Cerrar sesion" headerText="Panel de control" onClick={handleLogout}/>
    <body className="body">
      <div className="containerBase" style={{width:"80vw"}}>
          <div className="containerBase2">
            <ButtonIcon onClick={handleCreateRecord} marginL="1vw" marginT="1vw" text = "Crear registro"  w="24vw" h="6vh" img="reader-outline"/>
            <ButtonIcon onClick={handleOpenRecordManagement} marginL="1vw" marginT="1vw" text = "Gestionar registro"  w="24vw" h="6vh" img="settings-outline"/>
            <Button text = "Evaluar registro"  w="24vw" h="6vh" marginL="1vw" marginT="1vw" onClick={handleOpenEvaluateRule}/>
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

  const rules = await axios.get(
    baseUrl+"/rules",
    {
      headers:{
        "Access-Control-Allow-Origin": baseUrl,
        "MediaType" : "application/json",
      }
    }
  )

  return rules.data;
}

async function getRecords(){

  const records = await axios.get(
    baseUrl+"/table/table_data",
    {
      headers:{
        "Access-Control-Allow-Origin": baseUrl,
        "MediaType" : "application/json",
      }
    }
  )

  return records.data.records;
}

export default ControlePanelRecordManagement;