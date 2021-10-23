import React from 'react';
import './styles/PricingStyle.css'
import img_pricing from './images/pricing.JPG'
import Footer from './Footer.js'

const Pricing = () =>{
  return (
    <div className='pricing'>
      <div className="flex-container-pricing">

         <div className="flex-child-pricing ">
         <img className="img_pricing " src={img_pricing} alt="personal finance" />
         </div>

         <div className="flex-child-pricing">
         <h2 className="h2-pricing">3 pricing plans<br/><br/><br/><br/><br/></h2>
         <h2 className="h2-pricing">Standard <br/><br/> <br/> Premium <br/><br/><br/>   Ultimate</h2>
         </div>
       
      </div>
      <Footer/>
    </div>
  )
};

export default Pricing;