import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export default function AdminLayout({children}){
    const [toggled, setToggled] = useState(false);
    const token = localStorage.getItem('token');
    const toggleMenu = () =>{
        setToggled(!toggled);
    }
    const isExpired = (token) => {        
        const decode = JSON.parse(atob(token?.split('.')[1]));
        if (decode.exp * 1000 < new Date().getTime()) {
            localStorage.clear();
            console.log('Time Expired');
            window.location.href = "./login";
        }
    };

    useEffect(() =>{
        if(token){
            isExpired(token);
        }
    },[token])
    const logOut = () =>{
        localStorage.removeItem('token');
    }
    return (
        <div className={toggled ? 'snippet-body' : 'snippet-body body-pd'} >
            <header className={toggled ? 'header' : 'header body-pd'} >
                <div className="header_toggle">
                    <i className={toggled ? 'bx bx-menu' : 'bx bx-menu bx-x'} id="header-toggle" onClick={toggleMenu}></i>
                </div>
                <div className="header_img">
                    <img src={require('../../../assets/image/user.png')} alt=""/>
                </div>
            </header>
            <div className={toggled ? 'l-navbar' : 'l-navbar show'} id="nav-bar">
                <nav className="nav">
                    <div>
                        <Link to="/" className="nav_logo">
                            <i className='bx bx-layer nav_logo-icon'></i>
                            <span className="nav_logo-name">VieLang</span>
                        </Link>
                        <div className="nav_list">
                            <Link to="/admin/topicList" className="nav_link ">
                                <i className='bx bx-grid-alt nav_icon'></i>
                                <span className="nav_name">Topic</span>
                            </Link>
                            <Link to="/admin/lessonList" className="nav_link">
                                <i className='bx bx-user nav_icon'></i>
                                <span className="nav_name">Lesson</span>
                            </Link>
                            <Link to="/#" className="nav_link">
                                <i className='bx bx-message-square-detail nav_icon'></i>
                                <span className="nav_name">Question</span>
                            </Link>
                            <Link to="/#" className="nav_link">
                                <i className='bx bx-bookmark nav_icon'></i>
                                <span className="nav_name">Messages</span>
                            </Link>
                            <Link to="/#" className="nav_link">
                                <i className='bx bx-folder nav_icon'></i>
                                <span className="nav_name">User</span>
                            </Link> 
                        </div>
                    </div>
                        <Link to="/login" className="nav_link" onClick={logOut}>
                            <i className='bx bx-log-out nav_icon'></i>
                            <span className="nav_name">SignOut</span>
                        </Link>
                </nav>
            </div>
            {/* Container Main start */}
            <div className="height-100 bg-light">
                <div>{children}</div>
            </div>
        </div>
    )
}