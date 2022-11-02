import React from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import QuestionDetail from './QuestionDetail';
// import { Button} from 'react-bootstrap';

const QuestionView = ({question, chooseMessage}) =>{
    // const MySwal = withReactContent(Swal);
    

    return (
        <>
                <td>{question.topic}</td>
                <td>{question.lesson}</td>
                <td >{question.questions?.map?.((item, id)=>{
                    return (
                        <div key={id} className= "paddingQuestion">
                            {item.questionText} <br/>
                        </div>
                    )
                    })}
                </td>
                <td>
                {question.questions?.map?.((item, index) =>
                    (
                        <div key={index} className="paddingQuestion">
                            {item.answerOptions?.map?.((a,id)=>{
                            return(
                                <div key={id}>
                                    {a.isCorrect === true ?
                                    (
                                        <>
                                            {a.answerText}
                                        </>
                                    ):(<></>)
                                    }
                                </div>
                            )
                        })}
                        </div>
                    )
                    )}
                </td>
                <td >{question.questions?.map?.((item, id)=>{
                    return (
                        <div key={id} className= "paddingQuestion">
                            {item.type} <br/>
                        </div>
                    )
                    })}
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