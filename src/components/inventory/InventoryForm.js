import React, { useContext } from 'react' 
import context from 'react-bootstrap/esm/AccordionContext'
import { useLocation, useParams } from 'react-router-dom'



export const InventoryForm = (props) => {
    const location = useLocation()
    const {partId, partName, partNumber, partVendor} = location.state

    console.log(partName)

    return(
        <form className="form--login">
            <h1>New Inventory</h1>
            <fieldset>
                <label htmlFor="name"> </label>
                <input value = {partName} type="text" id="name" className="form-control"  placeholder="Part Name" required autoFocus />
            </fieldset>
            <fieldset style={{
                textAlign:"center"
            }}>
                <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
            </fieldset>
        </form>
    )
}

// Name:

// Part Number:

// Vendor:

// Vendor URL: 

// In Stock:

// Min. Required:

// Unit of Meas:

// Cost/Unit in USD:

// Category: