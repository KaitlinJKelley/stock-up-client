import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import {DatabaseContext} from './DatabaseProvider'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

export const DatabaseList = () => {
    const history = useHistory()

    const { getDatabase, database } = useContext(DatabaseContext)
    console.log(database)

    useEffect(() => {
        getDatabase()
    },[])
    
    return(<>
        <h1>All Parts</h1>
        <Button variant='success' onClick={() => history.push('/database/new')}>Add new part</Button>
        {database.map(part => 
        ['sm'].map((breakpoint, idx) => (
        <ListGroup horizontal={breakpoint} className='database' key={idx}>
            <ListGroup.Item>{part.name}</ListGroup.Item>
            <ListGroup.Item>{part.part_number}</ListGroup.Item>
            <ListGroup.Item>{part.vendor.name}</ListGroup.Item>
            {/* Passes part object to InventoryForm */}
            <Link to={{pathname: '/inventory/new', state: {passPart: part}}} variant='success'>Add to inventory</Link>
        </ListGroup>
        ))
        )}
    </>)
}