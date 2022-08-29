import './Footer.css';
import {
    Link
} from "react-router-dom";

export default function Footer(){
    return (
        // <div className="footer">
        //     <div className='container'>
        //         <div>
        //             <div>
        //                 <p> Copyrights © 2021 - 2022. All rights reserved by NVH
        //                 </p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    <section class="footer">

    <div class="boxFooter-container">

        <div class="boxFooter">
            <h3>Quick links</h3>
            <a href="/" className='linka'>Home</a>
            <a href="/#" className='linka'>Lessons</a>
            <Link to="/membership" className='linka'>Membership</Link>
            <Link to="/support" className='linka'>Support</Link>
            <Link to="/login" className='linka'>Sign in</Link>
        </div>

        <div class="boxFooter">
            <h3>Follow us</h3>
            <a href="/#"  className='linka'>Facebook</a>
            <a href="/#" className='linka'>Twitter</a>
            <a href="/#" className='linka'>Instagram</a>
        </div>

        <div class="boxFooter">
            <h3>Contact us</h3>
            <p> <i class="fa fa-phone"></i> 0352236746 </p>
            <p> <i class="fa fa-envelope-o"></i> nguyenvantai0717@gmail.com </p>
            <p> <i class="fa fa-map-marker"></i> Golden Park Tower - 2 Pham Van Bach - Cau Giay - Ha Noi </p>
        </div>

    </div>

    <div class="credit"> Copyrights © 2021 - 2022. All rights reserved by VieLang </div>

</section>
    )
}