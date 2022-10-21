import React, { useState } from "react";


export default function AddLesson() {
    const [name,setName] = useState('');
    const [imgTopic,setImgTopic] = useState('');
    const [imgLesson,setImgLesson] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData();
        data.append("imgTopic", imgTopic);
        data.append("imgLesson", imgLesson);

        data.append("name", name);
        console.log(data);
        fetch("http://localhost:5000/addTopic",{
            method: "POST",
            crossDomain: true,
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: data
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
                setImgTopic(file)
            }}></input>

            <label htmlFor="name" className="name">Select image of Lesson:</label>
            <input type='file' accept=".png" onChange={event =>{
                const file = event.target.files[0];
                setImgLesson(file)
            }}></input>

            <button type="submit">Submit</button>
        </form>
    </div>
);
}