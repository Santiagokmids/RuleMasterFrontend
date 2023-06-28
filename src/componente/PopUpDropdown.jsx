import React from 'react'
import Header from './Header'
import ButtonType1 from './ButtonType1'
import './css/PopUpDropdown.css'
import Button from './Button';
import Dropdown from './Dropdown';
import FormInput from './FormInput';

export default function PopUpDropdown(props) {
  const { button2, button1, textHeader, selectOptions, onClickHeader } = props;


  return (
    <div className="popup">
      <div className="popup-content">
        <div style={{ width: "50vw", height: "50vh" }} className="Container">
          <Header buttonText="Regresar" headerText={textHeader} w="100%" onClick={onClickHeader} />
          <div className='ButtonContainer'>
            <FormInput type="text" placeholder={button1} h="8vh" w="40vw" fontsize="2.7rem" />
            <Dropdown selectOptions={selectOptions} t="5%" optionD={button2} w="40vw" h="8vh" fontsize="2.5rem" />
            <Button marginT="5%" text="Confirmar" w="80%" h="20%" fontsize="2.7rem" />
          </div>
        </div>
      </div>
    </div>
  )
}
