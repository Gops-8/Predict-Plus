import React from 'react'
import Chatbot from '../Chatbot'
import './investments.css'

import Investment_account_1 from '../../Assets_Analytics/Investment_Account'
import Investment_Account_Transactions from '../../Assets_Analytics/Investment_Account_Transactions'
import Chart from 'react-apexcharts'

const chartOptions = {
    options: {
        labels: [ 'invested amount in INR', 'returns' ]
      },
      series: [ 200000, 5000]
  

  }


const Loans = () => {
    return (
        <div>
            <Chatbot/>
            <div className="accounts">
           
           <h1 className="header">Your Credit Cards and Loans</h1>
        
        </div>
        <div className="accounts">
            <h2>You do not have any credit cards and loans</h2>
            <br/>
           </div>
        
        </div>
     
    )
}

export default Loans

