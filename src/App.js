import { Switch, Route } from 'react-router-dom'
import ProtectRoute from './components/ProtectRoute'

// pages
import Home from './pages/Home'
import Status from './pages/Status'
import Login from './pages/Login'
import LastLogins from './pages/LastLogins'
import NotFound from './pages/NotFound'

function App() {
    return (
        <Switch>
            <ProtectRoute path="/" component={Home} exact />
            <ProtectRoute path="/status" component={Status} />
            <ProtectRoute path="/lastlogins" component={LastLogins} />
            <Route path="/login" component={Login} />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default App
