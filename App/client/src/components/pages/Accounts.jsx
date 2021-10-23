import React from 'react'
import Chatbot from '../Chatbot'
import './accounts.css'
import Bank_account_1 from '../../Assets_Analytics/Bank_account_1'
import Bank_account_1_transactions from '../../Assets_Analytics/Bank_account_1_transactions'
import Chart from 'react-apexcharts'

const chartOptions = {
    series: [{
        name: "Account Value",
        data: [62289.25,64425.91,59425.91,56450.47,55476.47,40068.47,140068.47,125068.47]
      }],
     options: {}

  }


const Accounts = () => {
    return (
        <div>
            <Chatbot/>
            <div className="accounts">
           
           <h1 className="header">Your Bank Accounts</h1>
        
        </div>
        <div className="accounts">
            <h2>Account Information</h2>
            <br/>
           <Bank_account_1/>
           <br/>
           <br/>
           <h2>Transactions</h2>
           <br/>
           <Bank_account_1_transactions/>
           <br/>
           <br/>
           <h2>Account Value Curve</h2>
           <br/>
           <Chart options={chartOptions.options} series={chartOptions.series} />
        </div>
        
        </div>
     
    )
}

export default Accounts
