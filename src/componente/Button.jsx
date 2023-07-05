import React from 'react';
import "./css/Button.css";


export default function Button(props) {
  const { w, h, text, marginT, marginL, fontsize, onClick, type} = props;    
    return (
      <div style={{ width: w, height: h, marginTop: marginT, marginLeft: marginL}} className='containerButton'>
          <button type={type} onClick={onClick}  className="buttonStyle" style={{fontSize: fontsize}}>{text}</button>
      </div>
    )
}
