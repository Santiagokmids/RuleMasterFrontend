import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';
import IconTextInput from './componente/IconTextInput';

/*function App() {
  let juan = 2;
  if (juan === 2) {
    return (
      <CreateUser />
    );
  } else {
    return (
      <ControlPanelAdmin />
    );
  }
}  */

function App() {
  return (
    <IconTextInput type = "text" placeholder = "panita" icon = "search-outline" />
  );
}
export default App;
