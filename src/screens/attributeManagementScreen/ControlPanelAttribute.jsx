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
  const [currentUser, setCurrentUser] = useState("");

  const baseUrl = "http://localhost:8091";


  useEffect(() => {
   
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
  }, []);


  const handleLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.setItem("logged_user", JSON.stringify(false))
    localStorage.removeItem('currentRole');
    navigation("/login");
  };

  const handleCreateColumn = async (event) => {
    event.preventDefault();
    navigation("/createColumn");
  };

  if(currentUser !== "Gestor_de_columnas"){
    navigation("/NotFound");
  }

  return (
    <div >
      <Header buttonText="Cerrar sesion" headerText="Panel de control" onClick={handleLogout} />
      <body className="body">
        <div className="containerBase" style={{ width: "80vw" }}>
          <div className="containerBase2">
            <ButtonIcon marginL="1vw" marginT="1vw" text="Gestionar Columnas" w="36vw" h="6vh" img="reader-outline" />
            <Button onClick={handleCreateColumn} text="Agregar Columnas" w="36vw" h="6vh" marginL="1vw" marginT="1vw" />
          </div>

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
      </body>
    </div>
  )
}
