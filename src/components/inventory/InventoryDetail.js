import React, { useContext, useEffect, useState } from 'react'  
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { Link, useHistory, useParams } from 'react-router-dom'
import { InventoryContext } from './InventoryProvider'

export const InventoryDetail = () => {
    const history = useHistory()

    const {getInventoryById} = useContext(InventoryContext)

    const {partId} = useParams()

    const [part, setPart] = useState({})

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

    return(<>
        <h1>{part.part?.name}</h1>
        <Button variant='warning' onClick={() => history.push(`/products/edit/${part.id}`)}>Edit Part</Button>
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
    </>)
}