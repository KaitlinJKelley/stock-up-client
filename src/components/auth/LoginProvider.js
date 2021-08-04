import React, { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const history = useHistory()

    const checkAuth = res => {
        if (res.reset) {
            localStorage.removeItem('lu_token')
            history.push('/login')
        }
    }
    return (
        <AuthContext.Provider value={{ checkAuth }}>
            {props.children}
        </AuthContext.Provider>
    )
}