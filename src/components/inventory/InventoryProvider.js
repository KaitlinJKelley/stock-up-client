import React, { createContext, useContext, useState } from 'react'
import { DatabaseContext } from '../parts/DatabaseProvider'

export const InventoryContext = createContext()

export const InventoryProvider = (props) => {
    const [inventory, setInventory] = useState([])
    const [unitsOfMeasurement, setUnitsOfMeasurement] = useState([])

    const {getDatabase} = useContext(DatabaseContext)

    const addToInventory = (part) => {
        return fetch("http://localhost:8000/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(part)
         })
         .then(getDatabase)
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

    const getInventory = () => {
        return fetch("http://localhost:8000/inventory", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setInventory)
    }

    const checkPart = (part) => {
        return fetch("http://localhost:8000/database/check_part", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(part)
         })
         .then(response => response.json())
    }

    const removeInventory = id => {
        return fetch(`http://localhost:8000/inventory/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getInventory)
    }

    const getInventoryById = id => {
        return fetch(`http://localhost:8000/inventory/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const updateInventory = part => {
        return fetch(`http://localhost:8000/inventory/${part.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(part)
         })
            .then(getInventory)
    }

    return (
        <InventoryContext.Provider value={{ inventory, addToInventory, unitsOfMeasurement, getUnitsOfMeasurement, 
                                            getInventory, checkPart, removeInventory, getInventoryById, updateInventory }}>
            {props.children}
        </InventoryContext.Provider>
    )
}