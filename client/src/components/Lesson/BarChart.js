import React  from 'react';
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

export default function Chart(){
    return(
        <Bar data= {
            {labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                datasets: [
                {
                    label: "goal",
                    backgroundColor: "#c45850",
                    data: [3, 0, 0, 0, 0, 0, 0]
                }
                ]}
        } 
        height="2px"
        width="2px"
        options={
            {
                responsive: true,
                plugins:{
                    legend: { display: false },
                },
                title: {
                    display: true,
                },
                scales: {
                    y: {
                        max: 100,
                        min: 0,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        }  />
    )
}