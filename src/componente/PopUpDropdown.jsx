import React from 'react'
import Header from './Header'
import ButtonType1 from './ButtonType1'
import './css/PopUpDropdown.css'
import Button from './Button';
import Dropdown from './Dropdown';

export default function PopUpDropdown(props) {
  const {button2, button1, textHeader, selectOptions} = props;

  
  return (
    <div style={{width: "50vw", height: "50vh"}}>
        <Header buttonText="Regresar" headerText={textHeader} w= "100%" />
        <div className='ButtonContainer'>
          <ButtonType1 marginT="5%" text={button1} w="80%" h="20%" fontsize="2.5rem"/>
          <Dropdown selectOptions={selectOptions} t="5%" text={button2} w="80%" h="20%" fontsize="2.5rem"/>
          <Button marginT="5%" text="Confirmar" w="80%" h="20%" fontsize="2.7rem"/>
        </div>

    </div>
  )
}
