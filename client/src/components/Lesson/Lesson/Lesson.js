import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {
    Link,
} from "react-router-dom";
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
    return(
        <div className='mainContent'>
            <div className='unitDetailP'>
                <div className='sidebarAreaLesson'>
                    <div className='unitDetailItemArea'>
                            <div className='tipsArea'>
                                <div className="tipsText"> VOCABULARY </div>
                                <div className="wrap">
                                    <img className='vocabulary' src={require('../../../assets/image/vocabulary.png')} alt='icon' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='switchContent' style={{display: 'none'}}>
                    <div className='compContent'>
                        <div className='unitContent'>
                            <div className="unitName">
                                <Link className='lesson-link' to='/topic'>
                                    <img src={require('../../../assets/image/greyArrow.png')} className="greyArrow" alt='icon'/>
                                </Link>
                                {/* {lesson[0]?.map?.((item,index) =>{
                                    return(
                                    <div key={index}>{item.topic}</div>
                                    )
                                })} */}
                                <div>Basic 1</div>
                            </div>
                            <div className='wrapContent'>                             
                                {lesson[1]?.map?.((item,index) =>{
                                    return(
                                        <div className="unitPicArea" key={index}>
                                            <img className='imageLesson' src={item.urlLesson} alt='icon'/>
                                        </div>
                                        )
                                })}
                                <div className='lessons'>
                                    {lesson[0]?.map?.((item, index)=>{
                                        return (
                                            <div className='lesson lock1' key={index}>
                                                <div className='wrapInner'>
                                                    <div className='iconArea'>
                                                        <img src={require('../../../assets/image/lightIcon.png')} className="flagIcon" alt='icon'/>
                                                        <span className='lessonSortIndex'>
                                                            {item.id}
                                                        </span>
                                                    </div>
                                                    <div className='buttonArea'>
                                                        <div className='btnLesson ripple start'>
                                                            <div>
                                                                Start
                                                            </div>
                                                            <img src={require('../../../assets/image/start.png')} alt='start'/>
                                                        </div>
                                                    </div>
                                                    <div className='subDescArea'>
                                                        {item.content1}
                                                        <br/>
                                                        {item.content2}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='switchContent'>
                    <div className='switchHead'>
                        <div className='wrapTitle'>
                            <img className='greyArrow' src={require('../../../assets/image/greyArrow.png')} alt='arrow'/>
                            <div className='tipsText'>
                                Vocabulary
                            </div>
                        </div>
                    </div>
                    <div className='compContent'>
                        <div className='vacabulary'>
                            <div className='vocabContent'>
                                <div className='vocList'>
                                    {lesson[2]?.map?.((item, index)=>{
                                        return(
                                            <div key={index}>
                                                {item.vocab?.map?.((a,b)=>
                                                    <div className='voc' key={b}>
                                                                <div className='vietnamese'>
                                                                    <div>{a.vocabVie}</div>
                                                                </div>
                                                                <div className='english'>
                                                                    <div>{a.vocabEng}</div>
                                                                </div>
                                                    </div>
                                                )}

                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>            
                    </div>
                </div>
            </div>
        </div>
    )
}