import React from 'react';
import "./Support.css";

export default function Support(){
    return (
        <section className='contact'>
            <div className='content'>
                <h2>Contact us</h2>
                <p>Hello</p>
            </div>
            <div className='container'>
                <div className='contactInfo'>
                    <div className='box'>
                        <div className='icon'><i class="fa fa-map-marker" aria-hidden="true"></i></div>
                        <div className='text'>
                            <h3>Address</h3>
                            <p>Golden Park Tower - 2 Phạm Văn Bạch</p>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='icon'><i class="fa fa-phone" aria-hidden="true"></i></div>
                        <div className='text'>
                            <h3>Phone</h3>
                            <p>0352236746</p>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='icon'><i class="fa fa-envelope-o" aria-hidden="true"></i></div>
                        <div className='text'>
                            <h3>Email</h3>
                            <p>nguyenvantai0717@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    
}