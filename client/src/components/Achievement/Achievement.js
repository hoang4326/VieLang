import React,{useEffect, useState} from "react";
import './achievement.css'
import { useParams } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Achievement(){
    const param = useParams();
    const [percentLessonDone, setPercentLessonDone] = useState(0);
    const [level, setLevel] = useState(0);
    const [achievement, setAchievement] = useState(0);
    useEffect(()=>{
        fetch(`http://localhost:5000/achievement/${param.id}`)
        .then(res=>
            res.json())
        .then((data)=>{
            setAchievement(data.achievement)
            setLevel(data.level);
            setPercentLessonDone(data.percentLessonDone);
        })
        .catch((err) => {
            console.log(err)
        });
    },[])
    console.log(percentLessonDone)
    return (
        <div className="mainContent">
            <div className="profile">
            <div className="sidebarArea">
                <div className="section history">
                    <div className="title">All Learning History</div>
                    <div>
                        <div className="card">
                            <div className="cardInner">
                                <div className="itemA">
                                    <div className="cardTitle">Total Time</div>
                                    <div className="cardContent">2h 7m 18s</div>
                                </div>
                            </div>
                        </div>
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
                </div>
            </div>
            <div className="profileContent">
                <div className="headerAchieve">
                    <div>
                        <img src="/static/media/user.1513073bc736d11dce70.png"/>
                        <div className="userAttachInfo">
                            <div className="nameQuestion">
                                <div>Nguyen Viet Hoang (FGW HN)</div>
                            </div>
                            <div>
                                <div className="logEmail">
                                    <div>Email:</div>
                                    <div>hoangnvgch190506@fpt.edu.vn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rank">
                    LV {level}
                    </div>
                </div>
                <div className="contentQuestion">
                    <div className="record">
                        <div className="achievement">
                            <div className="acTop">
                                <div className="achTitle">
                                    Achievement
                                </div>
                                <div className="achContent">
                                    <div>I have got &nbsp;&nbsp;  </div>
                                    <div className="achSpan">{achievement}</div>
                                    <div className="achSpace">/</div>
                                    <div>20</div>
                                </div>
                            </div>
                            <div className="medalCardArea">
                                <div className="learnTime medalCard">
                                    <div className="subHead">
                                            <div>Learning Time</div>
                                            <div>1 <span>/</span> 6</div>
                                    </div>
                                    <div className="medalList learnTime">
                                        <div className="medal">
                                            <div>
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/610/610172.png" /> */}
                                                <img src="https://i.postimg.cc/jd6rGWJv/311900983-598494861965899-4970635466708121808-n.png" />
                                            </div>
                                            <div className="hour"> 1 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/610/610172.png" /> */}
                                                <img src="https://i.postimg.cc/jd6rGWJv/311900983-598494861965899-4970635466708121808-n.png" />
                                            </div>
                                            <div className="hour"> 5 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/610/610172.png" /> */}
                                                <img src="https://i.postimg.cc/jd6rGWJv/311900983-598494861965899-4970635466708121808-n.png" />
                                            </div>
                                            <div className="hour"> 10 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/610/610172.png" /> */}
                                                <img src="https://i.postimg.cc/jd6rGWJv/311900983-598494861965899-4970635466708121808-n.png" />
                                            </div>
                                            <div className="hour"> 50 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/610/610172.png" /> */}
                                                <img src="https://i.postimg.cc/jd6rGWJv/311900983-598494861965899-4970635466708121808-n.png" />
                                            </div>
                                            <div className="hour"> 70 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/610/610172.png" /> */}
                                                <img src="https://i.postimg.cc/jd6rGWJv/311900983-598494861965899-4970635466708121808-n.png" />
                                            </div>
                                            <div className="hour"> 100 Hours</div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="levels medalCard">
                                        <div className="subHead">
                                            <div>Learning progress</div>
                                            <div>0 <span>/</span> 4</div>
                                        </div>
                                        <div className="medalList">
                                            <div className="medal">
                                                <div className="levelMedal">
                                                    {/* <img src="https://cdn-icons-png.flaticon.com/512/179/179250.png" /> */}
                                                    <img src="https://i.postimg.cc/zBkvjJ1G/daf.png" />
                                                </div>
                                                <div className="hour"> 25%</div>
                                            </div>
                                            <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3135/3135728.png" /> */}
                                                <img src="https://i.postimg.cc/s2nsDK7w/fwwww.png" />

                                            </div>
                                            <div className="hour"> 50%</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3229/3229875.png" /> */}
                                                <img src="https://i.postimg.cc/kg9jYmzt/faf.png" />
                                            </div>
                                            <div className="hour"> 75%</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/7645/7645279.png" /> */}
                                                <img src="https://i.postimg.cc/hPCB0XzY/54747.png" />
                                            </div>
                                            <div className="hour"> 100%</div>
                                        </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div>
                        <div className="achievement">
                            <div className="acTopCenter">
                            </div>
                            <div className="medalCardArea">
                                

                                    <div className="levels medalCard">
                                        <div className="subHead">
                                            <div>Levels</div>
                                            <div>0 <span>/</span> 10</div>
                                        </div>
                                        <div className="medalList">
                                            <div className="medal">
                                                <div className="levelMedal">
                                                    {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                    <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                    <span className="lvNum">1</span>
                                                </div>
                                                <div className="hour"> LV1</div>
                                            </div>
                                            <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">2</span>
                                            </div>
                                            <div className="hour"> LV2</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">3</span>
                                            </div>
                                            <div className="hour"> LV3</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">4</span>
                                            </div>
                                            <div className="hour"> LV4</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">5</span>
                                            </div>
                                            <div className="hour"> LV5</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">6</span>
                                            </div>
                                            <div className="hour"> LV6</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">7</span>
                                            </div>
                                            <div className="hour"> LV7</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">8</span>
                                            </div>
                                            <div className="hour"> LV8</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">9</span>
                                            </div>
                                            <div className="hour"> LV9</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {/* <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" /> */}
                                                <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" />
                                                <span className="lvNum">10</span>
                                            </div>
                                            <div className="hour"> LV10</div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    )
}