import React from "react";
import Header from "../../componente/Header";
import dataBaseExample from "../../img/dataBaseExample.jpeg";
import "./css/CalculatorScreen.css";
import Button from "../../componente/Button";
import ButtonType1 from "../../componente/ButtonType1";
import {useState, useEffect} from "react";
import axios from "axios";

export default function ControlPanelRuleManagement() {

  const [ruleValue, setRuleValue] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedColumn2, setSelectedColumn2] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [tableData, setTableData] = useState([]);
  const [rules, setRules] = useState([]);

  const baseUrl="http://localhost:8091";

  function handleColumnChange(event) {
    const selectedOption = event.target.value;
    setSelectedColumn(selectedOption);
    setRuleValue(prevValue => prevValue + selectedOption+' ');
  }

  function handleColumn2Change(event) {
    const selectedOption = event.target.value;
    setSelectedColumn2(selectedOption);
    setRuleValue(prevValue => prevValue + selectedOption+' ');
  }


  const handleClickOpeningBracket = () => {
    setRuleValue(prevValue => prevValue + '( ');
  };


  const handleClickFinalBracket = () => {
    setRuleValue(prevValue => prevValue + ') ');
  };

  const handleClickGreaterThan = () => {
    setRuleValue(prevValue => prevValue + 'MAYOR QUE ');
  };

  const handleClickLessThan = () => {
    setRuleValue(prevValue => prevValue + 'MENOR QUE ');
  };

  const handleClickEqualTo = () => {
    setRuleValue(prevValue => prevValue + 'IGUAL A ');
  };

  const handleClickDifferentFrom = () => {
    setRuleValue(prevValue => prevValue + 'DIFERENTE A ');
  };

  const handleClickTrue = () => {
    setRuleValue(prevValue => prevValue + 'VERDADERO ');
  };

  const handleClickFalse = () => {
    setRuleValue(prevValue => prevValue + 'FALSO ');
  };

  const handleClickAnd = () => {
    setRuleValue(prevValue => prevValue + 'Y ');
  };

  const handleClickOr = () => {
    setRuleValue(prevValue => prevValue + 'O ');
  };

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickInputValue = () => {
    setRuleValue(prevValue => prevValue + inputValue+' ');
  };

  const handleClickCleanAll = () => {
    setRuleValue('');
  };

  useEffect(()=>{
    const fetchTable = async () => {
      const response = await axios.get(
          baseUrl + "/table/table_data",
          { headers: { 
              "Access-Control-Allow-Origin":baseUrl,
              "MediaType":"application/json"
          } }
          );
      const responseData = response.data;
      setTableData(responseData);
    };
    fetchTable();

  const fetchRules = async () => {
    const response = await axios.get(
        baseUrl + "/rules",
        { headers: { 
            "Access-Control-Allow-Origin":baseUrl,
            "MediaType":"application/json"
        } }
        );
    const responseData = response.data;
    setRules(responseData);
  };
  fetchRules();

  }, []);

  return (
    <div>
        <Header buttonText="Cerrar sesión" headerText="Panel de control" />
      <div className="logicalContainer">
        <div className="imageContainer" style={{marginTop: "4vh", marginBottom: "5vh"}}>
            <img className="exampleBd" src={dataBaseExample} alt="" />
        </div>
        <div>
            <div className="resultContainer">
                    <input type="text" className="result" placeholder="Regla" value={ruleValue}disabled/>
                    <button className="result" style={{width: "4vw", marginLeft: "0.5vw"}} onClick={handleClickCleanAll}><ion-icon name="arrow-back-outline"></ion-icon></button>
                    <Button text="Guardar regla" w="12vw" h="6vh" marginL="0.6vw"/>
                    {/* <Button text="Gestionar regla" w="12vw" h="6vh" marginL="0.6vw" />*/}
            </div>

            <div className="operationsContainer">
                <select
                  className="form-control"
                  id="selectColumns"
                  name="columns"
                  value={selectedColumn} 
                  onChange={handleColumnChange}
                >
                    <option value="">Columna</option>
                    {tableData.columnNames.map((columnName, index) => (
                            <option key={index}>{columnName}</option>
                    ))}
                   
                    
                </select>
                <ButtonType1 marginL="2vw" marginT="2vh" text={<div>(</div>} onClick={handleClickOpeningBracket} w="10vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text={<div>)</div>} onClick={handleClickFinalBracket} w="10vw" h="15vh" />

                <ButtonType1 marginL="2vw" marginT="2vh" text="Mayor que" onClick={handleClickGreaterThan} w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Menor que" onClick={handleClickLessThan}w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Igual a" onClick={handleClickEqualTo} w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Diferente a" onClick={handleClickDifferentFrom} w="8vw" h="15vh" />
                <div className="logicalContainer">
                  <ButtonType1 marginL="2vw" marginT="2vh" text="Verdadero" onClick={handleClickTrue} w="8vw" h="6vh" />
                  <ButtonType1 marginL="2vw" marginT="2vh" text="Falso" onClick={handleClickFalse} w="8vw" h="6vh" />

                </div>


                <div className="logicalContainer">
                
                  <select
                    className="form-control"
                    id="selectColumns2"
                    name="columns2"
                    
                    value={selectedColumn2} 
                    onChange={handleColumn2Change}
                  >
                      <option value="">Columna</option>
                      {tableData.columnNames.map((columnName, index) => (
                            <option key={index}>{columnName}</option>
                    ))}
                  </select>
                  
                  <input type="text" className="" placeholder="Valor" value={inputValue}  onChange={handleInputValueChange}/>
                  <ButtonType1 marginL="2vw" marginT="2vh" text="Valor" onClick={handleClickInputValue} w="10vw" h="6vh" />
                </div>
                <div className="logicalContainer">
                <ButtonType1 marginL="2vw" marginT="2vh" text="Y" onClick={handleClickAnd} w="10vw" h="6vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="O" onClick={handleClickOr} w="10vw" h="6vh" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
