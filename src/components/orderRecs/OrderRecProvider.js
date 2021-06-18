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

    return (
        <OrderRecContext.Provider value={{ orderRecs, getOrderRecs, getOrderRecById }}>
            {props.children}
        </OrderRecContext.Provider>
    )
}