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
  const [selectedColumnType, setSelectedColumnType] = useState('');
  const [selectedColumn2, setSelectedColumn2] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [tableData, setTableData] = useState([]);
  const [rules, setRules] = useState([]);


  const regexRulePattern= /^\(\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s((Y|O)\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s){0,3}\)\s((Y|O)\s\(\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s((Y|O)\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9]+\s){0,3}\)\s){0,3}$/i;

  const [openingBracket, setOpeningBracket] = useState(true);
  const [finalBracket, setFinalBracket] = useState(false);
  const [greaterThan, setGreaterThan] = useState(false)
  const [lessThan, setLessThan] = useState(false)
  const [equalTo, setEqualTo] = useState(false)
  const [differentFrom, setDifferentFrom] = useState(false)
  const [buttonAnd, setButtonAnd] = useState(false)
  const [buttonOr, setButtonOr] = useState(false)
  const [buttonTrue, setButtonTrue] = useState(false)
  const [buttonFalse, setButtonFalse] = useState(false)
  const [opColumn1, setOpColumn1] = useState(false)
  const [opColumn2, setOpColumn2] = useState(false)
  const [inputEnable, setInputEnable] = useState(false)

  const baseUrl="http://localhost:8091";

  function handleColumnChange(event) {
    const { value, selectedIndex } = event.target;
    setSelectedColumn(value);
    setRuleValue(prevValue => prevValue + value+' ');

    setOpColumn1(false);

    if(tableData.columnTypes[selectedIndex] === "numeric"){
      setSelectedColumnType("numeric");
      setGreaterThan(true);
      setLessThan(true);
      setEqualTo(true);
    }

    if(tableData.columnTypes[selectedIndex] === "varchar" ){
      setSelectedColumnType("varchar");
      setEqualTo(true);
      setDifferentFrom(true);
    }

    if(tableData.columnTypes[selectedIndex] === "boolean"){
      setSelectedColumnType("boolean");
      setEqualTo(true);
      setDifferentFrom(true);
    }

    setSelectedColumn('');

  }

  function handleColumn2Change(event) {
    const selectedOption = event.target.value;
    setSelectedColumn2(selectedOption);
    setRuleValue(prevValue => prevValue + selectedOption+' ');

    setOpColumn2(false);
    setButtonTrue(false);
    setButtonFalse(false);
    setInputEnable(false);
    setButtonAnd(true);
    setButtonOr(true);
    setFinalBracket(true);

    setSelectedColumn2('');
  }


  const handleClickOpeningBracket = () => {
    setRuleValue(prevValue => prevValue + '( ');
    setOpColumn1(true);
    setOpeningBracket(false);
  };


  const handleClickFinalBracket = () => {
    setRuleValue(prevValue => prevValue + ') ');

   
    setFinalBracket(false);
    setButtonAnd(true);
    setButtonOr(true);

  };

  const handleClickGreaterThan = () => {
    setRuleValue(prevValue => prevValue + 'MAYOR QUE ');

    
      setGreaterThan(false);
      setEqualTo(false);
      setGreaterThan(false);
      setLessThan(false);
      setDifferentFrom(false);

      setOpColumn2(true);
      setInputEnable(true);
         
  };

  const handleClickLessThan = () => {
    setRuleValue(prevValue => prevValue + 'MENOR QUE ');

    setLessThan(false);
    setEqualTo(false);
    setGreaterThan(false);
    setLessThan(false);
    setDifferentFrom(false);

    setOpColumn2(true);
    setInputEnable(true);
  };

  const handleClickEqualTo = () => {
    setRuleValue(prevValue => prevValue + 'IGUAL A ');
    setEqualTo(false);
    setGreaterThan(false);
    setLessThan(false);
    setDifferentFrom(false);

    if(selectedColumnType === "numeric" || selectedColumnType === "varchar"){
      setOpColumn2(true);
      setInputEnable(true);
    }

    if(selectedColumnType === "boolean"){
      setOpColumn2(true);
      setButtonTrue(true);
      setButtonFalse(true);
    }
  };

  const handleClickDifferentFrom = () => {
    setRuleValue(prevValue => prevValue + 'DIFERENTE A ');

    setEqualTo(false);
    setGreaterThan(false);
    setLessThan(false);
    setDifferentFrom(false);

    if(selectedColumnType === "varchar"){
      setOpColumn2(true);
      setInputEnable(true);
    }

    if(selectedColumnType === "boolean"){
      setOpColumn2(true);
      setButtonTrue(true);
      setButtonFalse(true);
    }
  };

  const handleClickTrue = () => {
    setRuleValue(prevValue => prevValue + 'VERDADERO ');

    setOpColumn2(false);
    setButtonTrue(false);
    setButtonFalse(false);
    setInputEnable(false);
    setButtonAnd(true);
    setButtonOr(true);
    setFinalBracket(true);
  };

  const handleClickFalse = () => {
    setRuleValue(prevValue => prevValue + 'FALSO ');

    setOpColumn2(false);
    setButtonTrue(false);
    setButtonFalse(false);
    setInputEnable(false);
    setButtonAnd(true);
    setButtonOr(true);
    setFinalBracket(true);
  };

  const handleClickAnd = () => {
    setRuleValue(prevValue => prevValue + 'Y ');

    if(!finalBracket){
      setOpeningBracket(true);
    }else{
      setOpColumn1(true);
    }
    setButtonAnd(false);
    setButtonOr(false);
    setFinalBracket(false);
    
  };

  const handleClickOr = () => {
    setRuleValue(prevValue => prevValue + 'O ');

    if(!finalBracket){
      setOpeningBracket(true);
    }else{
      setOpColumn1(true);
    }

    setButtonAnd(false);
    setButtonOr(false);
    setFinalBracket(false);

  };

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);

   
  };

  const handleClickInputValue = () => {
    setRuleValue(prevValue => prevValue + inputValue+' ');

    setOpColumn2(false);
    setButtonTrue(false);
    setButtonFalse(false);
    setInputEnable(false);
    setButtonAnd(true);
    setButtonOr(true);
    setFinalBracket(true);

    setInputValue("");
  };

  const handleClickCleanAll = () => {
    setRuleValue('');

    setOpeningBracket(true);
    setOpColumn1(false);
    setOpColumn2(false);
    setButtonTrue(false);
    setButtonFalse(false);
    setInputEnable(false);
    setButtonAnd(false);
    setButtonOr(false);
    setFinalBracket(false);
    setGreaterThan(false);
    setLessThan(false);
    setEqualTo(false);
    setDifferentFrom(false);

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
                  disabled={!opColumn1}
                >
                    <option value="">Columna</option>
                    {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                         columnName !== "record_id"  && <option key={index}>{columnName}</option>
                    ))}
                   
                    
                </select>
                <ButtonType1 marginL="2vw" marginT="2vh" text={<div>(</div>} onClick={handleClickOpeningBracket} disabled={!openingBracket} w="10vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text={<div>)</div>} onClick={handleClickFinalBracket} disabled={!finalBracket} w="10vw" h="15vh" />

                <ButtonType1 marginL="2vw" marginT="2vh" text="Mayor que" onClick={handleClickGreaterThan} disabled={!greaterThan} w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Menor que" onClick={handleClickLessThan} disabled={!lessThan} w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Igual a" onClick={handleClickEqualTo} disabled={!equalTo} w="8vw" h="15vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="Diferente a" onClick={handleClickDifferentFrom} disabled={!differentFrom} w="8vw" h="15vh" />
                <div className="logicalContainer">
                  <ButtonType1 marginL="2vw" marginT="2vh" text="Verdadero" onClick={handleClickTrue} disabled={!buttonTrue} w="8vw" h="6vh" />
                  <ButtonType1 marginL="2vw" marginT="2vh" text="Falso" onClick={handleClickFalse} disabled={!buttonFalse} w="8vw" h="6vh" />

                </div>


                <div className="logicalContainer">
                
                  <select
                    className="form-control"
                    id="selectColumns2"
                    name="columns2"
                    
                    value={selectedColumn2} 
                    onChange={handleColumn2Change}
                    disabled={!opColumn2}
                  >
                      <option value="">Columna</option>
                      {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                           columnName !== "record_id" && tableData.columnTypes[index]===selectedColumnType &&  <option key={index}>{columnName}</option>
                    ))}
                  </select>
                  
                  <input type="text" className="" placeholder="Valor" value={inputValue}  onChange={handleInputValueChange} disabled={!inputEnable}/>
                  <ButtonType1 marginL="2vw" marginT="2vh" text="Valor" onClick={handleClickInputValue} disabled={!inputEnable} w="10vw" h="6vh" />
                </div>
                <div className="logicalContainer">
                <ButtonType1 marginL="2vw" marginT="2vh" text="Y" onClick={handleClickAnd} disabled={!buttonAnd} w="10vw" h="6vh" />
                <ButtonType1 marginL="2vw" marginT="2vh" text="O" onClick={handleClickOr} disabled={!buttonOr} w="10vw" h="6vh" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
