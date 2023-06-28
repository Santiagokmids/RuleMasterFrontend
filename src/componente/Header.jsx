import React from 'react'
import './css/Header.css';



export default function Header(props) {
    const { buttonText, headerText, w, onClick} = props;
    return (
        <nav style={{width: w}}>
            <div className='header' style={{width: w}}>
                <div className="tittle-1" >
                    {headerText}
                </div>
                <div className='buttonContainer'>
                    <button className="button" onClick={onClick}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </nav>
    )
}
