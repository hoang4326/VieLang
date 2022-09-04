import React, {useState, useEffect} from 'react';

export default function UserDetails(){
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
    return(
        <div>
            Name<h1>{userData.name}</h1>
            Email<h1>{userData.email}</h1>
        </div>
    )
}