import React from "react";
import Header from "../../componente/Header";
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


  const regexRulePattern= /^\(\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s((Y|O)\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s){0,3}\)\s((Y|O)\s\(\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s((Y|O)\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s){0,3}\)\s){0,3}$/i;


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

  
  const saveRule = async () => {
   console.log(ruleValue)
    const valid=regexRulePattern.test(ruleValue);
    if(valid){
      alert("Nice")
    }else{
      alert("No :c")
    }

  };

  return (
    <div>
        <Header buttonText="Cerrar sesión" headerText="Panel de control" />
      <div className="logicalContainer">
        <div >
            <h3>Datos</h3>
            <table className="">
              <thead>
                <tr>
                  <th  key="id" className="">ID</th>
                  {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                   columnName !== "record_id" && <th  key={index} className="">
                      {columnName} - 
                      {tableData.columnTypes[index] === "numeric" ? " numerica" : 
                       tableData.columnTypes[index] === "varchar"  ? " texto": 
                        tableData.columnTypes[index] === "boolean"  ? " bool": 
                       tableData.columnTypes[index]}
                    </th>
                    
                  ))}
                </tr>
              </thead>
              <tbody>
              {tableData.records && tableData.records.map((record, recordIndex) => (
              <tr key={recordIndex}>
                <td>{record.record_id}</td>
                {Object.keys(record).map((key) => (
                  key !== "record_id" && <td key={key}>{record[key]}</td>
                ))}
              </tr>
            ))}
              </tbody>
          </table>
        </div>


        <div>
          <h3>Reglas</h3>
          <table className="">
            <thead>
                <tr>
                <th >Nombre </th>
                <th >Regla</th>
                </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => (
                <tr key={index}>
                  <td>{rule.ruleName}</td>
                  <td>{rule.ruleDefinition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
            <div className="resultContainer">
                    <input type="text" className="result" placeholder="Regla" value={ruleValue} disabled/>
                    <button className="result" style={{width: "4vw", marginLeft: "0.5vw"}} onClick={handleClickCleanAll}><ion-icon name="arrow-back-outline"></ion-icon></button>
                    <Button text="Guardar regla" w="12vw" h="6vh" marginL="0.6vw" onClick={saveRule}/>
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
                    {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                         columnName !== "record_id"  && <option key={index}>{columnName}</option>
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
                      {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                           columnName !== "record_id"  &&  <option key={index}>{columnName}</option>
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
