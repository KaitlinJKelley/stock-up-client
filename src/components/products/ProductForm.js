import React, { useContext, useEffect, useState } from 'react' 
import { InventoryContext } from '../inventory/InventoryProvider'
import { ProductContext } from './ProductProvider'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Multiselect } from 'multiselect-react-dropdown'
import { ListGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export const ProductForm = () => {
    const {addNewProduct} = useContext(ProductContext)
    const {getInventory, inventory} = useContext(InventoryContext)
    const history = useHistory()

    const [product, setProduct] = useState({
        "name": "",
        "parts": []
    })

    const [options, setOptions] = useState([])

    useEffect(() => {
        getInventory()
    }, [])

    useEffect(() => {
        let options = []
        inventory.map(part => 
           options.push({
                "partId": part.id,
                "name": part.part.name
            } )   
        )
        setOptions(options)
    }, [inventory])

    const handleNameChange = event => {
        let productCopy = {...product}
        productCopy.name = event.target.value
        setProduct(productCopy)
    }

    const handleSelectChosen = selection => {
        let productCopy = {...product}
        productCopy.parts = selection
        setProduct(productCopy)
    }

    const handleAmountUsedInputChange = event => {
        let productCopy = {...product}
        productCopy.parts[parseInt(event.target.id)].amountUsed = event.target.value
        setProduct(productCopy)
    }

    const handleAdd = () => {
        addNewProduct(product)
        history.push('/products')
    }

    return(<>
        <h1>New Product</h1>
        <Form>
            <Form.Label htmlFor='name'></Form.Label>
            <Form.Control value={product.name} 
                            type="text" name="name" 
                            className="form-control" 
                            placeholder='Product Name' required autoFocus 
                            onChange={handleNameChange}></Form.Control>
            <Form.Label htmlFor='parts'></Form.Label>
            <Multiselect name="parts" options={options} displayValue="name" onSelect={handleSelectChosen} onRemove={handleSelectChosen}></Multiselect>
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
                textAlign:"center"
            }}>
            </Form.Group>
            <Button variant='success' type="submit" onClick={handleAdd}
            >Add Product</Button>
        </Form>
    </>)
}