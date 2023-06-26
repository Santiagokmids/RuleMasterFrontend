import React from "react";
import "./css/IconTextInput.css";

function IconTextInput(props) {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="IconTextInputWrapper" style={{width: props.w, height: props.h, marginLeft: props.marginL, marginTop: props.marginT}}>
      <ion-icon name={props.icon}></ion-icon>
      <div className="IconTextInputContainer">
        <input
          className="IconTextInput"
          type={props.type}
          placeholder={props.placeholder}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
      </div>
    </div>
  );
}
export default IconTextInput;
