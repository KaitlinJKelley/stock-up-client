import React, { createContext, useState } from 'react'

export const InventoryContext = createContext()

export const InventoryProvider = (props) => {
    const [inventory, setInventory] = useState([])

    const addToInventory = (part) => {
        return fetch("http://localhost:8000/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(part)
         })
    }

    return (
        <InventoryContext.Provider value={{ inventory, addToInventory }}>
            {props.children}
        </InventoryContext.Provider>
    )
}