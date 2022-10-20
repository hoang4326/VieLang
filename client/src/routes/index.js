import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';
import Support from '../components/Support/Support';
import Membership from '../components/Membership/Membership';
import Home from '../components/Home/Home';
import ForgotPassword from '../components/ForgotPass/ForgotPass';
import ResetPassword from '../components/ResetPass/ResetPass';
import Topic from '../components/Lesson/Topic/Topic';
import { Navigate } from 'react-router-dom';
import React from 'react';
import jwt_decode from "jwt-decode";
import Lesson from '../components/Lesson/Lesson/Lesson';
import Question from '../components/Lesson/Question/Question';
import AddTopic from '../components/addTopic';

//Public routes
export const publicRoutes = [
    { path: '/', component: Home},
    { path: '/login', component: LoginForm},
    { path: '/signup', component: SignupForm},
    { path: '/support', component: Support},
    { path: '/membership', component: Membership},
    { path: '/forgot-password', component: ForgotPassword},
    { path: '/reset-password/:id/:token', component: ResetPassword},
    { path: '/topic', component: Topic},  
    { path: '/topic/:name/:id', component: Lesson},
    { path: '/question', component: Question},
    { path: '/addTopic', component: AddTopic}

]
export const PrivateRoute = ({Component})  => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const role = decoded.role;
    console.log(role);
    if (role === 'admin') {
        return <Component/>
    } else {
        return <Navigate to= '/' />
    }
}