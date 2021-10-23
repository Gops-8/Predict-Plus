import React,{useEffect,useState} from 'react'
import './table_popularity_based.css'

const Table_performance_based = () => {
    
    const [row1_risk, setrow1_risk] = useState('');
    const [row1_scheme, setrow1_scheme] = useState('');
    const [row1_nav_d, setrow1_nav_d] = useState('');
    const [row1_nav_r, setrow1_nav_r] = useState('');
    const [row1_benchmark, setrow1_benchmark] = useState('');
    const [row1_1y_d,setrow1_1y_d]=useState('');
    const [row1_3y_d,setrow1_3y_d]=useState('');
    const [row1_5y_d,setrow1_5y_d]=useState('');

    const [row2_risk, setrow2_risk] = useState('');
    const [row2_scheme, setrow2_scheme] = useState('');
    const [row2_nav_d, setrow2_nav_d] = useState('');
    const [row2_nav_r, setrow2_nav_r] = useState('');
    const [row2_benchmark, setrow2_benchmark] = useState('');
    const [row2_1y_d,setrow2_1y_d]=useState('');
    const [row2_3y_d,setrow2_3y_d]=useState('');
    const [row2_5y_d,setrow2_5y_d]=useState('');

    const [row3_risk, setrow3_risk] = useState('');
    const [row3_scheme, setrow3_scheme] = useState('');
    const [row3_nav_d, setrow3_nav_d] = useState('');
    const [row3_nav_r, setrow3_nav_r] = useState('');
    const [row3_benchmark, setrow3_benchmark] = useState('');
    const [row3_1y_d,setrow3_1y_d]=useState('');
    const [row3_3y_d,setrow3_3y_d]=useState('');
    const [row3_5y_d,setrow3_5y_d]=useState('');

    const [row4_risk, setrow4_risk] = useState('');
    const [row4_scheme, setrow4_scheme] = useState('');
    const [row4_nav_d, setrow4_nav_d] = useState('');
    const [row4_nav_r, setrow4_nav_r] = useState('');
    const [row4_benchmark, setrow4_benchmark] = useState('');
    const [row4_1y_d,setrow4_1y_d]=useState('');
    const [row4_3y_d,setrow4_3y_d]=useState('');
    const [row4_5y_d,setrow4_5y_d]=useState('');

    const [row5_risk, setrow5_risk] = useState('');
    const [row5_scheme, setrow5_scheme] = useState('');
    const [row5_nav_d, setrow5_nav_d] = useState('');
    const [row5_nav_r, setrow5_nav_r] = useState('');
    const [row5_benchmark, setrow5_benchmark] = useState('');
    const [row5_1y_d,setrow5_1y_d]=useState('');
    const [row5_3y_d,setrow5_3y_d]=useState('');
    const [row5_5y_d,setrow5_5y_d]=useState('');

    useEffect(() => {
        
        fetch('/popularity_based').then(function(response){return response.json();}).then(function(data) {
 
          setrow1_risk(data.row1.risk);
          setrow1_scheme(data.row1.scheme_name);
          setrow1_nav_d(data.row1['latest NAV- Direct']);
          setrow1_nav_r(data.row1['latest NAV- Regular']);
          setrow1_benchmark(data.row1.benchmark);
          setrow1_1y_d(data.row1['1-Year Return(%)- Direct']);
          setrow1_3y_d(data.row1['3-Year Return(%)- Direct']);
          setrow1_5y_d(data.row1['5-Year Return(%)- Direct']);

          setrow2_risk(data.row2.risk);
          setrow2_scheme(data.row2.scheme_name);
          setrow2_nav_d(data.row2['latest NAV- Direct']);
          setrow2_nav_r(data.row2['latest NAV- Regular']);
          setrow2_benchmark(data.row2.benchmark);
          setrow2_1y_d(data.row2['1-Year Return(%)- Direct']);
          setrow2_3y_d(data.row2['3-Year Return(%)- Direct']);
          setrow2_5y_d(data.row2['5-Year Return(%)- Direct']);

          setrow3_risk(data.row3.risk);
          setrow3_scheme(data.row3.scheme_name);
          setrow3_nav_d(data.row3['latest NAV- Direct']);
          setrow3_nav_r(data.row3['latest NAV- Regular']);
          setrow3_benchmark(data.row3.benchmark);
          setrow3_1y_d(data.row3['1-Year Return(%)- Direct']);
          setrow3_3y_d(data.row3['3-Year Return(%)- Direct']);
          setrow3_5y_d(data.row3['5-Year Return(%)- Direct']);

          setrow4_risk(data.row4.risk);
          setrow4_scheme(data.row4.scheme_name);
          setrow4_nav_d(data.row4['latest NAV- Direct']);
          setrow4_nav_r(data.row4['latest NAV- Regular']);
          setrow4_benchmark(data.row4.benchmark);
          setrow4_1y_d(data.row4['1-Year Return(%)- Direct']);
          setrow4_3y_d(data.row4['3-Year Return(%)- Direct']);
          setrow4_5y_d(data.row4['5-Year Return(%)- Direct']);

          setrow5_risk(data.row5.risk);
          setrow5_scheme(data.row5.scheme_name);
          setrow5_nav_d(data.row5['latest NAV- Direct']);
          setrow5_nav_r(data.row5['latest NAV- Regular']);
          setrow5_benchmark(data.row5.benchmark);
          setrow5_1y_d(data.row5['1-Year Return(%)- Direct']);
          setrow5_3y_d(data.row5['3-Year Return(%)- Direct']);
          setrow5_5y_d(data.row5['5-Year Return(%)- Direct']);

        })
      
      });
    
    return (
        <div>
               <h1>Mutual funds based on popularity</h1>

<table id="customers">
  <tr>
    <th>Scheme</th>
    <th>Risk</th>
    <th>Latest NAV-regular</th>
    <th>Latest NAV-direct</th>
    <th>Benchmark</th>
    <th>1-Year Return(%)- Direct</th>
    <th>3-Year Return(%)- Direct</th>
    <th>5-Year Return(%)- Direct</th>

  </tr>
  <tr>
  <td>{row1_scheme}</td>
    <td>{row1_risk}</td>
    <td>{row1_nav_r}</td>
    <td>{row1_nav_d}</td>
    <td>{row1_benchmark}</td>
    <td>{row1_1y_d}</td>
    <td>{row1_3y_d}</td>
    <td>{row1_5y_d}</td>
  </tr>
  <tr>
  <td>{row2_scheme}</td>
    <td>{row2_risk}</td>
    <td>{row2_nav_r}</td>
    <td>{row2_nav_d}</td>
    <td>{row2_benchmark}</td>
    <td>{row2_1y_d}</td>
    <td>{row2_3y_d}</td>
    <td>{row2_5y_d}</td>
  </tr>
  <tr>
  <td>{row3_scheme}</td>
    <td>{row3_risk}</td>
    <td>{row3_nav_r}</td>
    <td>{row3_nav_d}</td>
    <td>{row3_benchmark}</td>
    <td>{row3_1y_d}</td>
    <td>{row3_3y_d}</td>
    <td>{row3_5y_d}</td>
  </tr>
  <tr>
  <td>{row4_scheme}</td>
    <td>{row4_risk}</td>
    <td>{row4_nav_r}</td>
    <td>{row4_nav_d}</td>
    <td>{row4_benchmark}</td>
    <td>{row4_1y_d}</td>
    <td>{row4_3y_d}</td>
    <td>{row4_5y_d}</td>
  </tr>
  <tr>
  <td>{row5_scheme}</td>
    <td>{row5_risk}</td>
    <td>{row5_nav_r}</td>
    <td>{row5_nav_d}</td>
    <td>{row5_benchmark}</td>
    <td>{row5_1y_d}</td>
    <td>{row5_3y_d}</td>
    <td>{row5_5y_d}</td>
  </tr>
  
</table>
        </div>
    )
}

export default Table_performance_based
