import { Switch, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import Status from './pages/Status'
import Login from './pages/Login'
import LastLogins from './pages/LastLogins'

function App() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/status" component={Status} />
            <Route path="/login" component={Login} />
            <Route path="/lastlogins" component={LastLogins} />
        </Switch>
    )
}

export default App
