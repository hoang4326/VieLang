import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from 'react-router-dom';


import './Question.css'

export default function Question(){
    const param = useParams();
    const [questions, setQuestions] =useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [show, setShow] = useState(false);
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
                token: localStorage.getItem("token")
            }),
        }).then((res)=> res.json())
        .then((data)=>{
            console.log(data);
            navigate(`/topic/${param.name}`)
        });
        }else{
            navigate('/topic')
        }
    }

    const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
            setShow(true);
		}
	};

    useEffect(() => {
        fetch(`http://localhost:5000/topic/${param.name}/${param.id}`)
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setQuestions(data)
        })
        .catch((err) => {
            console.log(err)
        })
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='mainCourse'>
            <Modal show={show} >
                <Modal.Header closeButton>
                    <Modal.Title>Final Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have correctly answered {score} out of {questions?.length} questions in this lesson - (
                    {(score / questions?.length) * 100}%)
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePost}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='mainContentQ'>
                <ProgressBar variant='progress-flat' now={(currentQuestion / questions?.length) * 100} />
                <div className='switchCourse'>
                    <div className='switchContentQ'>
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
                                                    <div className='item'>
                                                        <img src={answerOption.answerImg} alt='option' />
                                                        <div className='tip other'>
                                                            <div className='rankC'>
                                                                <span className='spanQuestion'>{answerOption.answerText}</span>
                                                            </div>
                                                        </div>
                                                    </div>  
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