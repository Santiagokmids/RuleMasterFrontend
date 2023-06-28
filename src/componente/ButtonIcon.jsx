import React from "react";
import "./css/ButtonIcon.css";

function ButtonIcon(props) {
  const { w, h, text, img, marginL ,marginT, onClick} = props;

  return (
    <div style={{width: w, height: h, marginLeft: marginL, marginTop: marginT}}>
    <button onClick={onClick} className="ButtonInputWrapper" >
      <ion-icon name={img}></ion-icon>
      <div className="textContainer">
        <p className="textStyle">{text}</p>
      </div>
    </button>
    </div>
  );
}

export default ButtonIcon;
