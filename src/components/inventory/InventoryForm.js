import React, { useContext, useEffect, useState } from 'react' 
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { InventoryContext } from './InventoryProvider'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const InventoryForm = (props) => {
    const history = useHistory()

    const {getUnitsOfMeasurement, unitsOfMeasurement, addToInventory} = useContext(InventoryContext)

    const location = useLocation()
    const {part} = location.state

    const [newInventory, setNewInventory] = useState({
        "partId": part.id,
        "inInventory": null,
        "minRequired": null,
        "unitOfMeasurement": part.unit_of_measurement.id,
        "cost": null
    })

    useEffect(() => {
        getUnitsOfMeasurement()
    }, [])

    const handleChange = event => {
        const newInventoryCopy = { ...newInventory }
        newInventoryCopy[event.target.name] = event.target.value
        setNewInventory(newInventoryCopy)
    }

    const handleSave = () => {
        addToInventory(newInventory)
        history.push('/database')

    }

    return(
        <>
        <h1>New Inventory</h1>
        <Form className="form--login">
                <Form.Label>Part Name:</Form.Label>
                <Form.Control readOnly placeholder={part.name}></Form.Control>
                <Form.Label>Part Number:</Form.Label>
                <Form.Control readOnly placeholder={part.part_number}></Form.Control>
                <Form.Label>Vendor:</Form.Label>
                <Form.Control readOnly placeholder={part.vendor.name}></Form.Control>
                <Form.Group>
                    <Form.Label htmlFor="inInventory">Amount currently in stock: </Form.Label>
                    <Form.Control placeholder='0' onChange={handleChange} value={newInventory.inInventory} type="text" name="inInventory" className="form-control" required autoFocus />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="minRequired">Min. required in stock (amount you want to have after ordering) </Form.Label>
                    <Form.Control placeholder='0' onChange={handleChange} value={newInventory.minRequired} type="text" name="minRequired" className="form-control" required autoFocus />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="cost">Cost per unit (USD) </Form.Label>
                    <Form.Control placeholder='0.00' onChange={handleChange} value={newInventory.cost} type="text" name="cost" className="form-control" required autoFocus ></Form.Control>
                </Form.Group>
                <Form.Label htmlFor='unitOfMeasurement'>Unit of measurement: </Form.Label>
                <Form.Control as='select' name="unitOfMeasurement" value={`${newInventory.unitOfMeasurement}`} onChange={handleChange}>
                    {unitsOfMeasurement.map(unit => <option key={unit.id} value={unit.id}>{unit.label}</option>)}
                </Form.Control>
            
            <Form.Group style={{
                textAlign:"center"
            }}>
            </Form.Group>
            <Button variant='success' className="btn btn-1 btn-sep icon-send" type="submit" 
            onClick={handleSave}
            >Add to Inventory</Button>
        </Form>
        </>
    )
}