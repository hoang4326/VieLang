import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';
import Support from '../components/Support/Support';
import Membership from '../components/Membership/Membership';
import Home from '../components/Home/Home';
import ForgotPassword from '../components/ForgotPass/ForgotPass';
import ResetPassword from '../components/ResetPass/ResetPass';
import Lesson from '../components/Lesson/Lesson';
import { Navigate } from 'react-router-dom';
import React from 'react';
// import Auth from '../components/Navbar/Navbar';
// import useFetch from "react-fetch-hook"


//Public routes
export const publicRoutes = [
    { path: '/', component: Home},
    { path: '/login', component: LoginForm},
    { path: '/signup', component: SignupForm},
    { path: '/support', component: Support},
    { path: '/membership', component: Membership},
    { path: '/forgot-password', component: ForgotPassword},
    { path: '/reset-password/:id/:token', component: ResetPassword},
    { path: '/lesson', component: Lesson}
    // { path: '/auth', component: Auth},

]

// export default function Role(){
//     const [userData, setUserData] = useState("");
//     useEffect(() => {
//         fetch("http://localhost:5000/userData",{
//             method: "POST",
//             crossDomain: true,
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 "Access-Control-Allow-Origin":"*",
//             },
//             body: JSON.stringify({
//                 token:window.localStorage.getItem("token"),
//             }),
//         })
//         .then((res)=> res.json())
//         .then((data)=>{
//             setUserData(data.data); 
//         });
//     },[]);
//     console.log(userData);
//     return userData;
// }

export const PrivateRoute = ({Component})  => {
    const role = localStorage.getItem('role');
    console.log(role);
    if (role === 'admin') {
        return <Component/>
    } else {
        return <Navigate to= '/' />
    }
}