import React from 'react'
import PopUpDropdown from '../componente/PopUpDropdown'

export default function Login() {
    const opt = [
        {label: "Gestor de registros", value: "Gestor de registros"},
        {label: "Gestor de putas", value: "Gestor de registros"}
    ]
    return (
        <PopUpDropdown button2="Seleccionar" button1="Chupela" textHeader="Chupela" selectOptions={opt}/>
    )
}
