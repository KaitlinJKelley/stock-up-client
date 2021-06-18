import React, { createContext, useState } from "react"

export const OrderRecContext = createContext()

export const OrderRecProvider = (props) => {

    const [orderRecs, setOrderRecs] = useState([])

    const getOrderRecs = () => {
        return fetch("http://localhost:8000/order_rec", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setOrderRecs)
    }

    return (
        <OrderRecContext.Provider value={{ orderRecs, getOrderRecs }}>
            {props.children}
        </OrderRecContext.Provider>
    )
}