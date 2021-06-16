import React from 'react' 
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'

export const NavBar = () => {
   return ( <Navbar collapseOnSelect expand="md" bg="light" variant="light">
  <Navbar.Brand href="/">Stock Up</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/recs/new">Start New Order Rec</Nav.Link>
      <Nav.Link href="/recs">Old Order Recs</Nav.Link>
      <NavDropdown title="Parts" id="collapsible-nav-dropdown">
        <NavDropdown.Item href="/inventory">My Inventory</NavDropdown.Item>
        <NavDropdown.Item href="/database">Add Part to Inventory</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Products" id="collapsible-nav-dropdown">
        <NavDropdown.Item href="/inventory">All Products</NavDropdown.Item>
        <NavDropdown.Item href="/database">Add New Product</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>)
}