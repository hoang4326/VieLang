import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


export default function LessonById () {
    // eslint-disable-next-line
    const param = useParams();
    const [lesson, setLesson] = useState([]);
    useEffect(() => {

        fetch(`http://localhost:5000/lesson/${param.id}`)
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
    return(
        <div>
            {lesson.map((item)=>
                <li>{item.topic}</li>
            )}
        </div>
    )
}