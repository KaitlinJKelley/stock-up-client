import React, { useContext, useEffect, useState } from 'react' 
import { OrderRecContext } from './OrderRecProvider'
import ListGroup from 'react-bootstrap/ListGroup'
import { useParams, Link, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

export const OrderRecDetail = () => {
    const {getOrderRecById, updateOrderRec, changeStatus} = useContext(OrderRecContext)
    const {recId} = useParams()

    const history = useHistory()
    const urlPath = history.location.pathname
    
    const [rec, setRec] = useState({})
    const [editClicked, setEditClicked] = useState(false)
    const [sales, setSales] = useState([])
    const [showOrdered, setShowOrdered] = useState(false)
    const [showReceived, setShowReceived] = useState(false)
    const [orderRecPartId, setOrderRecPartId] = useState(0)

    const handleClose = () => {
        setShowOrdered(false)
        setShowReceived(false)

    }

    const handleShow = event => {
        if (event.target.id === 'markOrdered') {
            setShowOrdered(true)
        }
        else {
            setShowReceived(true)
        }
    }


    useEffect(() => {
        if (showOrdered === false & showReceived === false) {
        // Get the updated order rec
        getOrderRecById(recId)
            .then(setRec)
        }
    }, [showOrdered, showReceived])

    useEffect(() => {
        getOrderRecById(recId)
        .then(setRec)
    }, [])

    useEffect(() => {
        // sets state variable with only necessary data from order rec info to edit
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
        // Goes to the index of the object in the array
        salesCopy[parseInt(event.target.id)].amountSold = event.target.value
        setSales(salesCopy)
    }

    const handleSave = event => {
        event.preventDefault()
        setEditClicked(false)
        updateOrderRec(sales, rec.id)
        .then(() => {
            // To get updated info
            getOrderRecById(recId)
                .then(setRec)
        })
        
    }
    // Using uncontrolled variable prevents modal from re-rendering on every letter typed
    let change = {}
    const handleStatusChange = event => {
        change.recPartId = orderRecPartId
        change[event.target.id] = event.target.value
    }


    return(<>
        <h1>Order Report #{rec.id}</h1>
        <h2>Sales Dates: {rec.sales_start_date} - {rec.sales_end_date}</h2>
        <h3>Parts</h3>
        {/* url path when a user clicks a part from InventoryList */}
        {urlPath === `/recs/${recId}` ? 
        <>
            <ListGroup horizontal key={rec.id}>
            <ListGroup.Item className='w-50' variant='dark'>Name</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>Amount Ordered</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>Ordered On</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>Received On</ListGroup.Item>
            </ListGroup>
            {rec?.orderrecpart_set?.map(part =>
                part.date_ordered !== '2000-01-01' ? 
                <ListGroup horizontal key={part.product_part.company_part.part.id} >
                    <ListGroup.Item className='w-50' variant='light'>{part.product_part.company_part.deleted ? part.product_part.company_part.part.name : <Link to={{pathname: `/inventory/${part.product_part.company_part.id}`}}>{part.product_part.company_part.part.name}</Link>}</ListGroup.Item>
                    <ListGroup.Item className='w-50' variant='light'>{part.part_amount_ordered}</ListGroup.Item>
                    <ListGroup.Item className='w-50' variant='light'>{part.date_ordered}</ListGroup.Item>
                    <ListGroup.Item className='w-50' variant='light'>{part.date_received}</ListGroup.Item>
                </ListGroup>
                :
                ""
            )}
        </>
        : 
        <>
            {/* From url /recent/n, meaning the user is viewing their most recent, potentially open rec */}
            <ListGroup horizontal key={rec.id}>
            <ListGroup.Item className='w-50' variant='dark'>Name</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>Order Rec</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>Amount Ordered</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>In Stock</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>Status</ListGroup.Item>
            </ListGroup>
            {rec?.orderrecpart_set?.map(part =>
            part.date_ordered !== '2000-01-01' ? 
            <>
                <ListGroup horizontal key={part.product_part.company_part.part.id} >
                    <ListGroup.Item className='w-50' variant='light'>{part.product_part.company_part.deleted ? part.product_part.company_part.part.name : <Link to={{pathname: `/inventory/${part.product_part.company_part.id}`}}>{part.product_part.company_part.part.name}</Link>}</ListGroup.Item>
                    <ListGroup.Item className='w-50' variant='light'>{part.part_amount_to_order} {part.product_part.company_part.part.unit_of_measurement.label}</ListGroup.Item>
                    <ListGroup.Item className='w-50' variant='light'>{part.part_amount_ordered} {part.part_amount_ordered === 0 && part.product_part.company_part.part.unit_of_measurement.label}</ListGroup.Item>
                    <ListGroup.Item className='w-50' variant='light'>{part.product_part.company_part.in_inventory} {part.product_part.company_part.part.unit_of_measurement.label}</ListGroup.Item>
                    {part.date_received === null ? 
                        // If date_received is null the user either needs to mark ordered or received
                        part.date_ordered === null ? <Button id='markOrdered' className='w-50' onClick={event => {handleShow(event); setOrderRecPartId(part.id)}}>Mark Ordered</Button> : <Button id='markReceived' className='w-50' onClick={event => {handleShow(event); setOrderRecPartId(part.id)}}>Mark Received</Button> 
                        : 
                        // If received isn't null, then there's nothing else to do for this part
                        <ListGroup.Item className='w-50' variant='light'>Received On: {part.date_received}</ListGroup.Item>
                        
                    }
                    
                </ListGroup>
            </>
            :
            ""
            )}
            <Modal show={showOrdered} onHide={handleClose} id='ordered'>
                <Modal.Header closeButton>
                </Modal.Header>
                    <>
                        <Form.Label type='text'>Date Ordered</Form.Label>
                        <Form.Control id='dateOrdered' type='date' placeholder="yyyy-mm-dd" value={change.dateOrdered && change.dateOrdered} onChange={handleStatusChange}></Form.Control>
                        <Form.Label type='text'>Amount Ordered</Form.Label>
                        <Form.Control id='amountOrdered' value={change.amountOrdered && change.amountOrdered} onChange={handleStatusChange}></Form.Control>
                    </>
                <Modal.Footer>
                <Button variant="secondary" 
                    onClick={evt => {
                        evt.preventDefault()
                        changeStatus(change)
                        .then(() => {change={}; handleClose()})
                    }}
                >
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showReceived} onHide={handleClose} id='received'>
                <Modal.Header closeButton>
                </Modal.Header>
                    <>
                        <Form.Label type='text'>Date Received</Form.Label>
                        <Form.Control id='dateReceived' type='date' placeholder="yyyy-mm-dd" value={change.dateReceived && change.dateReceived} onChange={handleStatusChange}></Form.Control>
                    </> 
    
                <Modal.Footer>
                <Button variant="secondary" 
                    onClick={evt => {
                        evt.preventDefault()
                        changeStatus(change)
                        .then(() => {change={}; handleClose()})
                    }}
                >
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        }
        <h3>Products</h3>
        {editClicked ? <Button onClick={event => {setEditClicked(false); handleSave(event)}} variant='success'>Save Changes</Button> : <Button onClick={() => setEditClicked(true)} variant='warning'>Edit Sales</Button>}
        <ListGroup horizontal>
            <ListGroup.Item className='w-50' variant='dark'>Name</ListGroup.Item>
            <ListGroup.Item className='w-50' variant='dark'>Amount Sold</ListGroup.Item>
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
                    <ListGroup.Item className='w-50' variant='light'>{product.deleted ? product.name : <Link to={{pathname: `/products/${product.id}`}}>{product.name}</Link>}</ListGroup.Item>
                    <ListGroup.Item className='w-50' variant='light'>{product.amount_sold}</ListGroup.Item>
                </ListGroup>
            )}
            </>
        }
    </>)
}