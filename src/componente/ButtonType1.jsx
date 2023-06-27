import React from 'react'
import "./css/ButtonGray.css";



export default function ButtonGray(props) {
    const { w, h, text, marginT, marginL, onClick} = props;
    const handleClick = () => {
        if (onClick) {
          onClick();
        }
      };
    return (
        <button className="ButtonInputWrapper1" style={{width: w, height: h, marginTop: marginT, marginLeft: marginL}} onClick={handleClick}>
            <p className="textContainer2" >{text} </p>
        </button>
    )
}
