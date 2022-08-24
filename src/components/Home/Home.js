import React from 'react';
import './Home.css'


export default function Home(){
    return(
    <div className='homePage'>
        <section className='home'>
            <div className='content'>
                <h3 className='home'>Take the first step to learn with us </h3>
                <p className='home'>Learn language with VietLang.</p>
                <p className='home'>It's easy and convenient!</p>
                <a href='#' className='btn'>Learn now</a>
            </div>
            <div className='image'>
                <img src='https://preview.colorlib.com/theme/eclipse/img/xheader-img.png.pagespeed.ic.ungsFL0Q2L.webp'/>
                {/* <img src={require('../../assets/image/home-img.svg').default} /> */}
            </div>
        </section>
        <section className='page-description'>
            <h2 className='section-title'>Why VieLang?</h2>
            <div className='description-wrap'>
                <div className='description-item'>
                    <img src={require('../../assets/image/expert.png')} className='description-item-image'/>
                    <h3 className='description-item-title'>Expert curricula</h3>
                <p className='description-item-text'>Crafted by language teachers, our grammar-based curriculum will help you gain a deep understanding of your chosen language with no extra effort.</p>
                </div>
                
                <div className='description-item'>
                    <img src={require('../../assets/image/explanation.png')} className='description-item-image'/>
                    <h3 className='description-item-title'>Detailed explanations</h3>
                <p className='description-item-text'>VieLang understands the unique complexity of your chosen language. Here, you will learn with clarity and context. No more guessing around.</p>
                </div>

                <div className='description-item'>
                    <img src={require('../../assets/image/learning.png')} className='description-item-image'/>
                    <h3 className='description-item-title'>Effective learning</h3>
                <p className='description-item-text'>Target weak areas, review key grammar points, retain everything you learn with our built-in flashcards - all in one app!</p>
                </div>

                <div className='description-item'>
                    <img src={require('../../assets/image/audio.png')} className='description-item-image'/>
                    <h3 className='description-item-title'>HD audio</h3>
                <p className='description-item-text'>Learn with lessons voiced by native speakers from the beginning. Don’t let robotic TTS audio compromise your listening and speaking skills.</p>
                </div>

                <div className='description-item'>
                    <img src={require('../../assets/image/story.png')} className='description-item-image'/>
                    <h3 className='description-item-title'>Engaging stories</h3>
                <p className='description-item-text'>Practice speaking with hundreds of engaging stories which introduce interesting cultural facts while teaching new words and expressions.</p>
                </div>
                
            </div>
        </section>
        <section className='about'>
            <div className='about-section'>
                <div className='inner-container'>
                    <h1 className='aboutH1'>About us</h1>
                    <p className='text'>
                    Users progress through basic lessons in order and engage with languages through more targeted lessons organized by categories that include topics like color, number, food, occupation, health, education, music, sports, and more. 
                    </p>
                </div>
            </div>
        </section>
    </div>
    )
}