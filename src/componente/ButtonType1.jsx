import React from 'react'
import "./css/ButtonGray.css";


export default function ButtonGray(props) {
    const { w, h, text, marginT, marginL} = props;
    return (
        <button className="ButtonInputWrapper1" style={{width: w, height: h, marginTop: marginT, marginLeft: marginL}}>
            <p className="textContainer2" >{text} </p>
        </button>
    )
}
