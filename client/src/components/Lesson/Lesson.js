import React from 'react';
import './Lesson.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BarChart from './BarChart';

export default function Lesson(){
    const percentage = 15;

    return (
        <div className='lesson'>
            <div className='mainContent'>
                <div className='unitList'>
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
                                        <CircularProgressbar value={percentage} text={`${percentage}%`} />
                                    </div>
                                </div>
                                <div className='vLine'></div>
                                <div className='recordContent'>
                                    <div className='dayGoalArea'>
                                        <div>DAILY GOAL</div>
                                    </div>
                                    <div className='chart'>
                                        <BarChart/>
                                    </div>
                                    <div className='scoreCard'>
                                        <div className='cardLesson'>
                                            <div className='cardInner'>
                                                <div >1</div>
                                                <div >Day Streak</div>
                                            </div>
                                        </div>
                                        <div className='vLine'></div>
                                        <div className='cardLesson'>
                                        <div className='cardInner'>
                                                <div >0 / 10</div>
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
                                    <div id='id_1' className='oneUnit _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1'>
                                                <div >
                                                    <div className='imgArea _1'>
                                                        <img className='icon' alt='icon' src='http://web.archive.org/web/20220920115031/https://webjson.lingodeer.com/mediaSource/static/images/unitPic/UnitIcons/1/81@2x.png' />
                                                    </div>
                                                    <div className='unitName _1'>
                                                        Basic 1
                                                    </div>
                                                    <div className='lessonProgressText'>
                                                        0 / 3
                                                    </div>
                                                    <div className='hrLine'></div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div id='id_3' className='oneUnit _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1'>
                                                <div>
                                                    <div className='imgArea _1'>
                                                        <img className='icon' alt='icon' src='http://web.archive.org/web/20220920115032if_/https://webjson.lingodeer.com/mediaSource/static/images/unitPic/UnitIcons/1/83@2x.png' />
                                                    </div>
                                                    <div className='unitName _1'>
                                                        Basic 3
                                                    </div>
                                                    {/* <div className='lessonProgressText'>
                                                        "0 / 3"
                                                    </div> */}
                                                    <div className='hrLine'></div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div id='id_5' className='oneUnit _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1'>
                                                <div>
                                                    <div className='imgArea _1'>
                                                        <img className='icon' alt='icon' src='http://web.archive.org/web/20220920084302if_/https://webjson.lingodeer.com/mediaSource/static/images/unitPic/UnitIcons/1/6@2x.png' />
                                                    </div>
                                                    <div className='unitName _1'>
                                                        Food
                                                    </div>
                                                    {/* <div className='lessonProgressText'>
                                                        "0 / 3"
                                                    </div> */}
                                                    <div className='hrLine'></div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div id='id_7' className='oneUnit _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1'>
                                                <div>
                                                    <div className='imgArea _1'>
                                                        <img className='icon' alt='icon' src='http://web.archive.org/web/20220921012354/https://webjson.lingodeer.com/mediaSource/static/images/unitPic/UnitIcons/1/10@2x.png' />
                                                    </div>
                                                    <div className='unitName _1'>
                                                        Question
                                                    </div>
                                                    {/* <div className='lessonProgressText'>
                                                        0 / 3
                                                    </div> */}
                                                    <div className='hrLine'></div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='oneUnit alphabet _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1 _1'>
                                                <div>
                                                    <div className='unitName active alphabet ripple'>
                                                        ALPHABET
                                                    </div>
                                                    <div className='hrLine'></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div id='id_2' className='oneUnit _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1'>
                                                <div>
                                                    <div className='imgArea _1'>
                                                        <img className='icon' alt='icon' src='http://web.archive.org/web/20220920084301if_/https://webjson.lingodeer.com/mediaSource/static/images/unitPic/UnitIcons/1/82@2x.png' />
                                                    </div>
                                                    <div className='unitName _1'>
                                                        Basic 2
                                                    </div>
                                                    {/* <div className='lessonProgressText'>
                                                        "0 / 3"
                                                    </div> */}
                                                    <div className='hrLine'></div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div id='id_4' className='oneUnit _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1'>
                                                <div>
                                                    <div className='imgArea _1'>
                                                        <img className='icon' alt='icon' src='http://web.archive.org/web/20220920084301if_/https://webjson.lingodeer.com/mediaSource/static/images/unitPic/UnitIcons/1/45@2x.png' />
                                                    </div>
                                                    <div className='unitName _1'>
                                                        Greetings
                                                    </div>
                                                    {/* <div className='lessonProgressText'>
                                                        "0 / 3"
                                                    </div> */}
                                                    <div className='hrLine'></div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                    <div id='id_6' className='oneUnit _1' onClick="window.location='/#';" style={{cursor: "pointer"}}>
                                        <div className='rippleOuterCus rippleOuter_1 _1'>
                                            <div className='rippleCus ripple_1'>
                                                <div>
                                                    <div className='imgArea _1'>
                                                        <img className='icon' alt='icon' src='http://web.archive.org/web/20220920084301if_/https://webjson.lingodeer.com/mediaSource/static/images/unitPic/UnitIcons/1/82@2x.png' />
                                                    </div>
                                                    <div className='unitName _1'>
                                                        Animal
                                                    </div>
                                                    {/* <div className='lessonProgressText'>
                                                        "0 / 3"
                                                    </div> */}
                                                    <div className='hrLine'></div>
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