import React, { createContext, useState } from "react"

export const DatabaseContext = createContext()

export const DatabaseProvider = (props) => {

    const [database, setDatabase] = useState([])

    const getDatabase = () => {
        return fetch("http://localhost:8000/database", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setDatabase)
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
         .then(getDatabase)
    }

    return (
        <DatabaseContext.Provider value={{ database, getDatabase, addNewDatabasePart }}>
            {props.children}
        </DatabaseContext.Provider>
    )
}