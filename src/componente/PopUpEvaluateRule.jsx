import React from 'react'
import Header from './Header'
import './css/PopUpDropdown.css'
import Button from './Button';
import Dropdown from './Dropdown';

export default function PopUpDropdown(props) {
  const { button2, textHeader, selectRules, selectRecords, onClickHeader, valueToSet, onButton, value, idValue, idValueToSet} = props;

  return (
    <div className="popup">
      <div className="popup-content">
        <div style={{ width: "50vw", height: "50vh" }} className="Container">
          <Header buttonText="Regresar" headerText={textHeader} w="100%" onClick={onClickHeader} />
          <div className='ButtonContainer'>
            <Dropdown selectOptions={selectRecords} t="5%" optionD="Seleccionar id del registro" w="40vw" h="8vh" fontsize="2.5rem" value={idValue} onChange={newValue => idValueToSet(newValue)}/>
            <Dropdown selectOptions={selectRules} t="5%" optionD={button2} w="40vw" h="8vh" fontsize="2.5rem" value={value} onChange={newValue => valueToSet(newValue)}/>
            <Button marginT="5%" text="Confirmar" w="80%" h="20%" fontsize="2.7rem" onClick={onButton} />
          </div>
        </div>
      </div>
    </div>
  )
}
