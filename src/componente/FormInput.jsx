import React from "react";
import "./css/FormInput.css";

function FormInput(props) {
    const [inputValue, setInputValue] = React.useState("");
    const { type, placeholder, w, h, fontsize, value, onChange} = props;

    React.useEffect(() => {

        setInputValue(value || "");
      }, [value]);

      const handleInputChange = (event) => {
        
        const newValue = event.target.value;
        setInputValue(newValue);
    
        if (onChange) {
          onChange(newValue);
        }
      };

    return (
        <div className="formComponent">
            <input  className="formInput" style={{width: w, height:h, fontFamily: "'Josefin Sans', sans-serif", fontSize: fontsize}} 
            type={type} 
            placeholder={placeholder} 
            value={inputValue} 
            onChange={handleInputChange}
            required/>
        </div>
    );
}

export default FormInput;