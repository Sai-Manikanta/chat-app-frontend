import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import AuthContextProvider from './contexts/AuthContext'
import './index.css'

ReactDOM.render(
    <AuthContextProvider>
        <Router>
            <App />
        </Router>
    </AuthContextProvider>,
    document.getElementById('root')
)