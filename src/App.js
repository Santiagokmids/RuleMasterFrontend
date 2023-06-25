import React from 'react';
import './App.css';
import CreateUser from './screens/adminScreen/CreateUser';
import ControlPanelAdmin from './screens/adminScreen/ControlPanelAdmin';

function App() {
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
}

export default App;
