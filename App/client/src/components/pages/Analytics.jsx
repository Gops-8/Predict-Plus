import React,{useEffect,useState} from 'react'
import './analytics.css'
import Score from '../../Assets_Analytics/Score'
import Chatbot from '../Chatbot'
import Table_performance_based from '../../Assets_Analytics/Table_performance_based'
import Table_popularity_based from '../../Assets_Analytics/Table_popularity_based'


const Analytics = () => {
   
   
    const [score, setScore] = useState(0);
    const [improv,setImprov]=useState([]);
 
    useEffect(() => {
      
      fetch('/score',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify
        ({"message":[{"member_id":89243,"last_payment_date":"2008-01-01","first_loan_start_date":"1988-11-01","open_acc":17,"loan_payment_till_date":100,"total_loan":650,"account_balance":2932704.5,"mf_details":"[{\"mutual_fund_id\":121145,\"mutual_fund_amount\":6310,\"months_since_default\":22,\"mutual_fund_return\":1243070.0,\"mutual_fund_held_since\":14,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":120391,\"mutual_fund_amount\":12790,\"months_since_default\":22,\"mutual_fund_return\":121505.0,\"mutual_fund_held_since\":17,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Debt Scheme\"},{\"mutual_fund_id\":129736,\"mutual_fund_amount\":13966,\"months_since_default\":22,\"mutual_fund_return\":11731.44,\"mutual_fund_held_since\":16,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":128989,\"mutual_fund_amount\":12503,\"months_since_default\":22,\"mutual_fund_return\":1762923.0,\"mutual_fund_held_since\":10,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":147866,\"mutual_fund_amount\":17539,\"months_since_default\":22,\"mutual_fund_return\":1701283.0,\"mutual_fund_held_since\":12,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":148266,\"mutual_fund_amount\":19310,\"months_since_default\":22,\"mutual_fund_return\":1255150.0,\"mutual_fund_held_since\":8,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Hybrid Scheme\"},{\"mutual_fund_id\":129330,\"mutual_fund_amount\":4278,\"months_since_default\":22,\"mutual_fund_return\":551862.0,\"mutual_fund_held_since\":16,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":146609,\"mutual_fund_amount\":11551,\"months_since_default\":22,\"mutual_fund_return\":11551.0,\"mutual_fund_held_since\":13,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":126399,\"mutual_fund_amount\":6300,\"months_since_default\":22,\"mutual_fund_return\":5859.0,\"mutual_fund_held_since\":7,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":128924,\"mutual_fund_amount\":15075,\"months_since_default\":22,\"mutual_fund_return\":1100475.0,\"mutual_fund_held_since\":9,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":144337,\"mutual_fund_amount\":13875,\"months_since_default\":22,\"mutual_fund_return\":3898875.0,\"mutual_fund_held_since\":14,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Debt Scheme\"},{\"mutual_fund_id\":125328,\"mutual_fund_amount\":10910,\"months_since_default\":22,\"mutual_fund_return\":9600.8,\"mutual_fund_held_since\":12,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":146595,\"mutual_fund_amount\":3192,\"months_since_default\":22,\"mutual_fund_return\":20748.0,\"mutual_fund_held_since\":11,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":107525,\"mutual_fund_amount\":19538,\"months_since_default\":22,\"mutual_fund_return\":18561.1,\"mutual_fund_held_since\":5,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":143433,\"mutual_fund_amount\":14459,\"months_since_default\":2,\"mutual_fund_return\":2212227.0,\"mutual_fund_held_since\":1,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Others\"},{\"mutual_fund_id\":118318,\"mutual_fund_amount\":16057,\"months_since_default\":22,\"mutual_fund_return\":15254.15,\"mutual_fund_held_since\":5,\"mutual_fund_risk\":\"Moderate\",\"mutual_fund_category\":\"Debt Scheme\"}]"}]})
    }).then(function(response){return response.json();}).then(function(data) {
  
      setScore(data.score);
      setImprov(data.improve);
       console.log(data.score); 
    })


    
});
   
   
    return (
       <div>
         <Chatbot/>
       <div className="analytics">
           
           <h1>Your Financial Performance Score</h1>
           <Score value = {score} />
        <h2>{improv[0]}</h2>
        <h2>{improv[1]}</h2>
        </div>
        <div className="analytics">
           <Table_performance_based/>
        </div>
        <div className="analytics">
           <Table_popularity_based/>
        </div>
        
       
        </div>
    )
}

export default Analytics
