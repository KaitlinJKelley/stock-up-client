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
            .then(res => {
                const vendor = {
                    "id": res.id,
                    "name": res.vendor.name,
                    "salesRepName": res.sales_rep_name,
                    "salesRepPhone": res.sales_rep_phone,
                    "loginUsername": res.login_username,
                    "loginPassword": res.login_password,
                    "website": res.vendor.website,
                    "address": res.address
                }
                return vendor
            })
    }

    const updateVendor = vendor => {
        return fetch(`http://localhost:8000/company_vendors/${vendor.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(vendor)
         })
            .then(getCompanyVendors)
    }

    return (
        <VendorContext.Provider value={{ vendors, getVendors, getCompanyVendors, getVendorById, updateVendor }}>
            {props.children}
        </VendorContext.Provider>
    )
}