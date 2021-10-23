import React from 'react';
import Navbar from './components/Navbar';
import {Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Pricing from './components/Pricing';
import Docs from './components/Docs';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Dashboardhome from './components/Dashboardhome';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';

const App = () =>{
  return (
    <>
      <Route path='/dashboard'>
        <Dashboardhome/>
        </Route>
      <Route exact path='/'>
      <Navbar/>
        <Home/>
      </Route>
      <Route path='/about'>
      <Navbar/>
        <About/>
      </Route>
      <Route path='/pricing'>
      <Navbar/>
        <Pricing/>
      </Route>
      <Route path='/docs'>
      <Navbar/>
        <Docs/>
      </Route>
      <Route path='/contact'>
      <Navbar/>
        <Contact/>
      </Route>
      <Route path='/login'>
      <Navbar/>
        <Login/>
      </Route>
      <Route path='/register'>
      <Navbar/>
        <Register/>
      </Route>
      <Route path='/forgot_password'>
        <Navbar/>
        <ForgotPassword/>
        </Route>

        <Route path='/profile'>
        
        <Profile/>
        </Route>
    </>
  )
};

export default App;
