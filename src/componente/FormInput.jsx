import React from "react";
import "./css/FormInput.css";

function FormInput(props) {
    const [inputValue, setInputValue] = React.useState("");
    const { type, placeholder} = props;
    return (
        <div className="formComponent">
            <input type={type} placeholder={placeholder}  value={inputValue} onChange={(event) => {setInputValue(event.target.value)}}  />
        </div>
    );
}

export default FormInput;