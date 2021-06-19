import React, { createContext, useState } from "react"
import { useHistory } from "react-router-dom"

export const OrderRecContext = createContext()

export const OrderRecProvider = (props) => {

    const [orderRecs, setOrderRecs] = useState([])

    const getOrderRecs = () => {
        return fetch("http://localhost:8000/order_recs", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setOrderRecs)
    }

    const getOrderRecById = id => {
        return fetch(`http://localhost:8000/order_recs/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const updateOrderRec = (salesList, order_rec_id) => {
        return fetch(`http://localhost:8000/order_recs/${order_rec_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(salesList)
         })
    }

    const getRecentOrderRec = () => {
        return fetch(`http://localhost:8000/order_recs/recent`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    return (
        <OrderRecContext.Provider value={{ orderRecs, getOrderRecs, getOrderRecById, updateOrderRec, getRecentOrderRec }}>
            {props.children}
        </OrderRecContext.Provider>
    )
}