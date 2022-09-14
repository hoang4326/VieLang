import React, { useState, useEffect } from 'react';
import {
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
            setUserData(data.data); 
        });
    },[]);  
    return (
        <div>
            {userData.role === "admin" && <Navigate to = '/admin'/>}
            {userData.role === "customer" && <Navigate to = '/'/>}

        </div>
        
    )
}