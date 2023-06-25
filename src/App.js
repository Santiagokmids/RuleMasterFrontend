import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import IconTextInput from './componente/IconTextInput';
import ButtonIcon from './componente/ButtonIcon'

function App() {
  let juan = 2;
  switch (juan) {
    case 1:
      return (
      <CreateUser />
      );
    case 2:
      return (
      <ControlPanelAdmin />
      );

  }
}  


export default App;
