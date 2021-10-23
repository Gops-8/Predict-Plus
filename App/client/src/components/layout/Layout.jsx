import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Routes from './Routes'
import { BrowserRouter,Route } from 'react-router-dom'
import './layout.css'
import TopNav from '../topnav/TopNav'
const Layout = () => {
    return (
       <BrowserRouter>
          <Route render={(props)=>(
              <div className='layout'>
                  <div className="layout_content"> 
                      <div className="layout_content_main">
                          <TopNav/>
                          <Sidebar {...props}/>
                          <Routes/>
                      </div>
                  </div>
              </div>
          )}/>
       </BrowserRouter>
    )
}

export default Layout
