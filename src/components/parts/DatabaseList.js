import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import {DatabaseContext} from './DatabaseProvider'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

export const DatabaseList = () => {
    const history = useHistory()

    const { getDatabase, database } = useContext(DatabaseContext)

    useEffect(() => {
        getDatabase()
    },[])
    
    return(<>
        <h1>All Parts</h1>
        <Button variant='success'>Add new part</Button>
        {database.map(part => 
        ['sm'].map((breakpoint, idx) => (
        <ListGroup horizontal={breakpoint} className='database' key={idx}>
            <ListGroup.Item>{part.name}</ListGroup.Item>
            <ListGroup.Item>{part.part_number}</ListGroup.Item>
            <ListGroup.Item>{part.vendor.name}</ListGroup.Item>
            <Link to={{pathname: '/inventory/new', state: {partId: part.id, partName: part.name, partNumber: part.number, partVendor: part.vendor.name}}} variant='success'>Add to inventory</Link>
        </ListGroup>
        ))
        )}
    </>)
}