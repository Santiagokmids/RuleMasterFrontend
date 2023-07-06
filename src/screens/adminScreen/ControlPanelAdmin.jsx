import React, { useState, useEffect } from "react";
import Header from "../../componente/Header";
import { useNavigate } from "react-router-dom";

import "./css/ControlPanel.css";
import ButtonIcon from "../../componente/ButtonIcon";
import IconTextInput from "../../componente/IconTextInput";
import PopUpDropdown from "../../componente/PopUpDropdown";
import Auth from "../../Auth";
import axios from "axios";
const backUrl = process.env.BACK_END_URL;

const baseUrl = "http://"+backUrl+":8091"

function ControlPanelAdmin() {

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const navigation = useNavigate();

  useEffect(() => {

    if(localStorage.getItem("jwt")){
      const user = localStorage.getItem("currentRole");

      if(user){
        setCurrentUser(user);
      }

      async function getData() {

        const resultUsers = await getUsers();
        setUsers(resultUsers);
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

  const handleCreateUser = async (event) => {
    event.preventDefault();
    navigation("/createUser");
  };

  const handleClick = () => {
    console.log("Botón clickeado");
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const selectOptions = [
    { label: "Eliminar usuario", value: "Eliminar usuario" },
    ];

    if(currentUser !== "Administrador"){
      navigation("/NotFound");
    }

  return (
    <div>
      <Header buttonText="Cerrar sesión" headerText="Panel de control" onClick={handleLogout}/>
      <div className="body">

        <div className="containerBase" style={{ width: "80vw" }}>
          <br />

          <div className="containerBase2">
            <IconTextInput marginT="1.5vw" w="24vw" h="6vh" type="text" placeholder="Buscar Usuario" icon="search-outline" />
            <ButtonIcon onClick={handleClick} marginT="1.5vw" marginL="1vw" text="Gestionar Usuario" w="24vw" h="6vh" img="person-outline" />
            <ButtonIcon onClick={handleCreateUser} marginT="1.5vw" marginL="1vw" text="Crear usuario" w="24vw" h="6vh" img="person-add-outline" />
          </div>

          <br />
          <p className="h2">Usuarios registrados</p>

          <div className="container">
            <br />
            <div className="table-responsive">
              <table className="table table-bordered border-dark" style={{tableLayout:"fixed"}}>
                  <thead>
                      <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Email</th>
                      <th scope="col">Rol</th>
                      </tr>
                  </thead>
                  <tbody>
                    {users != null && users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
            <PopUpDropdown button2="Seleccionar accion" button1="Ingrese el ID" textHeader="Gestionar usuarios" selectOptions={selectOptions} onClickHeader={handleClose} />
      )}

    </div>
  );
}

async function getUsers(){
  var token=localStorage.getItem("jwt");
  const users = await axios.get(
    baseUrl+"/users",
    {
      headers:{
        "Access-Control-Allow-Origin": baseUrl,
        "MediaType" : "application/json",
        Authorization: `Bearer ${token}` 
      }
    }
  )

  return users.data;
}

export default ControlPanelAdmin;