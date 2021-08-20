import React, { createContext, useContext, useState } from "react"
import { AuthContext } from "../auth/LoginProvider"

export const ProductContext = createContext()

export const ProductProvider = (props) => {
    const {checkAuth} = useContext(AuthContext)

    const [products, setProducts] = useState([])

    const getProducts = () => {
        return fetch("https://stockupapi.herokuapp.com/products", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(res => {
                checkAuth(res)
                setProducts(res)
            })
    }

    const deleteProduct = id => {
        return fetch(`https://stockupapi.herokuapp.com/products/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => {
            checkAuth(res)
            getProducts()
        })
    }

    const getProductById = id => {
        return fetch(`https://stockupapi.herokuapp.com/products/${id}`, {
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

    const addNewProduct = product => {
        return fetch("https://stockupapi.herokuapp.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(product)
         })
         .then(res => res.json())
         .then(res => {
            checkAuth(res)
            getProducts()
        })
    }

    const updateProduct = product => {
        return fetch(`https://stockupapi.herokuapp.com/products/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(product)
         })
         .then(res => res.json())
         .then(res => {
            checkAuth(res)
            getProducts()
        })
    }

    return (
        <ProductContext.Provider value={{ products, getProducts, deleteProduct, getProductById, addNewProduct, updateProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}