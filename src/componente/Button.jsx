import React from 'react';
import "./css/Button.css";


export default function Button(props) {
    const { w, h, text, marginT, marginL, fontsize} = props;
    return (
      <div style={{ width: w, height: h, marginTop: marginT, marginLeft: marginL}} className='containerButton'>
          <button  className="buttonStyle" style={{fontSize: fontsize}}>{text}</button>
      </div>
    )
}
