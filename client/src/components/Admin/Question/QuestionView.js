import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import QuestionDetail from './QuestionDetail';
// import { Button} from 'react-bootstrap';

const QuestionView = ({question, chooseMessage}) =>{
    const MySwal = withReactContent(Swal);
    // const handleShow = () => {
    //     fetch("http://localhost:5000/admin/questionByName",{
    //         method: "POST",
    //         crossDomain: true,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "Access-Control-Allow-Origin":"*",
    //         },
    //         body: JSON.stringify({
    //             topic, lesson, questionText
    //         }),
    //     }).then((res)=> res.json())
    //     .then((data)=>{
    //         setValueEdit(data);
    //     })
    //     setShow(true)
    // };
    

    return (
        <>
                <td>{question.topic}</td>
                <td>{question.lesson}</td>
                <td >{question.questions?.map?.((item, id)=>{
                    return (
                        <div key={id}>
                            Q{id + 1}: {item.questionText} <br/>
                        </div>
                    )
                    })}
                </td>
                {/* <td>{question.questions?.map?.((item) =>
                    (
                        <>
                            {item.answerOptions?.map?.((a,id)=>{
                            return(
                                <div key={id}>
                                {id + 1}: {a.answerText} <br/>
                                </div>
                            )
                        })}
                        </>
                    )
                    )}
                </td> */}
                <td>
                {question.questions?.map?.((item, index) =>
                    (
                        <div key={index}>
                            {item.answerOptions?.map?.((a,id)=>{
                            return(
                                <div key={id}>
                                    {a.isCorrect === true ?
                                    (<>{a.answerText}</>):(<></>)
                                    }
                                </div>
                            )
                        })}
                        </div>
                    )
                    )}
                </td>
                <td>
                {question.questions?.map?.((item, index) =>{
                            return(
                                <div key={index}>
                                    <QuestionDetail item = {item} question = {question} chooseMessage = {chooseMessage} />
                                </div>
                            )
                        })}
                </td>
                
                
        </>
    )
}



export default QuestionView