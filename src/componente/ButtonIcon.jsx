import React from 'react';
import "./css/ButtonIcon.css";


export default function Button(props) {
    const { w, h, text, img} = props;
    return (
        <div className="containerRow1">
        <button style={{ width: w, height: h }} className="buttonStyle1">
          <div className="buttonContent">
            <img src={img} className="imgStyle" alt="icon" />
            <div className="buttonText">{text}</div>
          </div>
        </button>
      </div>
    )
}
