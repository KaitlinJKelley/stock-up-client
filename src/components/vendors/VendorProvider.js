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

    const getCompanyVendors = () => {
        return fetch("http://localhost:8000/company_vendors", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    const getVendorById = (id) => {
        return fetch(`http://localhost:8000/company_vendors/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
    }

    return (
        <VendorContext.Provider value={{ vendors, getVendors, getCompanyVendors, getVendorById }}>
            {props.children}
        </VendorContext.Provider>
    )
}