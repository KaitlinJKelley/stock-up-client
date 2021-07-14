import React, { useContext, useEffect, useState } from 'react' 
import ListGroup from 'react-bootstrap/ListGroup'
import { useParams } from 'react-router'
import { VendorContext } from './VendorProvider'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'

export const VendorDetail = () => {
    const {getVendorById, updateVendor} = useContext(VendorContext)

    const history = useHistory()

    const [vendor, setVendor] = useState({})
    const [editClicked, setEditClicked] = useState(false)

    const {vendorId} = useParams()

    useEffect(() => {
        getVendorById(vendorId)
        .then(setVendor)
    }, [])

    const handleInputChange = event => {
        const vendorCopy = {...vendor}
        vendorCopy[event.target.name] = event.target.value
        setVendor(vendorCopy)
    }

    const handleSaveClicked = () => {
        setEditClicked(false)
        updateVendor(vendor)
        history.push("/user_vendors")
    }

    return(<>
        <h1>{vendor.name}</h1>
        {editClicked ? 
        <>
        <ListGroup horizontal>
            <b><Form.Label htmlFor="website">Website: </Form.Label></b>
            <Form.Control readOnly placeholder={vendor.website}></Form.Control>
        </ListGroup>
        <Form.Group horizontal>
            <b><Form.Label htmlFor="address">Address: </Form.Label></b>
            <Form.Control name="address" value={vendor.address} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <b><Form.Label htmlFor="salesRepName">Sales Rep: </Form.Label></b>
            <Form.Control name="salesRepName" value={vendor.salesRepName} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <b><Form.Label htmlFor="salesRepPhone">Sales Rep Phone: </Form.Label></b>
            <Form.Control name="salesRepPhone" value={vendor.salesRepPhone} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <b><Form.Label htmlFor="loginUsername">Username on Vendor Site: </Form.Label></b>
            <Form.Control name="loginUsername" value={vendor.loginUsername} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <b><Form.Label htmlFor="loginPassword">Password on Vendor Site: </Form.Label></b>
            <Form.Control name="loginPassword" value={vendor.loginPassword} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Button variant='success' onClick={handleSaveClicked}>Save</Button>
        </>
        : 
        <ListGroup>
            <ListGroup.Item><b>Website:</b> <a href={vendor.website} target="_blank">{vendor.website}</a></ListGroup.Item>
            <ListGroup.Item><b>Address:</b> {vendor.address}</ListGroup.Item>
            <ListGroup.Item><b>Sales Rep:</b> {vendor.salesRepName}</ListGroup.Item>
            <ListGroup.Item><b>Sales Rep Phone:</b> {vendor.salesRepPhone}</ListGroup.Item>
            <ListGroup.Item><b>Username on Vendor Site:</b> {vendor.loginUsername}</ListGroup.Item>
            <ListGroup.Item><b>Password on Vendor Site:</b> {vendor.loginPassword}</ListGroup.Item>
            <Button variant='warning' onClick={() => setEditClicked(true)}>Edit</Button>
        </ListGroup>
        }

    </>)
}