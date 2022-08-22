import React from 'react';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import Support from './components/Support/Support';
import Membership from './components/Membership/Membership';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
          <Switch>
          <Route path="/support">
                <Support />
            </Route>
            <Route path="/login">
                <LoginForm />
            </Route>
            <Route path="/signup">
                <SignupForm />
            </Route>
            <Route path="/membership">
                <Membership />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
        </Switch>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
