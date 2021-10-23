import React,{useEffect,useState} from 'react'
import ReactDOM  from 'react-dom'
import '../assets/boxicons-2.0.7/css/boxicons.min.css'
import '../assets/css/grid.css'
import '../assets/css/index.css'
import '../assets/css/theme.css'
import {useHistory} from "react-router-dom"

import Layout from './layout/Layout'


const Dashboardhome = () => {

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
        <div>
            <Layout />
        </div>
    )
}

export default Dashboardhome;
