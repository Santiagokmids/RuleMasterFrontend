import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Auth from './Auth';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import ControlePanelRecordManagement from './screens/recordManagementScreen/ControlePanelRecordManagement';
import ControlPanelRuleManagement from './screens/ruleManagementScreen/ControlPanelRuleManagement';
import ControlPanelAttribute from './screens/attributeManagementScreen/ControlPanelAttribute'
import Login from './screens/Login';
import AddRecord from './screens/recordManagementScreen/AddRecord';
import AddColumn from './screens/attributeManagementScreen/AddColumn';
import NotFound from './screens/NotFound';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("jwt") !== null);

  useEffect(() => {
    localStorage.setItem("logged_user", JSON.stringify(isLoggedIn));
    
  }, [isLoggedIn]);

  const logIn = () => setIsLoggedIn(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setLogin={logIn}/>}></Route>
        <Route path="/*"
            element={isLoggedIn ? <NotFound />: <Navigate to = "/login"/>}
        ></Route>
        <Route path="/admin" element={<ControlPanelAdmin />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/attributeManagement" element={<ControlPanelAttribute />} />
        <Route path="/createColumn" element={<AddColumn />} />
        <Route path="/recordManagement" element={<ControlePanelRecordManagement />} />
        <Route path="/createRecord" element={<AddRecord />} />
        <Route path='/ruleManagement' element={<ControlPanelRuleManagement />} />
      </Routes>
    </BrowserRouter>
  )

}


export default App;
