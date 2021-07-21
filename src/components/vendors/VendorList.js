import React, { useContext, useEffect, useState } from 'react' 
import { VendorContext } from './VendorProvider'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

export const VendorList = () => {
    const {getCompanyVendors} = useContext(VendorContext)

    const [companyVendors, setCompanyVendors] = useState([])

    useEffect(() => {
        getCompanyVendors()
        .then(setCompanyVendors)
    }, [])

    return(<>
        <h1>Vendors</h1>
        {companyVendors.map(vendor => 
            <ListGroup.Item><Link to={{pathname: `/user_vendors/${vendor.id}`}}>{vendor.vendor.name}</Link></ListGroup.Item>
        )}
    </>)
}