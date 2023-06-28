import React from "react";
import "./css/FormInput.css";

function FormInput(props) {
    const [inputValue, setInputValue] = React.useState("");
    const { type, placeholder, w, h, fontsize} = props;
    
    return (
        <div className="formComponent">
            <input  className="formInput" style={{width: w, height:h, fontFamily: "'Josefin Sans', sans-serif", fontSize: fontsize}} type={type} placeholder={placeholder} value={inputValue} onChange={(event) => {setInputValue(event.target.value)}}  />
        </div>
    );
}

export default FormInput;