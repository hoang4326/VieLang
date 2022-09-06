import React, { useState, useEffect } from 'react';
import Manage from '../admin';
import Home from '../Home/Home';


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
    // console.log(userData.role);
    return(
        <div>
            {userData.role === "admin" && <Manage/>}
            {userData.role === "customer" && <Home/>}
            {userData.role === undefined && <Home/>}

        </div>
    )

}