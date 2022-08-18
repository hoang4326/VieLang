import React, { useState } from 'react';
import { MenuItems }   from "./Menu";
import './Navbar.css'

export default function Navbar() {
    // const state = { clicked: false}

    const [clicked, setClicked] = useState(false);

    const handleClick = () =>{
        // this.setState({ clicked: !state.clicked })
        setClicked(!clicked);
    }
        return (
            <nav className='navbarItems'>
                <h1 className='navbar-logo'> VIELANG</h1>
                <div className='menu-icon' onClick={handleClick}>
                        <i className={clicked ? 'fas fa-times': 'fa fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item,index)=>{
                        return (
                            <li key = {index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })} 
                </ul>
            </nav>
        )
}

