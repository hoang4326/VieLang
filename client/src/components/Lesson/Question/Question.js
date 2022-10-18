import React from 'react';
import './Question.css'

export default function Question(){
    return (
        <div className='mainCourse'>
            <div className='mainContentQ'>
                <div className='switchCourse'>
                    <div className='switchContent'>
                        
                    </div>
                    <div className='switchBottom'>
                        <div className='wrapQuestion'>
                            <div className='wrapInnerQuestion'>
                                <div className='checkPanelQuestion'>
                                    <div className='modelTipArea'>
                                        <div className='checkFlag'>
                                            <img className='default' src={require('../../../assets/image/thinking.png')} alt='thinking'/>
                                        </div>
                                        <div className='textCheckFlag'>
                                            Please choose the correct answer
                                        </div>
                                    </div>
                                    <div className='checkBtn rippleQuestion'>
                                            CHECK
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}