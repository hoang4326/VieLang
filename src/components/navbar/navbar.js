import React, { Component } from 'react';
import { MenuItems }   from "./menu";
import './navbar.css'

class Navbar extends Component {
    state = { clicked: false}

    handleClick = () =>{
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className='navbarItems'>
                <h1 className='navbar-logo'> VIELANG</h1>
                <div className='menu-icon' onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times': 'fa fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
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

}

export default Navbar