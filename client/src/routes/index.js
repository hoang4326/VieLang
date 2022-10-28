import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';
import Support from '../components/Support/Support';
// import Membership from '../components/Membership/Membership';
import Home from '../components/Home/Home';
import ForgotPassword from '../components/ForgotPass/ForgotPass';
import ResetPassword from '../components/ResetPass/ResetPass';
import Topic from '../components/Lesson/Topic/Topic';
import { Navigate, useNavigate } from 'react-router-dom';
import React, {useEffect} from 'react';
import jwt_decode from "jwt-decode";
import Lesson from '../components/Lesson/Lesson/Lesson';
import Question from '../components/Lesson/Question/Question';
import TopicList from '../components/Admin/Topic/TopicList';
import LessonList from '../components/Admin/Lesson/LessonList';

//Public routes
export const publicRoutes = [
    { path: '/', component: Home},
    { path: '/login', component: LoginForm},
    { path: '/signup', component: SignupForm},
    { path: '/support', component: Support},
    // { path: '/membership', component: Membership},
    { path: '/forgot-password', component: ForgotPassword},
    { path: '/reset-password/:id/:token', component: ResetPassword},
    { path: '/topic', component: Topic},  
    { path: '/topic/:name', component: Lesson},
    { path: '/topic/:name/:id', component: Question},
    { path: '/admin/topicList', component: TopicList},
    { path: '/admin/lessonList', component: LessonList}

]
export const PrivateRoute = ({Component})  => {
    const token = localStorage.getItem('token');
    let navigate = useNavigate();
    useEffect(() => {
        if(!token){
            navigate("/")
        }
    },[navigate, token])
    if(token) {
        const decoded = jwt_decode(token);
        const role = decoded.role;
        if (role === 'admin') {
            return <Component/>
        } else {
            return <Navigate to= '/' />
        }
    }

}