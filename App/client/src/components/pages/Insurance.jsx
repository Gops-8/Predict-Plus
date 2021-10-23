import React from 'react'
import Chatbot from '../Chatbot'
import './accounts.css'
import Insurance_Account from '../../Assets_Analytics/Insurance_Account'
import Insurance_Account_Transactions from '../../Assets_Analytics/Insurance_Account_Transactions'
import Chart from 'react-apexcharts'

const chartOptions = {
    series: [{
        name: "Account Value",
        data: [62289.25,64425.91,59425.91,56450.47,55476.47,40068.47,140068.47,125068.47]
      }],
     options: {}

  }


const Insurance = () => {
    return (
        <div>
            <Chatbot/>
            <div className="accounts">
           
           <h1 className="header">Your Insurance</h1>
        
        </div>
        <div className="accounts">
            <h2>Account Information</h2>
            <br/>
           <Insurance_Account/>
           <br/>
           <br/>
           <h2>Transactions</h2>
           <br/>
           <Insurance_Account_Transactions/>
           <br/>
           <br/>
           
           
        </div>
        
        </div>
     
    )
}

export default Insurance
