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
  // Makes sure most recent order rec is closed before the user can start a new one
  const newOrderRecAllowed = () => {
    getRecentOrderRec()
    .then(res => {
      // If there are no existing order recs for this company
      if (res.error === 'no order rec found') {
        history.push('/recs/new')
        return(<></>)
      }
      // If any part doesn't have a received date, break out of loop and display message
      for (let i=0; i < res.orderrecpart_set.length; i++) {
        if (res.orderrecpart_set[i].date_received === null) {
          setShow(true)
          return(<></>)
        }
      }
      // Got through loop = all parts marked received; start new rec
      history.push('/recs/new')
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
          <Nav.Link href="/recs">Previous Orders</Nav.Link>
          <NavDropdown title="Parts" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="/inventory">My Inventory</NavDropdown.Item>
            <NavDropdown.Item href="/database">Add Part to Inventory</NavDropdown.Item>
            <NavDropdown.Item href="/user_vendors">Vendors</NavDropdown.Item>
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