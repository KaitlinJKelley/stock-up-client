import React, { useContext, useEffect, useState } from 'react' 
import ListGroup from 'react-bootstrap/ListGroup'
import { useParams } from 'react-router'
import { VendorContext } from './VendorProvider'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export const VendorDetail = () => {
    const {getVendorById} = useContext(VendorContext)
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

    return(<>
        <h1>{vendor.vendor?.name}</h1>
        {editClicked ? 
        <>
        <ListGroup horizontal>
            <Form.Label htmlFor="website">Website: </Form.Label>
            <Form.Control readOnly placeholder={vendor.vendor?.website}></Form.Control>
        </ListGroup>
        <Form.Group horizontal>
            <Form.Label htmlFor="phone">Phone: </Form.Label>
            <Form.Control name="phone" value={vendor.phone} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <Form.Label htmlFor="address">Address: </Form.Label>
            <Form.Control name="address" value={vendor.address} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <Form.Label htmlFor="sales_rep_name">Sales Rep: </Form.Label>
            <Form.Control name="sales_rep_name" value={vendor.sales_rep_name} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <Form.Label htmlFor="sales_rep_phone">Sales Rep Phone: </Form.Label>
            <Form.Control name="sales_rep_phone" value={vendor.sales_rep_phone} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <Form.Label htmlFor="login_username">Username: </Form.Label>
            <Form.Control name="login_username" value={vendor.login_username} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Form.Group horizontal>
            <Form.Label htmlFor="login_password">Password: </Form.Label>
            <Form.Control name="login_password" value={vendor.login_password} onChange={handleInputChange}></Form.Control>
        </Form.Group>
        <Button variant='success' onClick={() => setEditClicked(true)}>Save</Button>
        </>
        : 
        <ListGroup>
            <ListGroup.Item>Website: <a href={vendor.vendor?.website} target="_blank">{vendor.vendor?.website}</a></ListGroup.Item>
            <ListGroup.Item>Phone: {vendor.phone}</ListGroup.Item>
            <ListGroup.Item>Address: {vendor.address}</ListGroup.Item>
            <ListGroup.Item>Sales Rep: {vendor.sales_rep_name}</ListGroup.Item>
            <ListGroup.Item>Sales Rep Phone: {vendor.sales_rep_phone}</ListGroup.Item>
            <ListGroup.Item>Username: {vendor.login_username}</ListGroup.Item>
            <ListGroup.Item>Password: {vendor.login_password}</ListGroup.Item>
            <Button variant='warning' onClick={() => setEditClicked(true)}>Edit</Button>
        </ListGroup>
        }

    </>)
}