import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "./Support.css";

export default function Support(){
    const form = useRef();
    const MySwal = withReactContent(Swal);

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_akg4op4', 'template_zfbas73', form.current, '_AbHr5vqx_N_ioM-j')
            .then((result) => {
                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Login successfully!</i>,
                    icon: 'success'
                });
            form.current.reset();
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        };
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
                <div className="contactForm" >
                    <form onSubmit={sendEmail} ref={form}>
                        <h2>Send Message</h2>
                        <div className="inputBox">
                            <input type='text' className='support'  required='required' name='fullName' />
                            <span>Full name</span>
                        </div>
                        <div className="inputBox">
                            <input type='email' className='support' required='required' name='email'/>
                            <span>Email</span>
                        </div>
                        <div className="inputBox">
                            <input type='text' className='support' required='required' name='phone'/>
                            <span>Phone Number</span>
                        </div>
                        <div className="inputBox">
                            <textarea required='required' name='message'></textarea>
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