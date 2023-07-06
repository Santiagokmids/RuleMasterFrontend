import React from "react";
import Header from "../../componente/Header";
import "./css/CalculatorScreen.css";
import Button from "../../componente/Button";
import ButtonType1 from "../../componente/ButtonType1";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function ControlPanelRuleManagement() {

  const [ruleValue, setRuleValue] = useState('');
  const [ruleName, setRuleName] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedColumnType, setSelectedColumnType] = useState('');
  const [selectedColumn2, setSelectedColumn2] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [tableData, setTableData] = useState([]);
  const [rules, setRules] = useState([]);
  const [currentUser, setCurrentUser] = useState("");


  const regexRulePattern = /^\(\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9']+\s((Y|O)\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9']+\s){0,3}\)\s((Y|O)\s\(\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9']+\s((Y|O)\s[A-Za-z0-9]+\s(MAYOR QUE|MENOR QUE|IGUAL A|DIFERENTE A)\s[A-Za-z0-9']+\s){0,3}\)\s){0,3}$/i;
  const regexNumber = /^\d+(\.\d+)?$/;

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

  

  const baseUrl = "http://lb-rulemaster-1959678376.us-east-2.elb.amazonaws.com"

  const navigation = useNavigate();

  function handleColumnChange(event) {
    const { value, selectedIndex } = event.target;
    setSelectedColumn(value);
    setRuleValue(prevValue => prevValue + value + ' ');

    setOpColumn1(false);

    if (tableData.columnTypes[selectedIndex] === "numeric") {
      setSelectedColumnType("numeric");
      setGreaterThan(true);
      setLessThan(true);
      setEqualTo(true);
    }

    if (tableData.columnTypes[selectedIndex] === "varchar") {
      setSelectedColumnType("varchar");
      setEqualTo(true);
      setDifferentFrom(true);
    }

    if (tableData.columnTypes[selectedIndex] === "boolean") {
      setSelectedColumnType("boolean");
      setEqualTo(true);
      setDifferentFrom(true);
    }

    setSelectedColumn('');

  }

  function handleColumn2Change(event) {
    const selectedOption = event.target.value;
    setSelectedColumn2(selectedOption);
    setRuleValue(prevValue => prevValue + selectedOption + ' ');

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

    if (selectedColumnType === "numeric" || selectedColumnType === "varchar") {
      setOpColumn2(true);
      setInputEnable(true);
    }

    if (selectedColumnType === "boolean") {
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

    if (selectedColumnType === "varchar") {
      setOpColumn2(true);
      setInputEnable(true);
    }

    if (selectedColumnType === "boolean") {
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

    if (!finalBracket) {
      setOpeningBracket(true);
    } else {
      setOpColumn1(true);
    }
    setButtonAnd(false);
    setButtonOr(false);
    setFinalBracket(false);

  };

  const handleClickOr = () => {
    setRuleValue(prevValue => prevValue + 'O ');

    if (!finalBracket) {
      setOpeningBracket(true);
    } else {
      setOpColumn1(true);
    }

    setButtonAnd(false);
    setButtonOr(false);
    setFinalBracket(false);

  };

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);

  };
  const handleRuleNameChange = (event) => {
    setRuleName(event.target.value);
  };


  const handleClickInputValue = () => {
    var inputValueRule = inputValue.replace(/'/g, "");
    var valid = true;
    if (selectedColumnType === "varchar") {
      inputValueRule = "'" + inputValueRule + "'";
    }
    if (selectedColumnType === "numeric" && !regexNumber.test(inputValueRule)) {
      valid = false;
      alert("La columna se debe comparar con un numero");
    }

    if (valid) {
      setRuleValue(prevValue => prevValue + inputValueRule + ' ');

      setOpColumn2(false);
      setButtonTrue(false);
      setButtonFalse(false);
      setInputEnable(false);
      setButtonAnd(true);
      setButtonOr(true);
      setFinalBracket(true);

      setInputValue("");
    }


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
  
      const fetchRules = async () => {
        var token=localStorage.getItem("jwt");
        const response = await axios.get(
          baseUrl + "/rules",
          {
            headers: {
              "Access-Control-Allow-Origin": baseUrl,
              "MediaType": "application/json",
              Authorization: `Bearer ${token}` 
            }
          }
        );
        const responseData = response.data;
        setRules(responseData);
      };
      fetchRules();

    }else{
      navigation("/NotFound");
    }

    

  }, []);


  const saveRule = async () => {
    console.log(ruleValue)
    const valid = regexRulePattern.test(ruleValue);
    if (valid) {
      try {
        var token=localStorage.getItem("jwt");
        const response = await axios.post(
          baseUrl + "/rules",
          {
            ruleName: ruleName,
            ruleDefinition: ruleValue
          },
          {
            headers: {
              "Access-Control-Allow-Origin": baseUrl,
              "MediaType": "application/json",
              Authorization: `Bearer ${token}` 
            },
          }
        );
        alert("La regla se ha agregado correctamente")
        window.location.reload();
      } catch (error) {
        alert("La regla no se pudo agregar. " + error.response.data.details[0].errorMessage)
      }

    } else {
      alert("Solo se permiten maximo 4 expresiones dentro de un parentesis, y maximo 4 parentesis")
    }

  };

  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.setItem("logged_user", JSON.stringify(false))
    localStorage.removeItem('currentRole');
    navigation("/login");
  };

  if(currentUser !== "Gestor_de_reglas"){
    navigation("/NotFound");
  }

  return (
    <div>
      <Header buttonText="Cerrar sesión" headerText="Panel de control" onClick={handleLogout}/>
      <div className="logicalContainer">
        <br />
        <h3>Registros</h3>
        <div className="table-responsive" style={{ maxWidth: "95%", maxHeight: "20rem", overflow: "auto", marginTop: "20px" }}>
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



        <br/>
        <br/>
        <h3>Crear regla</h3>
        <br/>
        <div>
          <div className="resultContainer">
            <input type="text" className="inputAssign" placeholder="Nombre regla" value={ruleName} onChange={handleRuleNameChange} style={{ marginRight: "2vw", width: "15vw" }} />
            <input type="text" className="result" placeholder="Regla" value={ruleValue} disabled />
            <button className="result" style={{ width: "4vw", marginLeft: "0.5vw" }} onClick={handleClickCleanAll}><ion-icon name="arrow-back-outline"></ion-icon></button>
            <Button text="Guardar regla" w="12vw" h="6vh" marginL="0.6vw" onClick={saveRule} />
            {/* <Button text="Gestionar regla" w="12vw" h="6vh" marginL="0.6vw" />*/}
          </div>
          <div className="container2">

            <div className="operationsContainerColumn" style={{ width: "30vw" }}>
              Valores a comparar.
              <div style={{ width: "78%", marginTop: "10px", marginBottom: "10px" }} className="container2">
                <div className="logicalContainer">
                  <ButtonType1 marginL="1vw" marginT="2vh" text="Verdadero" onClick={handleClickTrue} disabled={!buttonTrue} w="7vw" h="6vh" />
                  <ButtonType1 marginL="1vw" marginT="2vh" text="Falso" onClick={handleClickFalse} disabled={!buttonFalse} w="7vw" h="6vh" />

                </div>
                <div className="logicalContainer">
                  <select
                    className="form-control"
                    id="selectColumns2"
                    name="columns2"

                    value={selectedColumn2}
                    onChange={handleColumn2Change}
                    disabled={!opColumn2}
                    style={{ marginTop: "2vh", width: "80%", marginBottom: "2vh" }}
                  >
                    <option value="">Columna</option>
                    {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                      columnName !== "record_id" && tableData.columnTypes[index] === selectedColumnType && <option key={index}>{columnName}</option>
                    ))}
                  </select>

                  <div className="container2" style={{ justifyContent: "center", width: "100%" }}>
                    <input style={{ width: "50%" }} type="text" className="inputAssign" placeholder="Valor" value={inputValue} onChange={handleInputValueChange} disabled={!inputEnable} />
                    <ButtonType1 marginL="5px" text="Ok" onClick={handleClickInputValue} disabled={!inputEnable} w="25%" h="6vh" />
                  </div>
                </div>
              </div>




            </div>

            <div className="operationsContainer" style={{ width: "60vw" }}>
              <select
                className="form-control"
                id="selectColumns"
                name="columns"
                value={selectedColumn}
                onChange={handleColumnChange}
                disabled={!opColumn1}
                style={{ width: "8vw", height: "6vh" }}
              >
                <option value="">Columna</option>
                {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                  columnName !== "record_id" && <option key={index}>{columnName}</option>
                ))}


              </select>

              <ButtonType1 marginL="1vw" marginT="2vh" text={<div>(</div>} onClick={handleClickOpeningBracket} disabled={!openingBracket} w="5vw" h="15vh" />
              <ButtonType1 marginL="1vw" marginT="2vh" text={<div>)</div>} onClick={handleClickFinalBracket} disabled={!finalBracket} w="5vw" h="15vh" />
              <ButtonType1 marginL="1vw" marginT="2vh" text="Mayor que" onClick={handleClickGreaterThan} disabled={!greaterThan} w="7vw" h="15vh" />
              <ButtonType1 marginL="1vw" marginT="2vh" text="Menor que" onClick={handleClickLessThan} disabled={!lessThan} w="7vw" h="15vh" />
              <ButtonType1 marginL="1vw" marginT="2vh" text="Igual a" onClick={handleClickEqualTo} disabled={!equalTo} w="7vw" h="15vh" />
              <ButtonType1 marginL="1vw" marginT="2vh" text="Diferente a" onClick={handleClickDifferentFrom} disabled={!differentFrom} w="7vw" h="15vh" />
              <div className="logicalContainer">
                <ButtonType1 marginL="1vw" marginT="2vh" text="Y" onClick={handleClickAnd} disabled={!buttonAnd} w="5vw" h="6vh" />
                <ButtonType1 marginL="1vw" marginT="2vh" text="O" onClick={handleClickOr} disabled={!buttonOr} w="5vw" h="6vh" />
              </div>

            </div>
          </div>
        </div>
        <br/>
        <h3 style={{ marginTop: "2rem" }}>Reglas</h3>
        <div className="table-responsive" style={{width: "80%"}}>

          {rules.length > 0 ? (
            <table className="table table-bordered border-dark" style={{ tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th scope="col">Nombre </th>
                  <th scope="col" >Regla</th>
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
          ) : (
            <div className="">
              <p className="">No hay reglas agregadas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
