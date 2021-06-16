import React, { useContext, useEffect } from 'react' 
import { Link, useHistory } from 'react-router-dom'
import { ProductContext } from './ProductProvider'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

export const ProductList = () => {
    const history = useHistory()
    
    const {products, getProducts} = useContext(ProductContext)

    useEffect(() => {
        getProducts()
    }, [])
    
    return(<>
        <h1>Products</h1>
        <Button variant='success'>Add New Product</Button>
        {products.map(product => 
            <ListGroup horizontal key={product.id}>
                <ListGroup.Item variant='light'><Link to={{pathname: `/products/${product.id}`}}>{product.name}</Link></ListGroup.Item>
                <Button variant='danger'>Delete</Button>
            </ListGroup>
        )}
    </>)
}