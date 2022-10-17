import React from 'react';
import Slider from 'react-slick';
import './Home.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {dataFeedback} from './Feedback';


export default function Home(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,

        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
            },
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
            },
        ],
        };
    return(
    <div className='homePage'>
        <section className='home'>
            <div className='content'>
                <h3 className='home'>Take the first step to learn with us </h3>
                <p className='home'>Learn language with VietLang.</p>
                <p className='home'>It's easy and convenient!</p>
                <a href='/#' className='btn'>Learn now</a>
            </div>
            <div className='image'>
                <img src='https://preview.colorlib.com/theme/eclipse/img/xheader-img.png.pagespeed.ic.ungsFL0Q2L.webp' alt='description '/>
                {/* <img src={require('../../assets/image/home-img.svg').default} /> */}
            </div>
        </section>
        <section className='page-description'>
            <h2 className='section-title'>Why VieLang?</h2>
            <div className='description-wrap'>
                <div className='description-item'>
                    <img src={require('../../assets/image/expert.png')} className='description-item-image' alt='description'/>
                    <h3 className='description-item-title'>Expert curricula</h3>
                <p className='description-item-text'>Crafted by language teachers, our grammar-based curriculum will help you gain a deep understanding of your chosen language with no extra effort.</p>
                </div>
                
                <div className='description-item'>
                    <img src={require('../../assets/image/explanation.png')} className='description-item-image' alt='description'/>
                    <h3 className='description-item-title'>Detailed explanations</h3>
                <p className='description-item-text'>VieLang understands the unique complexity of your chosen language. Here, you will learn with clarity and context. No more guessing around.</p>
                </div>

                <div className='description-item'>
                    <img src={require('../../assets/image/learning.png')} className='description-item-image' alt='description'/>
                    <h3 className='description-item-title'>Effective learning</h3>
                <p className='description-item-text'>Target weak areas, review key grammar points, retain everything you learn with our built-in flashcards - all in one app!</p>
                </div>

                <div className='description-item'>
                    <img src={require('../../assets/image/audio.png')} className='description-item-image' alt='description'/>
                    <h3 className='description-item-title'>HD audio</h3>
                <p className='description-item-text'>Learn with lessons voiced by native speakers from the beginning. Don’t let robotic TTS audio compromise your listening and speaking skills.</p>
                </div>

                <div className='description-item'>
                    <img src={require('../../assets/image/story.png')} className='description-item-image' alt='description'/>
                    <h3 className='description-item-title'>Engaging stories</h3>
                <p className='description-item-text'>Practice speaking with hundreds of engaging stories which introduce interesting cultural facts while teaching new words and expressions.</p>
                </div>
                
            </div>
        </section>
        <section className='about'>
            <div className='main'>
                <img className='imgAbout' src={require('../../assets/image/study.jpg')} alt='description'/>
                <div className='inner-container'>
                    <h4 className='aboutH4'>About Us</h4>
                    <h1 className='aboutH1'>VieLang</h1>
                    <p className='text'>
                    Users progress through basic lessons in order and engage with languages through more targeted lessons organized by categories that include topics like color,
                    number, food, and more. Activities within each lesson include repetitive opportunities to learn and practice by choosing the proper vocabulary word from an illustration,
                    hearing words and sentences, finding vocabulary words from a multiple-choice format, tapping letters or words in sequence to type out words or complete fill-in-the-blank answers.
                    </p>
                </div>
            </div>
        </section>
        <section className='slider'>
            <h2 className='slider-title'>What learners like you are saying about VieLang</h2>
            <div className='slider-card'>
                <Slider {...settings}>
                {dataFeedback.map((item, index) =>{
                    return(
                        <div className='card' key={index}>
                            <div className='card-top'>
                                <img src={item.img} alt={item.name} className='card-img'/>
                                <h1>{item.name}</h1>
                            </div>
                            <div className='card-bottom'>
                                <i><p>{item.content}</p></i>
                            </div>
                        </div>
                
                    )
                })}
                </Slider>
                
            </div>
        </section>
    </div>
    )
}