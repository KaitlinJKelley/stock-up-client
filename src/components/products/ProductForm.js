import React, { useContext, useState } from 'react' 
import { ProductContext } from './ProductProvider'

export const ProductForm = () => {
    const {addNewProduct} = useContext(ProductContext)

    const [product, setProduct] = useState({
        "name": "",
        "parts": []
    })


    return(<>
        <h1>New Product</h1>
        <Form>
                <Form.Label>Product Name:</Form.Label>
                <Form.Control value={product.name} type="text" name="name" className="form-control" required autoFocus></Form.Control>
                <Form.Label htmlFor='parts'>Parts:</Form.Label>
                <Form.Control as='select' name="parts" value='0' onChange={handleChange}>
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
    </>)
}