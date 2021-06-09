import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import AuthContextProvider from './contexts/AuthContext'
import UploadContextProvider from './contexts/UploadContext'
import './index.css'

ReactDOM.render(
    <AuthContextProvider>
        <UploadContextProvider>
            <Router>
                <App />
            </Router>
        </UploadContextProvider>
    </AuthContextProvider>,
    document.getElementById('root')
)