import React from 'react';
import './styles/DocsStyle.css'
import img_docs from './images/docs.JPG'
import Footer from './Footer.js'

const Docs = () =>{
  return (
    <div className='docs'>
      <div className="flex-container-docs">

         <div className="flex-child-docs ">
         <img className="img_docs " src={img_docs} alt="personal finance" />
         </div>

         <div className="flex-child-docs">
         <h2 className="h2-docs">Tutorials can be accessed here</h2>
     
         </div>
       
      </div>
      <Footer/>
    </div>
  )
};

export default Docs;
