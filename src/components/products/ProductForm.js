import React, { useContext, useEffect, useState } from 'react'
import { InventoryContext } from '../inventory/InventoryProvider'
import { ProductContext } from './ProductProvider'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Multiselect } from 'multiselect-react-dropdown'
import { ListGroup } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'

export const ProductForm = () => {
    const { addNewProduct, getProductById, updateProduct } = useContext(ProductContext)
    const { getInventory, inventory } = useContext(InventoryContext)
    const history = useHistory()

    const { productId } = useParams()

    const [adjustedSelection, setAdjustedSelection] = useState([])

    const [product, setProduct] = useState({
        "name": "",
        "parts": []
    })

    console.log(product.parts)

    const [options, setOptions] = useState([])

    useEffect(() => {
        getInventory()
        if (productId) {
            getProductById(productId)
                .then(res => {
                    // Puts correct data with correct names in array on state variable
                    for (let part in res.parts) {
                        parseInt(part)
                        res.parts[part] = {
                            "name": `${res.parts[part].name}, Measured in: ${res.parts[part].unit_of_measurement.label}`,
                            "partId": res.parts[part].id,
                            "amountUsed": res.parts[part].amount_used,
                            "unitOfMeasurement": res.parts[part].unit_of_measurement.label
                        }
                    }
                    setProduct(res)
                    let selectedValues = res.parts.map(part => {
                        return {
                            partId: part.partId,
                            name: part.name,
                            amountUsed: part.amountUsed
                        }
                    })
                    setAdjustedSelection(selectedValues)
                })
        }
    }, [])

    useEffect(() => {
        let optionsArray = []
        inventory.map(part => 
            // Create options used in multiselect 
            optionsArray.push({
                "partId": part.id,
                "name": `${part.part.name}, Measured in: ${part.part.unit_of_measurement.label}`,
                "amountUsed": 0
            })
        )
        setOptions(optionsArray)
    }, [inventory, adjustedSelection])

    const handleNameChange = event => {
        let productCopy = { ...product }
        productCopy.name = event.target.value
        setProduct(productCopy)
    }

    const handleSelectChosen = selection => {
        let productCopy = { ...product }
        productCopy.parts = selection
        setProduct(productCopy)
    }

    const handleAmountUsedInputChange = event => {
        let productCopy = { ...product }
        productCopy.parts[parseInt(event.target.id)].amountUsed = event.target.value
        setProduct(productCopy)
    }

    const handleAdd = event => {
        addNewProduct(product)
        history.push('/products')
    }

    const handleSave = event => {
        updateProduct(product)
        history.push('/products')
    }

    return (<>
        <>
            <Form>
                {productId ? <h1>Edit Product</h1> : <h1>New Product</h1>}
                <Form.Label htmlFor='name'></Form.Label>
                <Form.Control value={product.name}
                    type="text" name="name"
                    className="form-control"
                    placeholder='Product Name' required autoFocus
                    onChange={handleNameChange}></Form.Control>
                <Form.Label htmlFor='parts'></Form.Label>
                {productId ?
                    <Multiselect name="parts" selectedValues={adjustedSelection} options={options} displayValue="name" onSelect={handleSelectChosen} onRemove={handleSelectChosen}></Multiselect>
                    :
                    <Multiselect name="parts" options={options} displayValue="name" onSelect={handleSelectChosen} onRemove={handleSelectChosen}></Multiselect>}
                <Form.Label></Form.Label>
                <ListGroup horizontal>
                    <Form.Label className='w-50' htmlFor='parts'>Parts</Form.Label>
                    <Form.Label className='w-50' htmlFor='amountUsed'>Amount Used Per Product</Form.Label>
                </ListGroup>
                <Form.Group>
                    {product.parts.map(part =>
                        <ListGroup horizontal key={part.id}>
                            <Form.Control readOnly placeholder={part.name}></Form.Control>
                            <Form.Control placeholder='0'
                                value={part.amountUsed}
                                id={`${product.parts.indexOf(part)}`}
                                type="text" name="amountUsed"
                                onChange={handleAmountUsedInputChange} className="form-control" required autoFocus />
                        </ListGroup>
                    )}
                </Form.Group>

                <Form.Group style={{
                    textAlign: "center"
                }}>
                </Form.Group>
                {productId ? <Button variant='success' onClick={handleSave}>Save Changes</Button> : <Button variant='success' onClick={handleAdd}>Add Product</Button>}
            </Form>
        </>
    </>)
}