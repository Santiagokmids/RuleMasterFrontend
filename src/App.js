import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import IconTextInput from './componente/IconTextInput';

function App() {
  let juan = 1;
  switch (juan === 2) {
    case 1:
      <CreateUser />
      break;
    case 2:
      <ControlPanelAdmin />
      break;
    case 3:
      <IconTextInput />
      break;
  }
}  


export default App;
