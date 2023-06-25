import React from "react";
import "./css/FormInput.css";

function FormInput(props) {
    const [inputValue, setInputValue] = React.useState("");
    const { type, placeholder, w, h} = props;
    return (
        <div className="formComponent">
            <input className="formInput" style={{width: w, height:h}} type={type} placeholder={placeholder} value={inputValue} onChange={(event) => {setInputValue(event.target.value)}}  />
        </div>
    );
}

export default FormInput;