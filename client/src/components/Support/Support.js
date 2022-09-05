import React from 'react';

import "./Support.css";

export default function Support(){
    return (
        <section className='contact'>
            <div className='content'>
                <h2>Contact Us</h2>
                <br/>
                <p>Please get in touch and our expert support team will answer all your questions.</p>
            </div>
            <div className='containerSupport'>
                <div className='contactInfo'>
                    <div className='box'>
                        <div className='icon'><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                        <div className='text'>
                            <h3>Address</h3>
                            <p>Golden Park Tower - 2 Pham Van Bach - Cau Giay - Ha Noi</p>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='icon'><i className="fa fa-phone" aria-hidden="true"></i></div>
                        <div className='text'>
                            <h3>Phone</h3>
                            <p>0352236746</p>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='icon'><i className="fa fa-envelope-o" aria-hidden="true"></i></div>
                        <div className='text'>
                            <h3>Email</h3>
                            <p>nguyenvantai0717@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="contactForm">
                    <form>
                        <h2>Send Message</h2>
                        <div className="inputBox">
                            <input type='text' className='support'  required='required'/>
                            <span>Full name</span>
                        </div>
                        <div className="inputBox">
                            <input type='text' className='support' required='required'/>
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <textarea required='required'></textarea>
                            <span>Type your message...</span>
                        </div>
                        <div className="inputBox">
                            <input type='submit' name='' value='Send'/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )

    
}