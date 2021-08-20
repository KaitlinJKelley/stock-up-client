import React, { createContext, useContext, useState } from "react"
import { AuthContext } from "../auth/LoginProvider"

export const VendorContext = createContext()

export const VendorProvider = (props) => {

    const [vendors, setVendors] = useState([])
    const {checkAuth} = useContext(AuthContext)

    const getVendors = () => {
        return fetch("https://stockupapi.herokuapp.com/vendors", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(res => {
                checkAuth(res)
                setVendors(res)
            })
    }

    const getCompanyVendors = () => {
        return fetch("https://stockupapi.herokuapp.com/company_vendors", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
        .then(res => {
            checkAuth(res)
            return res.json()
        })
    }

    const getVendorById = (id) => {
        return fetch(`https://stockupapi.herokuapp.com/company_vendors/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(res => {
                checkAuth(res)
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
        return fetch(`https://stockupapi.herokuapp.com/company_vendors/${vendor.id}`, {
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