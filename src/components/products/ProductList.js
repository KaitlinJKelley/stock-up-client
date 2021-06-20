import React, { useContext, useEffect, useState } from 'react' 
import { Link, useHistory } from 'react-router-dom'
import { ProductContext } from './ProductProvider'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export const ProductList = () => {
    const history = useHistory()
    
    const {products, getProducts, deleteProduct} = useContext(ProductContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getProducts()
    }, [])
    
    return(<>
        <h1>Products</h1>
        
        <Button variant='success'>Add New Product</Button>
        {products.map(product => 
            <>
            <Modal show={show} onHide={handleClose} key={Math.random()}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {product.name}?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" 
                    onClick={evt => {
                        evt.preventDefault()
                        deleteProduct(product.id)
                        handleClose()
                    }}
                >
                    Yes! Delete it
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    No! Don't delete
                </Button>
                </Modal.Footer>
            </Modal>
            
            <ListGroup horizontal key={product.id}>
                <ListGroup.Item variant='light'><Link to={{pathname: `/products/${product.id}`}}>{product.name}</Link></ListGroup.Item>
                <Button variant='danger' onClick={handleShow}>Delete</Button>
            </ListGroup>
            </>
        )}
    </>)
}