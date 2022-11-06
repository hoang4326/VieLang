import './footer.css';
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
    <section className="footer">

    <div className="boxFooter-container">

        <div className="boxFooter">
            <h3>Quick links</h3>
            <Link to="/" className='linka'>Home</Link>
            <Link to="/topic" className='linka'>Lessons</Link>
            <Link to="/support" className='linka'>Contact</Link>
            <Link to="/login" className='linka'>Sign in</Link>
        </div>

        <div className="boxFooter">
            <h3>Follow us</h3>
            <Link to="/#"  className='linka'>Facebook</Link>
            <Link to="/#" className='linka'>Twitter</Link>
            <Link to="/#" className='linka'>Instagram</Link>
        </div>

        <div className="boxFooter">
            <h3>Contact us</h3>
            <p> <i className="fa fa-phone"></i> 0352236746 </p>
            <p> <i className="fa fa-envelope-o"></i> nguyenvantai0717@gmail.com </p>
            <p> <i className="fa fa-map-marker"></i> Golden Park Tower - 2 Pham Van Bach - Cau Giay - Ha Noi </p>
        </div>

    </div>

    <div className="credit"> Copyrights © 2021 - 2022. All rights reserved by VieLang </div>

</section>
    )
}