import React, { useState, useEffect } from 'react'
import './topic.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
// import Chart from './BarChart'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import { Button, InputGroup, Form, Modal} from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import {
    Link,
} from "react-router-dom"


export default function Topic(){
    const MySwal = withReactContent(Swal)
    const [topic, setTopic] = useState([])
    const [history, setHistory] = useState()
    const [goal, setGoal] = useState(0);
    let navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(null)
    const [percentLessonDone, setPercentLessonDone] = useState(0)
    const [level,setLevel] = useState(0)
    const [search,setSearch] = useState(null)
    const [achievement, setAchievement] = useState(0)
    const [goalCurr, setGoalCurr] = useState(0)
    const [checkGoal, setCheckGoal] = useState(false)

    const token = localStorage.getItem('token')
    

    const handleClose = () => setShow(false)
    const handleShow = () =>{
        if (userId === null){
            MySwal.fire({
                title: <strong>Cannot access !</strong>,
                html: <i>You need to be logged in to be able to edit the goal</i>,
                icon: 'warning'
            }).then(()=>{
                navigate("/login")
            })
        }else{
            setShow(true)
        }
    } 

    const searchByTopic = search =>{
        if ( (topic[0].find(a => a.name === search)) !== undefined || (topic[1].find(a => a.name === search)) !== undefined){
            navigate(`/topic/${search}`)
        }
    }

    const editGoal = (userId, goal) =>{
        fetch("http://localhost:5000/editGoal",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                userId, goal
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })
        setShow(false)
    }

    useEffect(() => {
        fetch("http://localhost:5000/topic")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            if(token){
                const decoded = jwt_decode(token)
                const userId = decoded._id
                let percent = data[2].find( a => a.userId === userId )
                let history = data[3].find( a => a.userId === userId )
                const percentLessonDone = percent.percentLessonDone
                const level = percent.level
                const achievement = percent.achievement
                setUserId(userId)
                setPercentLessonDone(percentLessonDone)
                setAchievement(achievement)
                setLevel(level)
                setHistory(history)
                setGoal(history.goal)
            }
            setTopic(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [token])

    useEffect(()=>{
        if(token){
            const today = new Date();
            const date = today.getDate();
            const month = today.getMonth() + parseInt(1);
            const year = today.getFullYear();
            const total = date + "-" + month + "-" + year;

            let valueGoal = history?.history?.map(item =>{
                if(item.date === total){
                    return item.exp
                }
                return undefined
            }).filter(e => e !== undefined)

            let checkDailyGoal = history?.history?.map(item =>{
                if(item.date === total){
                    return item.dailyGoal
                }
                return undefined
            }).filter(e => e !== undefined)

            let goal = valueGoal?.[0]
            let checkGoal = checkDailyGoal?.[0]
            console.log(valueGoal, checkDailyGoal)
            setCheckGoal(checkGoal)
            setGoalCurr(goal)
        }
    },[history, token])
    return (
        <div className='lesson'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body className='topicModal'>
                    <Form.Group className="mb-4">
                        <Form.Label>Choose daily goal: </Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setGoal(e.target.value)} required>
                            <option value= {60} >Open this select menu</option>
                            <option value= {20} >20</option>
                            <option value= {40} >40</option>
                            <option value= {60} >60</option>
                </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => editGoal(userId, goal)} >
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='mainContent'>
                <div className='unitList'>
                    <div className='searchTopic'>
                        <InputGroup className="mb-3 topic">
                            <Form.Control
                                placeholder='Search topic'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline-secondary" id="button-addon1" className='change'
                            onClick={()=>searchByTopic(search)}
                            >
                                Search
                            </Button>
                        </InputGroup>
                    </div>
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
                                        <button className='topicButton' onClick={()=>handleShow()}>
                                            <div>EDIT GOAL</div>
                                        </button>
                                    </div>
                                    <div className='chart'>
                                        {checkGoal === true ?
                                        (
                                            <div className='imageTreasure2'></div>
                                        ):
                                        (
                                            <div className='imageTreasure1'></div>
                                        )}
                                        <div className='dalyGoal'>
                                            <div className='textDaily'>
                                                Daily Goal
                                            </div>
                                            <div className='expDaily'>
                                                <div className='expTopic'>
                                                    {goalCurr} / {goal} XP
                                                </div>
                                            </div>
                                        </div>
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
                                                <div >{achievement} / 23</div>
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
                                                            <div className='lessonProgressText'>
                                                                {(item.lessonDone.filter(a => a._id === userId)).length}/ {item.totalLesson}
                                                            </div>
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
                                                    <div 
                                                        // className='topicDiffer'
                                                    >
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
                                                                <div className='lessonProgressText'>
                                                                    {(item.lessonDone.filter(a => a._id === userId)).length} / {item.totalLesson}
                                                                </div>
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