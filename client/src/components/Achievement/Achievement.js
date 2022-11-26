import React,{useEffect, useState} from "react";
import './achievement.css'
import { useParams } from "react-router-dom";
// import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Achievement(){
    const param = useParams()
    // const [percentLessonDone, setPercentLessonDone] = useState(0)
    const [data, setData] = useState()
    const [history, setHistory] = useState()
    const [level, setLevel] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [achievement, setAchievement] = useState(0)
    const [hour, setHour] = useState(0)
    const [percent, setPercent] = useState(0)
    const [levelSum, setLevelSum] = useState(0)
    const [dailyGoal, setDailyGoal] = useState(0)
    const [dailyAchieve, setDailyAchieve] = useState(0)
    const [h,setH]= useState(0)
    const [m,setM]= useState(0)
    const [s,setS]= useState(0)


    useEffect(()=>{
        fetch(`http://localhost:5000/achievement/${param.id}`)
        .then(res=>
            res.json())
        .then((data)=>{
            setAchievement(data[0].achievement)
            setLevel(data[0].level)
            // setPercentLessonDone(data[0].percentLessonDone)
            setName(data[0].name)
            setEmail(data[0].email)
            setData(data[0])
            setHistory(data[1])
            setDailyGoal(data[2])
        })
        .catch((err) => {
            console.log(err)
        });
    },[param.id])

    useEffect(()=>{
        if(data !== undefined){

            function getAchievementByDailyGoal(dailyGoal) {
                var achievement = 0;
                [5, 15, 25, 26].some(function(v, i) {
                    achievement = i ;        
                    return v > dailyGoal; 
                });
                return achievement;
            }
            setDailyAchieve(getAchievementByDailyGoal(dailyGoal))
            function getAchievementByLevel(level) {
                var achievement = 0;
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(function(v, i) {
                    achievement = i;        
                    return v > level; 
                });
                return achievement
            }
            setLevelSum(getAchievementByLevel(data.level));
    
            function getAchievementByHour(hour) {
                var achievement = 0;
                [1, 5, 10, 15, 20, 25, 26].some(function(v, i) {
                    achievement = i;        
                    return v > hour;
                });
                return achievement
            }
            setHour(getAchievementByHour((data.totalTime)/1000/60/60))
    
                function getAchievementByLesson(percent) {
                    var achievement = 0;
                    [25, 50, 75, 100, 110].some(function(v, i) {
                        achievement = i ;        
                        return v > percent; 
                    });
                    return achievement
                }
            setPercent(getAchievementByLesson(data.percentLessonDone))  

            let h = Math.floor(data.totalTime/1000/60/60)
            let m = Math.floor((data.totalTime/1000/60/60 - h)*60)
            let s = Math.floor(((data.totalTime/1000/60/60 - h)*60 - m)*60)
            setH(h)
            setM(m)
            setS(s)
        }
    
    },[data, dailyGoal])
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
                                    <div className="cardContent">{h}h {m}m {s}s</div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='sidebar'>
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
                        </div> */}
                        <div className="streakList">
                            {history?.history?.map((item, index)=>{
                                return (
                                <div className="streakItem" key = {index}>
                                    <div className="date">
                                        <div>{item.date}</div>
                                    </div>
                                    <div className="timeLine">
                                        <div className="hrLine"></div>
                                        <div className="circle active1">
                                            <div className="circleInner"></div>
                                        </div>
                                    </div>
                                    <div className="learnTime">
                                        <img src={require('../../assets/image/time.png')} alt="clock"/>
                                        <div>+{Math.floor((item.time/1000/60/60 - Math.floor(item.time/1000/60/60))*60)}m {Math.floor(((item.time/1000/60/60 - Math.floor(item.time/1000/60/60))*60 - Math.floor((item.time/1000/60/60 - Math.floor(item.time/1000/60/60))*60))*60)}s</div>
                                    </div>
                                    <div className="xp">
                                        <img src={require('../../assets/image/xp.png')} alt= 'xp' />
                                        <div>+{item.exp}xp</div>
                                    </div>
                                </div>
                                )
                            }).reverse()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="profileContent">
                <div className="headerAchieve">
                    <div>
                        <img src="/static/media/user.1513073bc736d11dce70.png" alt="avatar"/>
                        <div className="userAttachInfo">
                            <div className="nameQuestion">
                                <div>{name}</div>
                            </div>
                            <div>
                                <div className="logEmail">
                                    <div>Email:</div>
                                    <div>{email}</div>
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
                                    <div>23</div>
                                </div>
                            </div>
                            <div className="medalCardArea">
                                <div className="learnTime medalCard">
                                    <div className="subHead">
                                            <div>Learning Time</div>
                                            <div>{hour} <span>/</span> 6</div>
                                    </div>
                                    <div className="medalList learnTime">
                                        <div className="medal">
                                            <div>
                                                {hour >= 1 ?
                                                (
                                                    <img src="https://cdn-icons-png.flaticon.com/512/610/610172.png" alt="medal" /> 
                                                ):
                                                (
                                                    <img src="https://i.postimg.cc/jd6rGWJv/311900983-598494861965899-4970635466708121808-n.png"  alt="medal" />
                                                )}
                                            </div>
                                            <div className="hour"> 1 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {hour >= 2 ?
                                                (
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3285/3285494.png"  alt="medal" />
                                                ):
                                                (
                                                    <img src="https://i.postimg.cc/prxZzK7y/311146651-818453952692626-1333288291058931606-n.png"  alt="medal" />
                                                )
                                                }
                                            </div>
                                            <div className="hour"> 5 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {hour >= 3 ?
                                                (
                                                    <img src="https://cdn-icons-png.flaticon.com/512/8711/8711121.png"  alt="medal" />
                                                ):
                                                (
                                                    <img src="https://i.postimg.cc/vB77YcBy/313890839-443000204575221-1552472666283716789-n.png"  alt="medal" />
                                                )
                                                }
                                            </div>
                                            <div className="hour"> 10 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {hour >= 4 ?
                                                (
                                                    <img src="https://cdn-icons-png.flaticon.com/512/4168/4168977.png" alt="medal"/>

                                                ):
                                                (
                                                    <img src="https://i.postimg.cc/V64SZMvJ/311466345-662205648816436-3767100626626098514-n.png"  alt="medal"/>
                                                )}
                                            </div>
                                            <div className="hour"> 15 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {hour >= 5 ?
                                                (
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3871/3871118.png"  alt="medal"/>
                                                ):
                                                (
                                                    <img src="https://i.postimg.cc/h4yz99Nw/311332387-1990532114659417-7859830867438517872-n.png"  alt="medal"/>
                                                )
                                                }
                                            </div>
                                            <div className="hour"> 20 Hours</div>
                                        </div>
                                        <div className="medal">
                                            <div>
                                                {hour >= 6 ?
                                                (
                                                    <img src="https://cdn-icons-png.flaticon.com/512/1959/1959465.png" alt="medal" />
                                                ):
                                                (
                                                    <img src="https://i.postimg.cc/3RLRFTfp/312101655-1557937457984016-3875450400642219435-n.png" alt="medal" />
                                                )
                                                }
                                            </div>
                                            <div className="hour"> 25 Hours</div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="learnTime medalCard">
                                        <div className="subHead">
                                            <div>Daily goal done</div>
                                            <div>{dailyAchieve} <span>/</span> 3</div>
                                        </div>
                                        <div className="medalList">
                                            <div className="medal">
                                                <div className="levelMedal">
                                                    {dailyAchieve >= 1 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/474/474230.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/02jGWpXs/nefaf.png" alt="medal" />
                                                    )
                                                    }
                                                </div>
                                                <div className="hour"> 5 goal</div>
                                            </div>
                                            <div className="medal">
                                            <div className="levelMedal">
                                                {dailyAchieve >= 2 ?
                                                    (
                                                        <img src="https://i.postimg.cc/ZRRYM5FQ/3884739.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/XJr9vWRz/310754268-5626822137354336-2595953448445750652-n.png" alt="medal" />
                                                    )
                                                    }
                                            </div>
                                            <div className="hour"> 15 goal</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {dailyAchieve >= 3 ?
                                                    (
                                                        <img src="https://i.postimg.cc/BnCfxG9w/908824.png"  alt="medal"/>
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/7Z50xwSJ/nihi.png"  alt="medal"/>
                                                    )
                                                    }
                                            </div>
                                            <div className="hour"> 25 goal</div>
                                            </div>
                                        </div>
                                    </div>
                                <div className="levels medalCard">
                                        <div className="subHead">
                                            <div>Learning progress</div>
                                            <div>{percent} <span>/</span> 4</div>
                                        </div>
                                        <div className="medalList">
                                            <div className="medal">
                                                <div className="levelMedal">
                                                    {percent >= 1 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/179/179250.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/zBkvjJ1G/daf.png" alt="medal" />
                                                    )
                                                    }
                                                </div>
                                                <div className="hour"> 25%</div>
                                            </div>
                                            <div className="medal">
                                            <div className="levelMedal">
                                                {percent >= 2 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135728.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/s2nsDK7w/fwwww.png" alt="medal" />
                                                    )
                                                    }
                                            </div>
                                            <div className="hour"> 50%</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {percent >= 3 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3229/3229875.png"  alt="medal"/>
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/kg9jYmzt/faf.png"  alt="medal"/>
                                                    )
                                                    }
                                            </div>
                                            <div className="hour"> 75%</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {percent >= 4 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/7645/7645279.png"  alt="medal"/>
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/hPCB0XzY/54747.png"  alt="medal"/>
                                                    )
                                                    }
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
                                            <div>{levelSum} <span>/</span> 10</div>
                                        </div>
                                        <div className="medalList">
                                            <div className="medal">
                                                <div className="levelMedal">
                                                    {levelSum >= 1 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png"  alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png"  alt="medal" />
                                                    )
                                                }
                                                    <span className="lvNum">1</span>
                                                </div>
                                                <div className="hour"> LV1</div>
                                            </div>
                                            <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 2 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png"  alt="medal"/>
                                                    )
                                                }
                                                <span className="lvNum">2</span>
                                            </div>
                                            <div className="hour"> LV2</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 3 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" alt="medal" />
                                                    )
                                                }
                                                <span className="lvNum">3</span>
                                            </div>
                                            <div className="hour"> LV3</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 4 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png"  alt="medal"/>
                                                    )
                                                }
                                                <span className="lvNum">4</span>
                                            </div>
                                            <div className="hour"> LV4</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 5 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" alt="medal" />
                                                    )
                                                }
                                                <span className="lvNum">5</span>
                                            </div>
                                            <div className="hour"> LV5</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 6 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" alt="medal" />
                                                    )
                                                }
                                                <span className="lvNum">6</span>
                                            </div>
                                            <div className="hour"> LV6</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 7 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" alt="medal" />
                                                    )
                                                }
                                                <span className="lvNum">7</span>
                                            </div>
                                            <div className="hour"> LV7</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 8 ?
                                                        (
                                                            <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                        ):
                                                        (
                                                            <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" alt="medal" />
                                                        )
                                                }
                                                <span className="lvNum">8</span>
                                            </div>
                                            <div className="hour"> LV8</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 9 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" alt="medal" />
                                                    )
                                                }
                                                <span className="lvNum">9</span>
                                            </div>
                                            <div className="hour"> LV9</div>
                                        </div>
                                        <div className="medal">
                                            <div className="levelMedal">
                                                {levelSum >= 10 ?
                                                    (
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3176/3176367.png" alt="medal" />
                                                    ):
                                                    (
                                                        <img src="https://i.postimg.cc/BbXB21f3/dadddd.png" alt="medal" />
                                                    )
                                                    }
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