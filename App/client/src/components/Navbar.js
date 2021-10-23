import React from 'react';
import logo from './images/logo.png';
import './styles/NavbarStyle.css'

const Navbar = () =>{
  return (
    <>
     <div className="navbar">
        <a href="/"><img src={logo} height="45" alt="logo"/></a>
        <a className="link"href="/register">Register</a>
        <a className="link"href="/login">Login</a>
        <a className="link"href="/contact">Contact</a>
        <a className="link"href="/docs">Docs</a>
        <a className="link" href="/pricing">Pricing</a>
        <a className="link" href="/about">About</a>
        <a className="link" href="/">Home</a>
     </div>
    </>
  )
};

export default Navbar;
