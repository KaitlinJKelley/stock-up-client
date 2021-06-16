import React, { useContext, useEffect, useState } from 'react' 
import { InventoryContext } from '../inventory/InventoryProvider'
import { ProductContext } from './ProductProvider'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Multiselect } from 'multiselect-react-dropdown'
import { ListGroup } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'

export const ProductForm = () => {
    const {addNewProduct, getProductById, updateProduct} = useContext(ProductContext)
    const {getInventory, inventory} = useContext(InventoryContext)
    const history = useHistory()

    const {productId} = useParams()

    const [product, setProduct] = useState({
        "name": "",
        "parts": []
    })

    const [options, setOptions] = useState([])

    useEffect(() => {
        getInventory()
        if (productId) {
            getProductById(productId)
            .then(res => {
                for (let part in res.parts) {
                    parseInt(part)
                    res.parts[part] = {
                        "name": res.parts[part].name,
                        "partId": res.parts[part].id,
                        "amountUsed": res.parts[part].amount_used 
                    }
                }
                setProduct(res)
            })
        }
    }, [])

    {console.log(product)}

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

    const handleSave = () => {
        updateProduct(product)
        history.push('/products')
    }

    return(<>
        <>
            {productId ? <h1>Edit Product</h1> : <h1>New Product</h1>}
            <Form>
                <Form.Label htmlFor='name'></Form.Label>
                <Form.Control value={product.name} 
                                type="text" name="name" 
                                className="form-control" 
                                placeholder='Product Name' required autoFocus 
                                onChange={handleNameChange}></Form.Control>
                <Form.Label htmlFor='parts'></Form.Label>
                {productId ? <Multiselect name="parts" selectedValues={product.parts} options={options} displayValue="name" onSelect={handleSelectChosen} onRemove={handleSelectChosen}></Multiselect> : <Multiselect name="parts" options={options} displayValue="name" onSelect={handleSelectChosen} onRemove={handleSelectChosen}></Multiselect>}
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
                {productId ? <Button variant='success' type="submit" onClick={handleSave}>Save Changes</Button> : <Button variant='success' type="submit" onClick={handleAdd}>Add Product</Button>}
            </Form> 
        </>
    </>)
}