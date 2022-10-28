import React from 'react';
import { publicRoutes } from './routes/index';
import { PrivateRoute } from './routes/index';
import  Manage  from './components/Admin/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
    return (
    <Router>
        {/* <Navbar /> */}
        <div className='App'>
            <Routes>
                {publicRoutes.map((route, index) =>{
                    const Layout = route.layout || DefaultLayout
                    const Page = route.component
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            } />
                            )
                })}
                <Route path='/admin' element={
                    <PrivateRoute Component={Manage}/>
                } />
            </Routes>
        </div>
        {/* <Footer /> */}
    </Router>
    
);
}

export default App;
