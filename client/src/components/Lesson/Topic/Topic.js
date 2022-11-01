import React, { useState, useEffect } from 'react';
import './topic.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import jwt_decode from "jwt-decode";
import {
    Link,
} from "react-router-dom";


export default function Topic(){
    const [topic, setTopic] = useState([]);
    // const [userId, setUserId] = useState('');
    const [percentLessonDone, setPercentLessonDone] = useState(0);
    const [level,setLevel] = useState(0);
    const [achievement, setAchievement] = useState(0);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        fetch("http://localhost:5000/topic")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            if(token){
                const decoded = jwt_decode(token);
                const userId = decoded._id;
                let percent = data[2].find( a => a.userId === userId );
                const percentLessonDone = percent.percentLessonDone;
                const level = percent.level;
                const achievement = percent.achievement;
                setPercentLessonDone(percentLessonDone);
                setAchievement(achievement);
                setLevel(level)
            }
            setTopic(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [token])
    return (
        <div className='lesson'>
            <div className='mainContent'>
                <div className='unitList'>
                    <div className='sidebarArena'>
                        <div className='sidebar'>
                            <div className='section'>
                                <div className='progressTitle'>
                                    <div>
                                        PROGRESS
                                    </div>
                                </div>
                                <div className='progressArea'>
                                    <div className='circleBar' style={{ width: 145, height: 145 }} >
                                        <CircularProgressbar value={percentLessonDone} text={`${percentLessonDone}%`} />
                                    </div>
                                </div>
                                <div className='vLine'></div>
                                <div className='recordContent'>
                                    <div className='dayGoalArea'>
                                        <div>DAILY GOAL</div>
                                    </div>
                                    <div className='scoreCard'>
                                        <div className='cardLesson'>
                                            <div className='cardInner'>
                                                <div >{level}</div>
                                                <div >Level</div>
                                            </div>
                                        </div>
                                        <div className='vLine'></div>
                                        <div className='cardLesson'>
                                        <div className='cardInner'>
                                                <div >{achievement} / 20</div>
                                                <div >Achievements</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='skilltree'>
                        <div className='wrap'>
                            <div className='wrapInner'>
                                <div className='left'>
                                {topic[0]?.map?.((item, index)=>{
                                    return(
                                        <Link className='lesson-link' key={index} to= {`${item.name}`}>
                                            <div id={item.id} className='oneUnit _1' style={{cursor: "pointer"}}  >
                                                <div className='rippleOuterCus rippleOuter_1 _1'>
                                                    <div className='rippleCus ripple_1'>
                                                        <div >
                                                            <div className='imgArea _1'>
                                                                <img className='icon' alt='icon'
                                                                src={item?.topicImg[0]?.urlImage} />
                                                            </div>
                                                            <div className='unitName _1'>
                                                                {item.name}
                                                            </div>
                                                            {/* <div className='lessonProgressText'>
                                                                0 / 3
                                                            </div> */}
                                                            <div className='hrLine'></div>
                                                        </div>
                                                    </div>
                                                </div>    
                                            </div>
                                        </Link>
                                )
                                    })}     
                                </div> 
                                <div className='right'>
                                    <div >
                                        <div className='oneUnit alphabet _1'  style={{cursor: "pointer"}}>
                                            <div className='rippleOuterCus rippleOuter_1 _1'>
                                                <div className='rippleCus ripple_1 _1'>
                                                    <div>
                                                        <div className='hrLine'></div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    
                                    {topic[1]?.map?.((item,index)=> {
                                        return (
                                            <Link className='lesson-link' key={index} to= {`${item.name}`}>
                                                <div id={item.id} className='oneUnit _1'  style={{cursor: "pointer"}} >
                                                    <div className='rippleOuterCus rippleOuter_1 _1'>
                                                        <div className='rippleCus ripple_1'>
                                                            <div>
                                                                <div className='imgArea _1'>
                                                                    <img className='icon' alt='icon' src={item?.topicImg[0]?.urlImage} />
                                                                </div>
                                                                <div className='unitName _1'>
                                                                    {item.name}
                                                                </div>
                                                                {/* <div className='lessonProgressText'>
                                                                    "0 / 3"
                                                                </div> */}
                                                                <div className='hrLine'></div>
                                                            </div>
                                                        </div>
                                                    </div>    
                                                </div>
                                            </Link>
                                        )
                                    }    
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}