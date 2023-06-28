import React from 'react'
import "./css/ButtonGray.css";


export default function ButtonType1(props) {
    const { w, h, text, marginT, marginL, fontsize, onClick} = props;
    return (
        <button onClick={onClick} className="ButtonInputWrapper1" style={{width: w, height: h, marginTop: marginT, marginLeft: marginL}}>
            <p className="textContainer2" style={{fontSize: fontsize}}>{text} </p>
        </button>
    )
}
