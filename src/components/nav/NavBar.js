import React, { useContext, useEffect, useState } from 'react' 
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { OrderRecContext } from '../orderRecs/OrderRecProvider'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useHistory } from 'react-router-dom'

export const NavBar = (props) => {
  const history = useHistory()

  const {getRecentOrderRec} = useContext(OrderRecContext)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const newOrderRecAllowed = () => {
    getRecentOrderRec()
    .then(res => {
      if (res.date_received) {
        history.push('/recs/new')
      }
      else {
        setShow(true)
      }
    })

  }

   return ( 
   <>
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Navbar.Brand href="/">Stock Up</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={newOrderRecAllowed}>Start New Order Rec</Nav.Link>
          <Nav.Link href="/recs">Old Order Recs</Nav.Link>
          <NavDropdown title="Parts" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/inventory">My Inventory</NavDropdown.Item>
            <NavDropdown.Item href="/database">Add Part to Inventory</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Products" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/products">All Products</NavDropdown.Item>
            <NavDropdown.Item href="/products/new">Add New Product</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Modal show={show} onHide={handleClose} key={Math.random()}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Please close your open order recommendation before opening a new one</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" 
            onClick={evt => {
                evt.preventDefault()
                handleClose()
            }}
        >
            Close
        </Button>
        </Modal.Footer>
    </Modal>
</>)
}