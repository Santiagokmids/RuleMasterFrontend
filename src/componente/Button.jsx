import React from 'react';
import "./css/Button.css";


export default function Button(props) {
    const { w, h, text} = props;
    return (
      <div>
          <button style={{ width: w, height: h}} className="buttonStyle">{text}</button>
      </div>
    )
}
