import React, { createContext, useState } from 'react'

export const InventoryContext = createContext()

export const InventoryProvider = (props) => {
    const [inventory, setInventory] = useState([])
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([])

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

    const getUnitsOfMeasurement = () => {
        return fetch("http://localhost:8000/units", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setUnitsOfMeasurement)
    }

    return (
        <InventoryContext.Provider value={{ inventory, addToInventory, unitsOfMeasurement, getUnitsOfMeasurement }}>
            {props.children}
        </InventoryContext.Provider>
    )
}