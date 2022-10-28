import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

export default function DefaultLayout({children}){
    return(
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
}