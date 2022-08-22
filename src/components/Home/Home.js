import React from 'react';
import "./Home.css"

export default function Home(){
    return(
        <div class = "hero-content">
            <div class = "containerHome">
                <div class = "hero-slider">
                    {/* item */}
                    <div clas = "hero-slider-item">
                        <h1 class = "hero-title">Educating Students for Success In a Changing World</h1>
                        <p class = "text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error velit quis eos quae, laborum quod magnam cumque, ut, odit eaque animi blanditiis amet quas. Beatae aliquid deserunt placeat repellat quam?</p>
                        <a href = "#" class = "btn hero-btn">Learn More</a>
                    </div>
                    {/* end of item */}
                    {/* item */}
                    <div clas = "hero-slider-item">
                        <h1 class = "hero-title">Together We Make The Difference</h1>
                        <p class = "text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error velit quis eos quae, laborum quod magnam cumque, ut, odit eaque animi blanditiis amet quas. Beatae aliquid deserunt placeat repellat quam?</p>
                        <a href = "#" class = "btn hero-btn">Learn More</a>
                    </div>
                    {/* end of item */}
                </div>
            </div>
        </div>
    )
}