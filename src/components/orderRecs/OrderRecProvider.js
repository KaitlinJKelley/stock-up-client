import React, { createContext, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../auth/LoginProvider"

export const OrderRecContext = createContext()

export const OrderRecProvider = (props) => {

    const {checkAuth} = useContext(AuthContext)
    const [orderRecs, setOrderRecs] = useState([])
    const history = useHistory()

    const getOrderRecs = () => {
        return fetch("https://stockupapi.herokuapp.com/order_recs", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(res => {
                checkAuth(res)
                setOrderRecs(res)
            })
    }

    const getOrderRecById = id => {
        return fetch(`https://stockupapi.herokuapp.com/order_recs/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => res.json())
        .then(res => {
            checkAuth(res)
            return res
        })
    }

    const updateOrderRec = (salesList, order_rec_id) => {
        return fetch(`https://stockupapi.herokuapp.com/order_recs/${order_rec_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(salesList)
         })
         .then(res => checkAuth(res))
    }

    const getRecentOrderRec = () => {
        return fetch(`https://stockupapi.herokuapp.com/order_recs/recent`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                checkAuth(res)
                return res
            })
    }

    const addNewOrderRec = orderRec => {
        return fetch("https://stockupapi.herokuapp.com/order_recs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(orderRec)
         })
         .then(res => checkAuth(res))
    }

    const changeStatus = change => {
        return fetch("https://stockupapi.herokuapp.com/order_recs/change_status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(change)
         })
         .then(res => checkAuth(res))
    }

    return (
        <OrderRecContext.Provider value={{ orderRecs, getOrderRecs, getOrderRecById, updateOrderRec, 
                                            getRecentOrderRec, addNewOrderRec, changeStatus }}>
            {props.children}
        </OrderRecContext.Provider>
    )
}