import React from 'react';
import './Lesson.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Lesson(){
    const percentage = 66;
    // const [percentage, setPercentage] = useState(0);

    // useEffect(() => {
    //     setTimeout(() => {
    //     if (percentage < 100) {
    //         setPercentage(percentage + 1);
    //     }
    //     }, 50);
    // }, [percentage]);
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
                                <div className='recordContent'></div>
                            </div>
                        </div>
                    </div>
                    <div className='skilltree'></div>
                </div>
            </div>
        </div>
    )
}