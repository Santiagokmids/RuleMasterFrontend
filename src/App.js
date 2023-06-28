import React from 'react';
import './App.css';
import Login from './screens/Login';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Auth from './Auth';
import Createuser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import ControlPanelAttribute from './screens/attributeManagementScreen/ControlPanelAttribute';
import ControlePanelRecordManagement from './screens/recordManagementScreen/ControlePanelRecordManagement';
import ControlPanelRuleManagement from './screens/attributeManagementScreen/ControlPanelAttribute';

function App() {

  return (
    <Router>
      <div>
        <Auth>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ControlPanelAdmin />} />
            <Route path="/createUser" element={<Createuser />} />
            <Route path="/attributeManagment" element={<ControlPanelAttribute />} />
          </Routes>
        </Auth>

      </div>
    </Router>

  )


}


export default App;
