import React from "react";
import "./css/ButtonIcon.css";

function ButtonIcon(props) {
  const { w, h, text, img, marginL ,marginT} = props;

  return (
    <div style={{width: w, height: h, marginLeft: marginL, marginTop: marginT}}>
    <button className="ButtonInputWrapper" >
      <ion-icon name={img}></ion-icon>
      <div className="textContainer">
        <p className="textStyle">{text}</p>
      </div>
    </button>
    </div>
  );
}

export default ButtonIcon;
