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

    return (
        <DatabaseContext.Provider value={{ database, getDatabase }}>
            {props.children}
        </DatabaseContext.Provider>
    )
}