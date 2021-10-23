import React,{useEffect,useState} from 'react';
import img1 from './images/home.JPG'
import apps from './images/apps.JPG'
import './styles/HomeStyle.css'
import Footer from './Footer';


 

const Home = () =>{
 
  
  
 
  


  
  
  
  return (
    <div>
    
    <ul className="ul_home">
    <li className="li_home">
    <img className="img1 cropped" src={img1} alt="personal finance" />
    </li>
    <li>
      
      <h1 className="h1_home">Welcome to predict plus</h1>
      <br/>
      <br/>
      <h2 className="h2_home">One stop destination for all your financial needs</h2>
      <br/>
      <br/>
      <br/>
      <button className="button button1"  type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/register';
      }}> Try predict plus for free</button>
      <button className="button2 button3" type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='/login';
      }} > Login</button>
     <br/>
     <br/>
      <img className="apps " src={apps} alt="apps" />
    </li>
    </ul>    
       <Footer/>    
    </div>
    
  )
};

export default Home;
