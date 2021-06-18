import React, { useContext, useEffect } from 'react'  
import { OrderRecContext } from './OrderRecProvider'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'

export const OrderRecList = () => {

    const {getOrderRecs, orderRecs} = useContext(OrderRecContext)

    useEffect(() => {
        getOrderRecs()
    }, [])
    console.log(orderRecs)
    return(<>
        <h1>Order Recommendation Reports</h1>
        <Button variant='success'>Add new order rec</Button>
        <div className='flex'>
            {orderRecs.map(rec => 
            <Card key={rec.id} style={{ maxWidth: '25rem', margin: '2%' }}>
                <Card.Body>
                    <Card.Text>Sales Dates: {rec.sales_start_date} - {rec.sales_end_date}</Card.Text>
                    <Card.Text>Generated On: {rec.date_generated}</Card.Text>
                    <Button>Details</Button>
                </Card.Body>
            </Card>
            )}
        </div>
    </>)
}