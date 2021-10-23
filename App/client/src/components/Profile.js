import React,{useState,useEffect} from 'react';
import Sidebar from './sidebar/Sidebar'
import { BrowserRouter,Route } from 'react-router-dom'
import './styles/ProfileStyle.css'
import TopNav from './topnav/TopNav'
import {useHistory} from "react-router-dom"
import Routes from './layout/Routes';

const Profile = () =>{
  
  const history = useHistory();
    const [userData,setUserData] = useState({});

   const callDashboardPage = async () => {
         try{
               const res = await fetch('/about',{
                   method:"GET",
                   headers:{
                       Accept:"application/json",
                       "Content-Type":"application/json"
                   },
                   credentials:"include"
               });
               const data = await res.json();
               setUserData(data);
               console.log(data);
               
              

               if(res.status!=200)
               {
                   const error = new Error(res.error);
                   throw error;
               }
         }
         catch(err)
         {
                console.log(err);
                history.push("/login");
         }
   }
   
    useEffect(() => {
       callDashboardPage();
   }, [])    
  
  
  
  return (
    <BrowserRouter>
          <Route render={(props)=>(
              <div className='layout'>
                  <div className="layout_content"> 
                      <div className="layout_content_main">
                          <TopNav/>
                          
                         <h1 className="title">My Profile</h1>
                         <br/>
                         <br/>
                         <br/>
                         <h2>Name - {userData.name} </h2>
                         <br/>
                         <h2>Email - {userData.email} </h2>
                         <br/>
                         <h2>Pan - {userData.pan} </h2>
                         <br/>
                         <h2>Mobile No. - {userData.phone} </h2>

                      </div>
                  </div>
              </div>
          )}/>
       </BrowserRouter>
  )
};

export default Profile;
