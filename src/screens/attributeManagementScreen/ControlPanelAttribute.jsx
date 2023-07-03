import React, { useState, useEffect } from "react";
import Header from "../../componente/Header";

import ButtonIcon from "../../componente/ButtonIcon";
import Button from "../../componente/Button";
import "./css/PanelControl.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ControlPanelRuleManagement() {
  const navigation = useNavigate();
  const [tableData, setTableData] = useState([]);

  const baseUrl="http://localhost:8091";

  
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
  }, []);


  const handleLogout = async (event) => {
    event.preventDefault();
    navigation("/login");
  };

  const handleCreateColumn= async (event) => {
    event.preventDefault();
    navigation("/createColumn");
  };

  return (
    <div >
    <Header buttonText="Cerrar sesion" headerText="Panel de control" onClick={handleLogout} />
    <body className="body">
      <div className="containerBase" style={{width:"80vw"}}>
          <div className="containerBase2">
            <ButtonIcon marginL="1vw" marginT="1vw" text = "Gestionar Columnas"  w="36vw" h="6vh" img="reader-outline"/>
            <Button onClick={handleCreateColumn} text = "Agregar Columnas"  w="36vw" h="6vh" marginL="1vw" marginT="1vw"/>
          </div>

          <div className="container">
            <br />
              <div className="table-responsive">
                <table className="table table-bordered border-dark" style={{tableLayout:"fixed"}}>
                  <thead>
                    <tr>
                      <th  key="id" scope="col">ID</th>
                      {tableData.columnNames && tableData.columnNames.map((columnName, index) => (
                      columnName !== "record_id" && <th  key={index} className="">
                          {columnName} - 
                          {tableData.columnTypes[index] === "numeric" ? " numerica" : 
                          tableData.columnTypes[index] === "varchar"  ? " texto": 
                            tableData.columnTypes[index] === "bool"  ? " boolean": 
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
          </div>
      </div>
    </body>
  </div>
  )
}
