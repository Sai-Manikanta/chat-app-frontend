import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import AuthContextProvider from './contexts/AuthContext'
import UploadContextProvider from './contexts/UploadContext'
import ChatContextProvider from './contexts/ChatContext'
import './index.css'

ReactDOM.render(
    <AuthContextProvider>
        <ChatContextProvider>
            <UploadContextProvider>
                <Router>
                    <App />
                </Router>
            </UploadContextProvider>
        </ChatContextProvider>
    </AuthContextProvider>,
    document.getElementById('root')
)