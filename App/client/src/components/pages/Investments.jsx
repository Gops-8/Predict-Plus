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


const Investments = () => {
    return (
        <div>
            <Chatbot/>
            <div className="accounts">
           
           <h1 className="header">Your Investments</h1>
        
        </div>
        <div className="accounts">
            <h2>Account Information</h2>
            <br/>
           <Investment_account_1/>
           <br/>
           <br/>
           <h2>Transactions</h2>
           <br/>
         <Investment_Account_Transactions/>
           <br/>
           <br/>
           <h2>Invested Amount vs Returns</h2>
           <br/>
           <Chart options={chartOptions.options} series={chartOptions.series} type="donut" />
        </div>
        
        </div>
     
    )
}

export default Investments
