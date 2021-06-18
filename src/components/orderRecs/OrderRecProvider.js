import React, { createContext, useState } from "react"

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
        return fetch(`http://localhost:8000/products/${order_rec_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(salesList)
         })
    }

    return (
        <OrderRecContext.Provider value={{ orderRecs, getOrderRecs, getOrderRecById, updateOrderRec }}>
            {props.children}
        </OrderRecContext.Provider>
    )
}