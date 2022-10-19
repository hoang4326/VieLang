import React from 'react';
import './Question.css'

export default function Question(){
    return (
        <div className='mainCourse'>
            <div className='mainContentQ'>
                <div className='switchCourse'>
                    <div className='switchContentQ'>
                        <div className='dyComponent'>
                            <div className='modelContainer rankA check'>
                                <div className='modelContainerWord wordModel1'>
                                    <div className='wordTitle'>
                                        <div class="wordTitleTranslation"> Select&nbsp;&nbsp;"Vietnam"</div>
                                    </div>
                                    <div className='optionsArea'>
                                            <div className='option'>
                                                <div className='item'>
                                                    <img src='https://d27hu3tsvatwlt.cloudfront.net/mfsource/vt/main/lesson_png/vt-p-1-120003326522064.png' alt='image' />
                                                    <div className='tip other'>
                                                        <div className='rankC'>
                                                            <span className='spanQuestion'>Việt Nam</span>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
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