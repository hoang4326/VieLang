import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './question.css'

export default function Question(){
    const param = useParams();
    const [questions, setQuestions] =useState();
    const [timeStart, setTimeStart] =useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [show, setShow] = useState(false);
    const [duration, setDuration] = useState(0);
    const MySwal = withReactContent(Swal);

    const exitQuestion = () =>{
        MySwal.fire({
            title: 'Are you sure?',
            text: "You will lose the progress of this lesson if you quit now.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/topic/${param.name}`)
            }
        })
    }

    let navigate = useNavigate();
    const handlePost =  () => {
        if(score === questions.length){
            fetch("http://localhost:5000/do-post",{
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                topic: param.name,
                lessonId: param.id,
                token: localStorage.getItem("token"),
                duration: duration
            }),
        }).then((res)=> res.json())
        .then((data)=>{
            navigate(`/topic/${param.name}`)
        });
        }else{
            navigate('/topic')
        }
    }

    const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
            Swal.fire({
                icon: 'success',
                title: 'Correct Answer',
            }).then(()=>{
                const nextQuestion = currentQuestion + 1;
                if (nextQuestion < questions.length) {
                    setCurrentQuestion(nextQuestion);
                } else {
                    var time2 = new Date().getTime();
                    const duration = time2 - timeStart;
                    console.log(duration);
                    setDuration(duration);
                    setShow(true);
                }
            })
		}else{
            let answer = questions[currentQuestion].answerOptions.filter(item => item.isCorrect === true);
            let correctAnswer = answer[0].answerText
            MySwal.fire({
                icon: 'error',
                title: 'Incorrect Answer',
                html: 'The correct answer is </br>  </br>' +
                    `<strong class="strongSwal">${correctAnswer}</strong>`,
            }).then(()=>{
                const nextQuestion = currentQuestion + 1;
                if (nextQuestion < questions.length) {
                    setCurrentQuestion(nextQuestion);
                } else {
                    var time2 = new Date().getTime();
                    const duration = time2 - timeStart;
                    console.log(duration);
                    setDuration(duration);
                    setShow(true);
                }
            })
        }
	};

    useEffect(() => {
        fetch(`http://localhost:5000/topic/${param.name}/${param.id}`)
        .then(res => 
            res.json()
        )
        .then((data)=>{
                const questionArray = data.slice(0,1);
                const questions = Array.from(questionArray[0]);
                const timeStartArray = data.slice(1);
                const timeStart = parseInt((timeStartArray.toString()));
                setQuestions(questions);
                setTimeStart(timeStart);
        })
        .catch((err) => {
            console.log(err)
        })
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='mainCourse'>
            <Modal show={show}  >
                <Modal.Header >
                    <Modal.Title>Final Results</Modal.Title>
                </Modal.Header>
                <Modal.Body className='questionModal'>
                    You have correctly answered {score} out of {questions?.length} questions in this lesson - (
                    {(score / questions?.length) * 100}%)
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePost}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='mainContentQ'>
                
                <div className='switchCourse'>
                    <div className='switchContentQ'>
                        <div className='dyHeader'>
                            <div className='wrapHeader'>
                                <div className='closeArea'>
                                    <button className='quizQuestion' onClick={()=> exitQuestion()}><img className='closeButton' src= {require('../../../assets/image/close.png')}  alt='close button'/></button>
                                </div>
                                <ProgressBar variant='progress-flat' now={((currentQuestion + 1) / questions?.length) * 100} />
                            </div>
                        </div>
                        <div className='dyComponent'>
                            <div className='modelContainer rankA check'>
                                <div className='modelContainerWord wordModel1'>
                                    <div className='wordTitle'>
                                        <div className="wordTitleTranslation">{questions?.[currentQuestion].questionText} </div>
                                    </div>
                                    <div className='optionsArea'>
                                        {questions?.[currentQuestion]?.answerOptions?.map((answerOption, index) =>{ return (
                                            <button key={index} className='questionButton' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                            <div className='option'>
                                                {questions?.[currentQuestion].type === "Text + Image" ?
                                                (
                                                    <div className='item'>
                                                        <img src={
                                                            answerOption.answerImg?.map((item)=> item.urlImage
                                                        )} alt='option' />
                                                        <div className='tip other'>
                                                            <div className='rankC'>
                                                                <span className='spanQuestion'>{answerOption.answerText}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ):
                                                (
                                                    <div className='item1'>{answerOption.answerText}</div>
                                                )
                                                }
                                                    
                                                </div>
                                            </button>
                                        )})}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='switchBottom'>
                        <div className='wrapQuestion'>
                            <div className='wrapInnerQuestion'>
                                <div className='checkPanelQuestion'>
                                    <div className='modelTipArea'>
                                        <div className='checkFlag'>
                                            <img className='default' src={require('../../../assets/image/thinking.png')} alt='thinking'/>
                                        </div>
                                        <div className='textCheckFlag'>
                                            Please choose the correct answer
                                        </div>
                                    </div>
                                    {/* <div className='checkBtn rippleQuestion'>
                                            CHECK
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}