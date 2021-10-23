import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Accounts from '../pages/Accounts'
import Loans from '../pages/Loans'
import Analytics from '../pages/Analytics'
import Settings from '../pages/Settings'
import Support from '../pages/Support'
import Login from '../Login'
import Investments from '../pages/Investments'
import Insurance from '../pages/Insurance'

const Routes = () => {
    return (
       <Switch>
           <Route path = '/dashboard' exact component={Dashboard}/>
           <Route path = '/accounts' component={Accounts}/>
           <Route path = '/loans' component={Loans}/>
           <Route path = '/investments' component={Investments}/>
           <Route path = '/insurance' component={Insurance}/>
           <Route path = '/analytics' component={Analytics}/>
           <Route path = '/settings' component={Settings}/>
           <Route path = '/support' component={Support}/>
       </Switch>
    )
}

export default Routes
