import React from 'react';
import { publicRoutes } from './routes/index';
import { privateRoutes } from './routes/index';
import { PrivateRoute } from './routes/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import AdminLayout from './components/Layout/AdminLayout/Sidebar';

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
                {privateRoutes.map((route, index)=>{
                    const Layout = route.layout || AdminLayout
                    const Page = route.component
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <PrivateRoute Component = {Page} />
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
        </div>
        {/* <Footer /> */}
    </Router>
    
);
}

export default App;
