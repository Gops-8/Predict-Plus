import React, {useState,useEffect} from 'react';
import './styles/LoginStyle.css'
import img_login from './images/login.JPG'
import Footer from './Footer.js'
import {Navlink, useHistory} from 'react-router-dom'

const Login = () =>{

  const history=useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenmfa, setTokenmfa] = useState('');


  useEffect(() => {
    fetch('/logout', {
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    }).then((res)=>{

    })
  });

  const loginUser = async (e) => {
      e.preventDefault();
      const res = await fetch('/login',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
             email,
             password,
             tokenmfa
          })
      });
    const data= res.json();

    if(res.status==400 || !data)
    {
      window.alert("Invalid Credentials");
    }
    else
    {
      console.log(data);
      history.push("/dashboard");
    }
  }

  return (
    <div className='login'>
      <div className="flex-container-login">

         <div className="flex-child-login ">
         <img className="img_login " src={img_login} alt="personal finance" />
         </div>

         <div className="flex-child-login">
         <div className="center-login">
      <h1>Login</h1>
      <form method="POST">
        <div className="txt_field-login">
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field-login">
          <input type="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
          <span></span>
          <label>Password</label>
        </div>
        <div className="txt_field-login">
          <input type="text" name="token" value={tokenmfa} onChange={(e) => setTokenmfa(e.target.value)} required/>
          <span></span>
          <label>Token</label>
        </div>
        <div className="pass-login"><a className="pass-login-a" href="/forgot_password">Forgot Password?</a></div>
        <input type="submit" onClick={loginUser} value="Login"/>
        <div className="signup_link-login">
          Not a member? <a href="/register">Signup</a>
        </div>
      </form>
    </div>
         </div>
       
      </div>
      <Footer/>
    </div>
  )
};

export default Login;
