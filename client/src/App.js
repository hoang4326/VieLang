import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { publicRoutes } from './routes/index';
import { PrivateRoute } from './routes/index';
import  Manage  from './components/Admin/Admin';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


function App() {
    return (
            // eslint-disable-next-line

    <Router>
        <div className="App">
            < Navbar />
            <Routes>
                {publicRoutes.map((route, index) =>{
                    const Page = route.component
                    return <Route key={index} path={route.path} element={<Page />} />
                })}
                <Route path='/admin' element={
                    <PrivateRoute Component={Manage}/>
                } />
            </Routes>
            < Footer />

        </div>
    </Router>
    
);
}

export default App;
