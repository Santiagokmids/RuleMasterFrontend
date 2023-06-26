import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import IconTextInput from './componente/IconTextInput';
import ButtonIcon from './componente/ButtonIcon'
import ControlePanelRecordManagement from './screens/recordManagementScreen/ControlePanelRecordManagement';
import AddRule from './screens/recordManagementScreen/AddRule';
import ControlPanelRuleManagement from './screens/ruleManagementScreen/ControlPanelRuleManagement';

function App() {
  let juan = 5;
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
    default:

  }
}


export default App;
