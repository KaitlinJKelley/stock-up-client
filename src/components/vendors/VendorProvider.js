import React, { createContext, useState } from "react"

export const VendorContext = createContext()

export const VendorProvider = (props) => {

    const [vendors, setVendors] = useState([])

    const getVendors = () => {
        return fetch("http://localhost:8000/vendors", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setVendors)
    }

    return (
        <VendorContext.Provider value={{ vendors, getVendors }}>
            {props.children}
        </VendorContext.Provider>
    )
}