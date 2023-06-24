import React from 'react'
import './css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Header(props) {
    const { buttonText, headerText } = props;
    return (
        <nav class="navbar navbar-light bg-light " className='header'>
            <div class="tittle-1" >
                {headerText}
            </div>
            <button class="button" >
                {buttonText}
            </button>
        </nav>
    )
}
