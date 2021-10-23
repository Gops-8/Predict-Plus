import React from 'react';
import './styles/AboutStyle.css'
import img_about from './images/dashboard.JPG'
import Footer from './Footer.js'

const About = () =>{
  return (
    <div className='about'>
      <div className="flex-container">

         <div className="flex-child ">
         <img className="img_about " src={img_about} alt="personal finance" />
         </div>

         <div className="flex-child ">
         <h2 className="h2_about">Get consolidated view of all your financial data</h2>
      <h2 className="h2_about">Leverage the power of predictive analytics</h2>
      <h2 className="h2_about">Simple to use UI</h2>
      <h2 className="h2_about">Dashboarding helps in visualization of financial data</h2>
      <h2 className="h2_about">Reommendation depending on your risk apetite</h2>
         </div>
       
      </div>
      <Footer/>
    </div>
  )
};

export default About;
