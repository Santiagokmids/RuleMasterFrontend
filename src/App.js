import React from 'react';
import './App.css';
import Auth from './Auth';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ControlePanelRecordManagement from './screens/recordManagementScreen/ControlePanelRecordManagement';
import AddRule from './screens/recordManagementScreen/AddRecord';
import ControlPanelRuleManagement from './screens/ruleManagementScreen/ControlPanelRuleManagement';
import ControlPanelAttribute from './screens/attributeManagementScreen/ControlPanelAttribute'
import PopUpDropdown from './componente/PopUpDropdown';
import Login from './screens/Login';


function App() {
  const helloWorld = () => {
    console.log("Hello world")
  }    
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}  />
        <Route path="/ADMIN" element={<ControlPanelAdmin />} />
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  )


}


export default App;
