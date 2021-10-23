import React, {useState,useEffect} from 'react';
import './styles/ForgotPasswordStyle.css'
import forgot from './images/forgot.JPG'
import Footer from './Footer.js'
import {Navlink, useHistory} from 'react-router-dom'

const ForgotPassword = () =>{

  const history=useHistory();
  const [emailf, setEmailf] = useState('');
  const [passwordnewf, setPasswordnewf] = useState('');
  const [tokenmfaf, setTokenmfaf] = useState('');


  const changePass = async (e) => {
      e.preventDefault();
      const res = await fetch('/changepassword',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
             emailf,
             tokenmfaf,
             passwordnewf
          })
      });
    const data= res.json();

    if(res.status==400 || res.status == 442)
    {
      window.alert("Invalid Credentials");
    }
    else
    {
      window.alert('Password changed succesfully')
      history.push("/login");
    }
  }

  return (
    <div className='login'>
      <div className="flex-container-login">

         <div className="flex-child-login ">
         <img className="img_login " src={forgot} alt="personal finance" />
         </div>

         <div className="flex-child-login">
         <div className="center-login">
      <h1>Forgot Password</h1>
      <form method="POST">
        <div className="txt_field-login">
          <input type="email" name="email" value={emailf} onChange={(e) => setEmailf(e.target.value)} required/>
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field-login">
          <input type="text" name="token" value={tokenmfaf} onChange={(e) => setTokenmfaf(e.target.value)} required/>
          <span></span>
          <label>Token</label>
        </div>
        <div className="txt_field-login">
          <input type="password"  name="password" value={passwordnewf} onChange={(e) => setPasswordnewf(e.target.value)}  required/>
          <span></span>
          <label>New Password</label>
        </div>
        <input type="submit" onClick={changePass} value="Change"/>
      </form>
    </div>
         </div>
       
      </div>
      <Footer/>
    </div>
  )
};

export default ForgotPassword;
