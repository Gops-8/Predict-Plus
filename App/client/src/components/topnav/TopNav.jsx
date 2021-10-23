import React from 'react'
import Dropdown from '../dropdown/Dropdown'
import './topnav.css'
import {Link} from 'react-router-dom'
import notificaitons from '../../assets/JsonData/notification.json'
import user_menus from '../../assets/JsonData/user_menus.json'
import ThemeMenu from '../thememenu/ThemeMenu'
const renderNotificationItem = (item,index) => (
    <a href={item.route} key={index}>
    <div className="notification-item" key={index}>
         <i className={item.icon}></i>
         <span>{item.content}</span>
    </div>
    </a>
)

const TopNav = () => {
    return (
        <div className="topnav">
            <div className="topnav_right">
                <div className="topnav_right-item">
                     <Dropdown
                     className='dropdown_user'
                     icon='bx bx-user'
                     contentData={user_menus}
                     renderItems={(item,index)=> renderNotificationItem(item,index) }
                     />
                </div>
                <div className="topnav_right-item">

                </div>
            </div>
        </div>
    )
}

export default TopNav
