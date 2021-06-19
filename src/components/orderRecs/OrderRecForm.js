import React, { useContext, useEffect, useState } from 'react' 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ProductContext } from '../products/ProductProvider'
import { Col } from 'react-bootstrap'
import { OrderRecContext } from './OrderRecProvider'
import { useHistory } from 'react-router-dom'

export const OrderRecForm = () => {
    const history = useHistory()

    const {getProducts, products} = useContext(ProductContext)
    const {addNewOrderRec} = useContext(OrderRecContext)

    const [sales, setSales] = useState({
        "salesStartDate": "MM/DD/YYY",
        "salesEndDate": "MM/DD/YYY",
        "sales": []
    })

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        let salesCopy = {...sales}
        salesCopy.sales = []
            for (let product in products) {
                salesCopy.sales.push(
                    {
                        "productId": products[product].id,
                        "name": products[product].name,
                        "amountSold": 0
                    }
                )
            }
            setSales(salesCopy)
    }, [products])

    const handleChange = event => {
        let salesCopy = {...sales}
        if (event.target.id === 'salesStartDate' || event.target.id === 'salesEndDate') {
            salesCopy[event.target.id] = event.target.value
        }
        else {
            salesCopy.sales[parseInt(event.target.id)].amountSold = event.target.value
        }
        setSales(salesCopy)
    }

    return(<>
        <h1>New Order Recommendation</h1>
        <Form>
            <Form.Group>
                <Form.Row as='row'>
                    <Col>
                    <Form.Label>Sales Start Date:</Form.Label>
                        <Form.Control className='w-75' id='salesStartDate' type='date' onChange={handleChange}></Form.Control>
                    </Col>
                    <Col>
                    <Form.Label>Sales End Date:</Form.Label>
                        <Form.Control className='w-75' id='salesEndDate' type='date' onChange={handleChange}></Form.Control>
                    </Col>
                </Form.Row>
            </Form.Group>
            <Form.Row as='row'>
                <Col>
                    <Form.Label>Product</Form.Label>
                </Col>
                <Col>
                <Form.Label>Amount Sold</Form.Label>
                </Col>
            </Form.Row>
            {sales.sales?.map(product => 
                <Form.Group key={product.id}>
                    <Form.Row as='row'>
                        <Col>
                            <Form.Control readOnly placeholder={product.name}></Form.Control>
                        </Col>
                        <Col>
                        <Form.Control placeholder='0' id={`${sales.sales.indexOf(product)}`} value={product.amountSold} onChange={handleChange}></Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>
            )}
            <Button variant='success' onClick={() => {addNewOrderRec(sales); history.push(`/`)}}>Calculate Order</Button>
        </Form>
    </>) 
}