import React, { useState, useEffect } from 'react';
import './Topic.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import jwt_decode from "jwt-decode";
import BarChart from './BarChart';
import {
    Link,
} from "react-router-dom";


export default function Topic(){
    // const percentage = 50;
    const [topic, setTopic] = useState([]);
    // const [userId, setUserId] = useState('');
    const [percentLessonDone, setPercentLessonDone] = useState(0);

    const token = localStorage.getItem('token');

    // if(token === null || token === undefined){
    //     token === null
    // }else{
    //     const decoded = jwt_decode(token);
    //     const userID = decoded._id;
    //     setUserId(userID);
    // }
    
    useEffect(() => {
        fetch("http://localhost:5000/topic")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            const decoded = jwt_decode(token);
            const userId = decoded._id;
            let hello = 0;
            // let percent = data[2].find( a => a._id === userId );
            const arr = data[2].map(item => {
                if (item._id === userId){
                    hello = item.percentLessonDone;
                }
                return hello
            })
            console.log(data[2])
            // const percentLessonDone = percent.percentLessonDone;
            setPercentLessonDone(hello);
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
                                    <div className='chart'>
                                        <BarChart/>
                                    </div>
                                    <div className='scoreCard'>
                                        <div className='cardLesson'>
                                            <div className='cardInner'>
                                                <div >1</div>
                                                <div >Day Streak</div>
                                            </div>
                                        </div>
                                        <div className='vLine'></div>
                                        <div className='cardLesson'>
                                        <div className='cardInner'>
                                                <div >0 / 10</div>
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
                                    <Link className='lesson-link' to='/'>
                                        <div className='oneUnit alphabet _1'  style={{cursor: "pointer"}}>
                                            <div className='rippleOuterCus rippleOuter_1 _1'>
                                                <div className='rippleCus ripple_1 _1'>
                                                    <div>
                                                        <div className='unitName active alphabet ripple'>
                                                            ALPHABET
                                                        </div>
                                                        <div className='hrLine'></div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </Link>
                                    
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