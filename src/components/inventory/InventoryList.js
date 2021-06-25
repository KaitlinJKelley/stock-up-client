import React, { useContext, useEffect, useState } from 'react' 
import { InventoryContext } from './InventoryProvider'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { useHistory, Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

export const InventoryList = () => {
    const history = useHistory()

    const {getInventory, inventory, removeInventory} = useContext(InventoryContext)

    const [show, setShow] = useState(false)
    const [partId, setPartId] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = event => {
        setPartId(event.target.id)
        setShow(true)
    };

    useEffect(() => {
        getInventory()
    }, [])

    return (<>
        <h1>Inventory</h1>
        <Button variant='success' onClick={() => history.push('/database')}>Add new part</Button>
        {inventory.map(part => 
            ['sm'].map((breakpoint, idx) => (
            <>
                <ListGroup horizontal={breakpoint} className='database' key={idx}>
                    <ListGroup.Item><Link to={{pathname: `/inventory/${part.id}`}}>{part.part.name}</Link></ListGroup.Item>
                    <ListGroup.Item>{part.part.part_number}</ListGroup.Item>
                    <ListGroup.Item>{part.part.vendor.name}</ListGroup.Item>
                    <ListGroup.Item>{part.in_inventory} {part.part.unit_of_measurement.label} in stock</ListGroup.Item>
                    <Button id={part.id} onClick={event => handleShow(event)} variant='danger'>Remove</Button>
                </ListGroup>
            </>
            ))
        )}
        <Modal show={show} onHide={handleClose} key={Math.random()}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>Deleting this part will remove from all of your products, but it will still be on your reports</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" 
                onClick={evt => {
                    evt.preventDefault()
                    removeInventory(partId)
                    handleClose()
                }}
            >
                Delete it!
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Don't delete
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}