import React, { useContext, useEffect, useState } from 'react' 
import { useParams, Link, useHistory } from 'react-router-dom'
import { ProductContext } from './ProductProvider'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export const ProductDetail = () => {
    const history = useHistory()
    const {productId} = useParams()

    const {getProductById} = useContext(ProductContext)

    const [product, setProduct] = useState({})

    useEffect(() => {
        getProductById(productId)
        .then(setProduct)
    }, [])

    return(<>
        <h1>{product.name}</h1>
        <Button variant='warning' onClick={() => history.push(`/products/edit/${product.id}`)}>Edit Product</Button>
        <ListGroup horizontal key={product.id}>
                <ListGroup.Item className="w-50" variant='dark'>Part Name</ListGroup.Item>
                <ListGroup.Item className="w-50" variant='dark'>Amount Used</ListGroup.Item>
            </ListGroup>
        {product?.parts?.map(part =>
            <ListGroup horizontal key={part.id} >
                <ListGroup.Item className="w-50" variant='light'><Link to={{pathname: `/inventory/${part.id}`}}>{part.name}</Link></ListGroup.Item>
                <ListGroup.Item className="w-50" variant='light'>{part.amount_used}</ListGroup.Item>
            </ListGroup>
        )}
    </>)
}