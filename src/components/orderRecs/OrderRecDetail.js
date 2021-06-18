import React, { useContext, useEffect, useState } from 'react' 
import { OrderRecContext } from './OrderRecProvider'
import ListGroup from 'react-bootstrap/ListGroup'
import { useParams, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap'

export const OrderRecDetail = () => {
    const {getOrderRecById} = useContext(OrderRecContext)
    const {recId} = useParams()
    
    const [rec, setRec] = useState({})
    const [editClicked, setEditClicked] = useState(false)
    const [sales, setSales] = useState([])

    useEffect(() => {
        getOrderRecById(recId)
        .then(setRec)
    }, [])

    useEffect(() => {
        for (let product in rec.products) {
            rec.products[product] = {
                "productId": rec.products[product].id,
                "name": rec.products[product].name,
                "amountSold": rec.products[product].amount_sold
            }
        }
        setSales(rec.products)
    }, [editClicked])

    const handleChange = event => {
        let salesCopy = [...sales]
        salesCopy[parseInt(event.target.id)].amountSold = event.target.value
        setSales(salesCopy)
    }

    return(<>
        <h1>Order Rec #{rec.id}</h1>
        <h2>Sales Dates: {rec.sales_start_date} - {rec.sales_end_date}</h2>
        <h3>Parts</h3>
        <ListGroup horizontal key={rec.id}>
            <ListGroup.Item className="w-50" variant='dark'>Name</ListGroup.Item>
            <ListGroup.Item className="w-50" variant='dark'>Amount Ordered</ListGroup.Item>
            <ListGroup.Item className="w-50" variant='dark'>Ordered On</ListGroup.Item>
            <ListGroup.Item className="w-50" variant='dark'>Received On</ListGroup.Item>
        </ListGroup>
        {rec?.orderrecpart_set?.map(part =>
            <ListGroup horizontal key={part.product_part.company_part.part.id} >
                <ListGroup.Item className="w-50" variant='light'><Link to={{pathname: `/inventory/${part.product_part.company_part.part.id}`}}>{part.product_part.company_part.part.name}</Link></ListGroup.Item>
                <ListGroup.Item className="w-50" variant='light'>{part.part_amount_ordered}</ListGroup.Item>
                <ListGroup.Item className="w-50" variant='light'>{part.ordered_on}</ListGroup.Item>
                <ListGroup.Item className="w-50" variant='light'>{part.received_on}</ListGroup.Item>
            </ListGroup>
        )}
        <h3>Products</h3>
        {editClicked ? <Button onClick={() => {setEditClicked(false)}} variant='success'>Save Changes</Button> : <Button onClick={() => setEditClicked(true)} variant='warning'>Edit Sales</Button>}
        <ListGroup horizontal>
            <ListGroup.Item className="w-50" variant='dark'>Name</ListGroup.Item>
            <ListGroup.Item className="w-50" variant='dark'>Amount Sold</ListGroup.Item>
        </ListGroup>
        {editClicked ? 
            <>
                {sales?.map(sale =>
                <Form.Row as='row' key={sale.id} >
                    <Col>
                        <ListGroup.Item variant='light'>{sale.name}</ListGroup.Item>
                    </Col>
                    <Col>
                        <Form.Control id={`${sales.indexOf(sale)}`} value={sale.amountSold} onChange={event => handleChange(event)}></Form.Control>
                    </Col>
                </Form.Row>
            )}
            </> 
        : 
            <>
                {rec?.products?.map(product =>
                <ListGroup horizontal key={product.id} >
                    <ListGroup.Item className="w-50" variant='light'><Link to={{pathname: `/products/${product.id}`}}>{product.name}</Link></ListGroup.Item>
                    <ListGroup.Item className="w-50" variant='light'>{product.amount_sold}</ListGroup.Item>
                </ListGroup>
            )}
            </>
        }
    </>)
}