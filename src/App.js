import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import IconTextInput from './componente/IconTextInput';
import ButtonIcon from './componente/ButtonIcon'
import Calculator from './screens/ruleManagementScreen/CalculatorScreen';
import ControlePanelRecordManagement from './screens/recordManagementScreen/ControlePanelRecordManagement';
import AddRule from './screens/recordManagementScreen/AddRule';

function App() {
  let juan = 4;
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
        <Calculator />
      );
    default:

  }
}


export default App;
