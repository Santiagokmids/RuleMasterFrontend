import React from 'react'
import "./css/ButtonGray.css";


export default function ButtonType1(props) {
    const { w, h, text, marginT, marginL, fontsize, onClick, disabled} = props;
    return (
        <button onClick={onClick} className="ButtonInputWrapper1" style={{width: w, height: h, marginTop: marginT, marginLeft: marginL}} disabled={disabled}>
            <p className="textContainer2" style={{fontSize: fontsize}}>{text} </p>
        </button>
    )
}
