import React, { createContext, useContext, useState } from "react"
import { AuthContext } from "../auth/LoginProvider"

export const DatabaseContext = createContext()

export const DatabaseProvider = (props) => {

    const [database, setDatabase] = useState([])
    const {checkAuth} = useContext(AuthContext)

    const getDatabase = () => {
        return fetch("http://localhost:8000/database", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(res => {
                checkAuth(res)
                setDatabase(res)
            })
    }

    const addNewDatabasePart = part => {
        return fetch("http://localhost:8000/database", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(part)
         })
         .then(res => {
            checkAuth(res)
            getDatabase()
        })
    }

    return (
        <DatabaseContext.Provider value={{ database, getDatabase, addNewDatabasePart }}>
            {props.children}
        </DatabaseContext.Provider>
    )
}