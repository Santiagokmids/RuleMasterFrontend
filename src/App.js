import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import IconTextInput from './componente/IconTextInput';
import ButtonIcon from './componente/ButtonIcon'
import Calculator from './screens/ruleManagementScreen/CalculatorScreen';

function App() {
  let juan = 3;
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
        <Calculator />
      );
    default:
      return (null);
  }
}


export default App;
