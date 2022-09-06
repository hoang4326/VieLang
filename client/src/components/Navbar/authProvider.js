import React, { useState, useEffect } from 'react';
import Manage from '../admin';
import Home from '../Home/Home';

import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
export default function Auth (){
    const [userData, setUserData] = useState("");
    useEffect(() => {
        fetch("http://localhost:5000/userData",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                token:window.localStorage.getItem("token"),
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userData");
            setUserData(data.data);
        });
    },[]);  

    return (
        <div>
            {userData.role === "admin" && <Navigate to = '/admin'/>}
            {userData.role === "customer" && <Navigate to = '/home'/>}
            <Routes>

</Routes>

        </div>
        
    )
}