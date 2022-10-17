import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "./Lesson.css"


export default function Lesson () {
    // eslint-disable-next-line
    const param = useParams();
    const [lesson, setLesson] = useState([]);
    useEffect(() => {

        fetch(`http://localhost:5000/topic/${param.id}`)
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setLesson(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    console.log(lesson)
    return(
        <div>
            {lesson[0]?.map?.((item)=>
                <li>{item.topic}</li>
            )}
            {lesson[1]?.map?.((item)=>
                <li>{item.urlLesson}</li>
            )}
        </div>
    )
}