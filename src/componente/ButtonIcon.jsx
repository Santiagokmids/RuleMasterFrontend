import React from "react";
import "./css/ButtonIcon.css";

function ButtonIcon(props) {
  const { w, h, text, img} = props;

  return (
    <button className="ButtonInputWrapper">
      <ion-icon name={img}></ion-icon>
      <div className="textContainer">
        <p className="textContainer1">{text}</p>
      </div>
    </button>
  );
}

export default ButtonIcon;
