import React from 'react';
import "./css/Button.css";


export default function Button(props) {
    const { w, h, text, marginT, marginL,onClick} = props;
    const handleClick = () => {
        if (onClick) {
          onClick();
        }
      };
    return (
      <div>
          <button style={{ width: w, height: h, marginTop: marginT, marginLeft: marginL}} onClick={handleClick} className="buttonStyle">{text} </button>
      </div>
    )
}
