import React, { useContext, useEffect } from 'react'  
import { OrderRecContext } from './OrderRecProvider'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'

export const OrderRecList = () => {

    const history = useHistory()

    const {getOrderRecs, orderRecs} = useContext(OrderRecContext)

    useEffect(() => {
        getOrderRecs()
    }, [])
    console.log(orderRecs)
    return(<>
        <h1>Order Reports</h1>
        <div className='flex'>
            {orderRecs.map(rec => 
            <Card key={rec.id} style={{ maxWidth: '25rem', margin: '2%' }}>
                <Card.Body>
                    <Card.Text>#{rec.id}</Card.Text>
                    <Card.Text>Sales Dates: {rec.sales_start_date} - {rec.sales_end_date}</Card.Text>
                    <Card.Text>Generated On: {rec.date_generated}</Card.Text>
                    <Button onClick={() => history.push(`/recs/${rec.id}`)}>Details</Button>
                </Card.Body>
            </Card>
            )}
        </div>
    </>)
}