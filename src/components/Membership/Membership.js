import React from 'react';
import './Membership.css';

export default function Membership(){
    const mystyle = {
        left:"400px",
        borderRight: "0px solid rgba(114,180,236,0.5)"
    };
    return (
        <div className='containerMembership'>
            <div className='contentMembership' >
                <h2 style={{fontWeight: "650"}}>Premium Plans for VieLang</h2>
                <div className='planMembership'>
                    <div className='itemMembership' style={{left:"0px"}}>
                        <a href='#'>
                            <div className='price'>US $15 /MONTH</div>
                            <div className='getitnow'>GET IT NOW!</div>
                        </a>
                    </div>
                    <div className='itemMembership' style={{left:"200px"}} >
                        <a href='#'>
                            <div className='price'>US $40 /QUARTER</div>
                            <div className='getitnow'>GET IT NOW!</div>
                        </a>                    
                    </div>
                    <div className='itemMembership' style={mystyle}>
                        <a href='#'>
                            <div className='price'>US $80 /YEAR</div>
                            <div className='getitnow'>GET IT NOW!</div>
                        </a>
                    </div>
                </div>
                <div  className='planLifetime'>
                    <a href='#' className='membershipA'>
                        <div className='itemLifetime'>
                            <div className='head'>ONE-TIME PURCHASE</div>
                            <div>
                                <span className='textLifetime'>GET IT NOW!</span>
                                <span className='priceLifetime'>US $159.99 / LIFETIME</span>
                                <span className='discountLifetime'>US $299.99</span>
                            </div>
                        </div>
                    </a>
                </div>
                <div className='advantageMembership'>
                    <div>All plans include:</div>
                    <div>Unlimited access to all lessons in VieLang</div>
                    <div>Use on multiple devices</div>
                </div>
            </div>
            
        </div>
    )
}