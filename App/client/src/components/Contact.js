import React from 'react';
import './styles/ContactStyle.css'
import img_contact from './images/contact.JPG'
import Footer from './Footer.js'

const Contact = () =>{
  return (
    <div className='contact'>
      <div className="flex-container-contact">

         <div className="flex-child-contact ">
         <img className="img_contact " src={img_contact} alt="personal finance" />
         </div>

         <div className="flex-child-contact">
         <h2 className="h2-contact">Contact us</h2>
         <h2 className="h2-contact">Our email: </h2>
         <h2 className="h2-contact">Our office no: </h2>
         </div>
       
      </div>
      <Footer/>
    </div>
  )
};

export default Contact;