import React from 'react';
import { useEffect, useState } from 'react';
import './topic.css';

import { Button} from 'react-bootstrap';
import TopicView from './topicView';

export default function TopicList (){
    const [data, setData] = useState();

    // const topic = topic => {
    //     setData(topic);
    // };

    useEffect(()=>{
        fetch("http://localhost:5000/admin/topicList")
        .then(res => 
            res.json()
        )
        .then((data)=>{
            setData(data);
        })
        .catch((err) => {
            console.log(err)
        });
    }, [])

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Manage <b>Topic</b></h2>
                                </div>
                                <div className="col-sm-6">
                                    <Button  className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Topic</span></Button>					
                                </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Topic Image</th>
                                <th>Lesson Image</th>
                                <th>Vocabulary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map?.((topic, index)=>{
                                return(
                                    <tr key={index}>
                                        <TopicView topic = {topic}  />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}