import React from 'react';
import "./css/Button.css";


export default function Button(props) {
    const { w, h, text, marginT, marginL} = props;
    return (
      <div>
          <button style={{ width: w, height: h, marginTop: marginT, marginLeft: marginL}} className="buttonStyle">{text}</button>
      </div>
    )
}
