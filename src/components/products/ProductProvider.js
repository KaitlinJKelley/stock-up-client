import React, { createContext, useContext, useState } from "react"
import { AuthContext } from "../auth/LoginProvider"

export const ProductContext = createContext()

export const ProductProvider = (props) => {
    const {checkAuth} = useContext(AuthContext)

    const [products, setProducts] = useState([])

    const getProducts = () => {
        return fetch("http://localhost:8000/products", {
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
        return fetch(`http://localhost:8000/products/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(getProducts)
    }

    const getProductById = id => {
        return fetch(`http://localhost:8000/products/${id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const addNewProduct = product => {
        return fetch("http://localhost:8000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(product)
         })
         .then(getProducts)
    }

    const updateProduct = product => {
        return fetch(`http://localhost:8000/products/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(product)
         })
            .then(getProducts)
    }

    return (
        <ProductContext.Provider value={{ products, getProducts, deleteProduct, getProductById, addNewProduct, updateProduct }}>
            {props.children}
        </ProductContext.Provider>
    )
}