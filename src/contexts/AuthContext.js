import { createContext, useState } from 'react'

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [loginDetails, setLoginDetails] = useState({
        name: "Mani",
        lastLogin: "2:30am",
        isLogin: true
    });

    return (
        <AuthContext.Provider value={{
            ...loginDetails,
            setLoginDetails
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
