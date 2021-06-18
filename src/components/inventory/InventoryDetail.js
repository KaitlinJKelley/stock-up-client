import React, { useContext, useEffect, useState } from 'react'  
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link, useHistory, useParams } from 'react-router-dom'
import { InventoryContext } from './InventoryProvider'

export const InventoryDetail = () => {
    const history = useHistory()

    const {getInventoryById} = useContext(InventoryContext)

    const {partId} = useParams()

    const [part, setPart] = useState({})
    const [editClicked, setEditClicked] = useState(false)

    useEffect(() => {
        getInventoryById(partId)
        .then(res => {
            let part = {
                "id": res.id,
                "part": res.part,
                "cost": res.cost.toFixed(2),
                "unitOfMeasurement": res.part.unit_of_measurement.label,
                "inInventory": res.in_inventory,
                "products": res.products,
                "minRequired": res.min_required,
                "rec": res.recent_order_rec_part
            }
            setPart(part)
        })
    }, [])

    const handleChange = event => {
        const partCopy = { ...part }
        partCopy[event.target.name] = event.target.value
        setPart(partCopy)
    }

    const handleSave = event => {
        event.preventDefault()
    }

    return(<>
        {editClicked ? 
            <>
                <Form>
                    <Form.Label>Part Name:</Form.Label>
                    <Form.Control readOnly placeholder={part.part?.name}></Form.Control>
                    <Form.Label>Part Number:</Form.Label>
                    <Form.Control readOnly placeholder={part.part?.part_number}></Form.Control>
                    <Form.Label>Vendor:</Form.Label>
                    <Form.Control readOnly placeholder={part.part?.vendor.name}></Form.Control>
                    <Form.Label>Unit of Measurement:</Form.Label>
                    <Form.Control readOnly placeholder={part.unitOfMeasurement}></Form.Control>
                    <Form.Group>
                        <Form.Label htmlFor="inInventory">Amount currently in stock: </Form.Label>
                        <Form.Control placeholder='0' onChange={handleChange} value={part.inInventory} type="text" name="inInventory" className="form-control" required autoFocus />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="minRequired">Min. required in stock (amount you want to have after ordering) </Form.Label>
                        <Form.Control placeholder='0' onChange={handleChange} value={part.minRequired} type="text" name="minRequired" className="form-control" required autoFocus />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="cost">Cost per unit (USD) </Form.Label>
                        <Form.Control placeholder='0.00' onChange={handleChange} value={part.cost} type="text" name="cost" className="form-control" required autoFocus ></Form.Control>
                    </Form.Group>
                    <Form.Group style={{
                        textAlign:"center"
                    }}>
                    </Form.Group>
                    <Button variant='success' className="btn btn-1 btn-sep icon-send"
                    onClick={handleSave}
                    >Save Changes</Button>
                </Form>
            </> 
            : 
            <>
                <h1>{part.part?.name}</h1>
                <Button variant='warning' onClick={() => setEditClicked(true)}>Edit Part</Button>
                <ListGroup.Item>Part Number: {part.part?.part_number}</ListGroup.Item>
                <ListGroup.Item>Vendor: {part.part?.vendor.name}</ListGroup.Item>
                <ListGroup.Item>In Stock: {part.inInventory}</ListGroup.Item>
                <ListGroup.Item>Min. Required: {part.minRequired}</ListGroup.Item>
                <ListGroup.Item>Unit of Measurement: {part.unitOfMeasurement}</ListGroup.Item>
                <ListGroup.Item>Cost: ${part.cost}</ListGroup.Item>
                <ListGroup.Item>Last Ordered On: {part.rec?.date_ordered}</ListGroup.Item>
                <ListGroup.Item>Last Received On: {part.rec?.date_received}</ListGroup.Item>
                <ListGroup horizontal key={part.id}>
                        <ListGroup.Item className="w-50" variant='dark'>Associated Products</ListGroup.Item>
                    </ListGroup>
                {part.products?.map(product =>
                    <ListGroup horizontal key={product.id} >
                        <ListGroup.Item className="w-50" variant='light'><Link to={{pathname:`/products/${product.id}`}}>{product.name}</Link></ListGroup.Item>
                    </ListGroup>
                )}
            </>
        }
    </>)
}