import React, {useState, useEffect} from 'react';
import './Lesson.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


export default function Lesson(){
    const [chartData, setChartData] = useState({
        dataset: []
    })
    const [charOptions, setChartOptions] = useState({});
    const percentage = 66;
    // const [percentage, setPercentage] = useState(0);

    // useEffect(() => {
    //     setTimeout(() => {
    //     if (percentage < 100) {
    //         setPercentage(percentage + 1);
    //     }
    //     }, 50);
    // }, [percentage]);

    useEffect(()=>{
        setChartData({
            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                datasets: [
                {
                    label: "goal",
                    backgroundColor: "#c45850",
                    data: [12, 31, 3, 11, 22, 23, 23]
                }
                ]
        });
        setChartOptions({
            responsive: true,
            plugins:{
                legend: { display: false },
            },
            title: {
                display: true,
            }
        })
    },[]);

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
                                        <Bar options={charOptions} data= {chartData} />
                                    </div>
                                    <div className='scoreCard'>
                                        <div className='card'>
                                            <div className='cardInner'>
                                                <div >0</div>
                                                <div >Day Streak</div>
                                            </div>
                                        </div>
                                        <div className='vLine'></div>
                                        <div className='card'>
                                        <div className='cardInner'>
                                                <div >0/10</div>
                                                <div >Achievements</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='skilltree'></div>
                </div>
            </div>
        </div>
    )
}