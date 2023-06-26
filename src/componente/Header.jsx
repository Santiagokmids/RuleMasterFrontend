import React from 'react'
import './css/Header.css';



export default function Header(props) {
    const { buttonText, headerText, w} = props;
    return (
        <nav style={{width: w}}>
            <div className='header' style={{width: w}}>
                <div class="tittle-1" >
                    {headerText}
                </div>
                <div className='buttonContainer'>
                    <button class="button" >
                        {buttonText}
                    </button>
                </div>
            </div>
        </nav>
    )
}
