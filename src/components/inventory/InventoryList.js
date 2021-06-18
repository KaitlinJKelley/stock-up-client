import React, { useContext, useEffect } from 'react' 
import { InventoryContext } from './InventoryProvider'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { useHistory, Link } from 'react-router-dom'

export const InventoryList = () => {
    const history = useHistory()

    const {getInventory, inventory, removeInventory} = useContext(InventoryContext)

    useEffect(() => {
        getInventory()
    }, [])



    return (<>
        <h1>Inventory</h1>
        <Button variant='success' onClick={() => history.push('/database')}>Add new part</Button>
        {inventory.map(part => 
        ['sm'].map((breakpoint, idx) => (
        <ListGroup horizontal={breakpoint} className='database' key={idx}>
            <ListGroup.Item><Link to={{pathname: `/inventory/${part.id}`}}>{part.part.name}</Link></ListGroup.Item>
            <ListGroup.Item>{part.part.part_number}</ListGroup.Item>
            <ListGroup.Item>{part.part.vendor.name}</ListGroup.Item>
            <ListGroup.Item>{part.in_inventory} {part.part.unit_of_measurement.label} in stock</ListGroup.Item>
            <Button id={part.id} onClick={event => removeInventory(event.target.id)} variant='danger'>Remove</Button>
        </ListGroup>
        ))
        )}
        </>
    )
}