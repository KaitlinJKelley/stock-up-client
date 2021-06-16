import React, { createContext, useState } from "react"

export const ProductContext = createContext()

export const ProductProvider = (props) => {

    const [products, setProducts] = useState([])

    const getProducts = () => {
        return fetch("http://localhost:8000/products", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setProducts)
    }

    return (
        <ProductContext.Provider value={{ products, getProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}