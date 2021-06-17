import React, { useContext, useEffect, useState } from 'react' 
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { InventoryContext } from './InventoryProvider'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const InventoryForm = (props) => {
    const history = useHistory()

    const urlPath = history.location.pathname

    const {getUnitsOfMeasurement, unitsOfMeasurement, addToInventory} = useContext(InventoryContext)

    const location = useLocation()
    let part = null
    if (urlPath === "/inventory/new") {
        const {passPart} = location.state
        part = passPart
    }
    

    const [newInventory, setNewInventory] = useState({
        "name": "",
        "partNumber": "",
        "vendor": "",
        "vendorWebsite": "",
        "partId": `${urlPath === "/inventory/new" ? part.id : 0}`,
        "inInventory": null,
        "minRequired": null,
        "unitOfMeasurement": `${urlPath === "/inventory/new" ? part.unit_of_measurement.id : 0}`,
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

    const handleSave = event => {
        event.preventDefault()
        addToInventory(newInventory)
        history.push('/database')

    }

    return(
        <>
        <h1>New Inventory</h1>
        <Form className="form--login">
            {urlPath === "/inventory/new" ? 
                <>
                    <Form.Label>Part Name:</Form.Label>
                    <Form.Control></Form.Control>
                    <Form.Label>Part Number:</Form.Label>
                    <Form.Control readOnly placeholder={part.part_number}></Form.Control>
                    <Form.Label>Vendor:</Form.Label>
                    <Form.Control readOnly placeholder={part.vendor.name}></Form.Control>
                </>
                 : 
                 <>
                    <Form.Label htmlFor="name">Part Name:</Form.Label>
                    <Form.Control onChange={handleChange} value={newInventory.name} type="text" name="name" className="form-control" required autoFocus></Form.Control>
                    <Form.Label htmlFor="partNumber">Part Number:</Form.Label>
                    <Form.Control onChange={handleChange} value={newInventory.partNumber} type="text" name="partNumber" className="form-control" required autoFocus></Form.Control>
                    <Form.Label htmlFor="vendor">Vendor:</Form.Label>
                    <Form.Control onChange={handleChange} value={newInventory.vendor} type="text" name="vendor" className="form-control" required autoFocus></Form.Control>
                    <Form.Label htmlFor="vendorWebsite">Vendor Website:</Form.Label>
                    <Form.Control onChange={handleChange} value={newInventory.vendorWebsite} type="text" name="vendorWebsite" className="form-control" required autoFocus></Form.Control>
                </>
                 }
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
                    <option value='0'>Unit of Measurement</option>
                    {unitsOfMeasurement.map(unit => <option key={unit.id} value={unit.id}>{unit.label}</option>)}
                </Form.Control>
            
            <Form.Group style={{
                textAlign:"center"
            }}>
            </Form.Group>
            <Button variant='success' className="btn btn-1 btn-sep icon-send"
            onClick={handleSave}
            >Add to Inventory</Button>
        </Form>
        </>
    )
}