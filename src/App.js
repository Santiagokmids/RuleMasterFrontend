import React from 'react';
import './App.css';
import Auth from './Auth';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ControlePanelRecordManagement from './screens/recordManagementScreen/ControlePanelRecordManagement';
import AddRule from './screens/recordManagementScreen/AddRecord';
import ControlPanelRuleManagement from './screens/ruleManagementScreen/ControlPanelRuleManagement';
import ControlPanelAttribute from './screens/attributeManagementScreen/ControlPanelAttribute'
import PopUpDropdown from './componente/PopUpDropdown';
import Login from './screens/Login';

function App() {
    
  return(
    <Router>
    <div>
      <Auth>
        <Routes>
          <Route path="/"  />
          <Route path="/ADMIN" element={<ControlPanelAdmin />} />
        </Routes>
      </Auth>
    </div>
  </Router>
  )


}


export default App;
