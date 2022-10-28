import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
    Link,
} from "react-router-dom";
import "./Lesson.css"


export default function Lesson () {
    // eslint-disable-next-line
    const param = useParams();
    const [lesson, setLesson] = useState([]);
    const [showLesson, setShowLesson] = useState(false);
    const [toggled, setToggled] = useState(false);
    const MySwal = withReactContent(Swal);
    var style1 = {};
    var style2 = {};

    const toggleMenu = () =>{
        setToggled(!toggled);
    }

    if(!toggled) {

        style1.display = 'block';
        style2.display = 'none';
    }else{
        
        style1.display = 'none';
        style2.display = 'block';
    }
    const token = localStorage.getItem('token');

    useEffect(() =>{
        if(token){
            // const decoded = jwt_decode(token);
            // const userId = decoded._id;
            // console.log(userId);
            setShowLesson(true);
        }else{
            setShowLesson(false);
        }
    },[token])

    const handleClick = () =>{
        MySwal.fire({
            title: <strong>Cannot access !</strong>,
            html: <i>You need to be logged in to be able to take the lesson</i>,
            icon: 'warning'
        })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/topic/${param.name}`)
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setLesson(data)
        })
        .catch((err) => {
            console.log(err)
        })
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div className='mainContent'>
            <div className='unitDetailP'>
                <div className='sidebarAreaLesson'>
                    <div className='unitDetailItemArea'>
                            <div className='tipsArea'>
                                <div className="tipsText"> VOCABULARY </div>
                                <div className="wrap">
                                    <img className='vocabulary' src={require('../../../assets/image/vocabulary.png')} alt='icon'  onClick={toggleMenu}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='switchContent' style={style1}>
                    <div className='compContent'>
                        <div className='unitContent'>
                            <div className="unitName">
                                <Link className='lesson-link' to='/topic'>
                                    <img src={require('../../../assets/image/greyArrow.png')} className="greyArrow" alt='icon'/>
                                </Link>
                                {lesson[3]?.map?.((item,index) =>{
                                    return(
                                    <div key={index}>{item.name}</div>
                                    )
                                })}
                                {/* <div>Basic 1</div> */}
                            </div>
                            <div className='wrapContent'>                             
                                {lesson[1]?.map?.((item,index) =>{
                                    return(
                                        <div className="unitPicArea" key={index}>
                                            <img className='imageLesson' src={item?.lessonImg[0]?.urlImage} alt='icon'/>
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
                                                            {index + 1}
                                                        </span>
                                                    </div>

                                                    {showLesson ? (
                                                        <Link to = {`${item.id}`} className='lesson-link'>
                                                            <div className='buttonArea'>
                                                                <div className='btnLesson ripple start'>
                                                                    <div>
                                                                        Start
                                                                    </div>
                                                                    <img src={require('../../../assets/image/start.png')} alt='start'/>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    ):(
                                                        <button className='lesson-link' onClick={handleClick}>
                                                            <div className='buttonArea'>
                                                                <div className='btnLesson ripple start'>
                                                                    <div>
                                                                        Start
                                                                    </div>
                                                                    <img src={require('../../../assets/image/start.png')} alt='start'/>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    )}
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
                <div className='switchContent' style={style2}>
                    <div className='switchHead'>
                        <div className='wrapTitle'>
                            <img className='greyArrow' src={require('../../../assets/image/greyArrow.png')} alt='arrow' onClick={toggleMenu}/>
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