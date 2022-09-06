import LoginForm from '../components/LoginForm/LoginForm';
import SignupForm from '../components/SignupForm/SignupForm';
import Support from '../components/Support/Support';
import Membership from '../components/Membership/Membership';
import Home from '../components/Home/Home';
import Manage from '../components/admin';
import {
    Routes,
    Route,
} from "react-router-dom";
export default function Router() {
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/support' element={<Support/>}/>
        <Route path='/membership' element={<Membership/>}/>
        <Route path='/admin' element={<Manage/>}/>
    </Routes>
}