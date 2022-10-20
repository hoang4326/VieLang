import React, { useState } from "react";
// import FileBase64 from 'react-file-base64';


export default function AddTopic() {
    const [name,setName] = useState();
    const [url,setUrl] = useState();
    const [urlLesson,setUrlLesson] = useState();



    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("url", url);
        data.append("url_lesson", urlLesson);

        fetch("http://localhost:5000/addTopic",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                data
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data, "userRegister");
        });
    }
    

    return (
    <div className="SignupForm">
        <form className="signup" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <br />
            <label htmlFor="name" className="name">Name topic:</label>
            <input 
                type="text"
                // name="name"
                className="signup"
                id="name"
                placeholder="Your name"
                onChange= {event => setName(event.target.value)}
                required='required'/>
            <label htmlFor="name" className="name">Select image of Topic:</label>
            <input type='file' accept=".png" onChange={event =>{
                const file = event.target.files[0];
                setUrl(file)
            }}></input>

            <label htmlFor="name" className="name">Select image of Lesson:</label>
            <input type='file' accept=".png" onChange={event =>{
                const file = event.target.files[0];
                setUrlLesson(file)
            }}></input>

            <button type="submit">Submit</button>
        </form>
    </div>
);
}