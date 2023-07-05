import React from "react";
import "./css/InputLogin.css";

function InputLogin(props) {
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
    <div className="InputLoginWrapper" style={{width: props.w, height: props.h, marginLeft: props.marginL, marginTop: props.marginT}}>
      <ion-icon name={props.icon}></ion-icon>
      <div className="InputLoginContainer">
        <input
          className="InputLogin"
          type={props.type}
          placeholder={props.placeholder}
          value={inputValue} 
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
}
export default InputLogin;
