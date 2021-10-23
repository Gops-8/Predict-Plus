import React from 'react'
import statusCards from '../../assets/JsonData/status-card-data.json'
import statusCards2 from '../../assets/JsonData/status-card-data2.json'
import StatusCard from '../status-card/StatusCard'
import Chart from 'react-apexcharts'
import './dashboard.css'
import Chatbot from '../Chatbot'


const chartOptions = {
    options: {
      labels: [ 'sumAssured in insurance', 'coverAmount of insurance' , 'premiumAmount of insurance']
    },
    series: [ 1500000, 1300000 , 1600000]

  }


const chartOptions2 = {
    options: {
      labels: [ 'current balance in deposit account', 'Investment Value in bonds']
    },
    series: [ 101666.33, 200000]

  }

const Dashboard = () => {
    return (
        
        <div className="dashboard">
            <Chatbot/>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                       {
                           statusCards.map((item,index) =>(
                               <div className="col-6">
                                           
                                   <StatusCard
                                   icon={item.icon}
                                   count={item.count}
                                   title={item.title}
                                   />
                               </div>
                           ))
                       }
                    </div>
                </div>
                <div className="col-6">
                <div className="card full-height">
                    <Chart options={chartOptions.options} series={chartOptions.series} type="donut" />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="row">
                       {
                           statusCards2.map((item,index) =>(
                               <div className="col-6">
                                           
                                   <StatusCard
                                   icon={item.icon}
                                   count={item.count}
                                   title={item.title}
                                   />
                               </div>
                           ))
                       }
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                    <Chart options={chartOptions2.options} series={chartOptions2.series} type="donut" />
                    </div>
                </div>
            </div>
           
            
        </div>
    )
}

export default Dashboard
