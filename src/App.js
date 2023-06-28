import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';

import ControlePanelRecordManagement from './screens/recordManagementScreen/ControlePanelRecordManagement';
import AddRule from './screens/recordManagementScreen/AddRecord';
import ControlPanelRuleManagement from './screens/ruleManagementScreen/ControlPanelRuleManagement';
import ControlPanelAttribute from './screens/attributeManagementScreen/ControlPanelAttribute'
import PopUpDropdown from './componente/PopUpDropdown';
import Login from './screens/Login';

function App() {
  
  let juan = 7;
  switch (juan) {
    case 1:
      return (
        <CreateUser />
      );
    case 2:
      return (
        <ControlPanelAdmin />
      );
    case 3:
      return (
        <ControlePanelRecordManagement />
      )
    case 4:
      return (
        <AddRule />
      )
    case 5:
      return (
        <ControlPanelRuleManagement />
      );
    case 6:
      return (
        <ControlPanelAttribute />
      )
    case 7:
      return (
        <Login />
      )
    default:

  }
}


export default App;
