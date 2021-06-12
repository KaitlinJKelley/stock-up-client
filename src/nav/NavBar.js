import React from "react"
import { Container, Nav, Navbar, NavDropdown, Button} from 'react-bootstrap';

export const NavBar = (props) => {
    return (
        <Container fluid>
            <Navbar collapseOnSelect expand="md" bg="light" variant="light">
            <Navbar.Brand href="/home">Stock Up</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/order_recs/new">Start a New Rec</Nav.Link>
                <Nav.Link href="/order_recs">Old Order Recs</Nav.Link>
                <NavDropdown title="Parts" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="/inventory">Inventory</NavDropdown.Item>
                    <NavDropdown.Item href="/inventory/new">Add Part to Inventory</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Products" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="/products">All Products</NavDropdown.Item>
                    <NavDropdown.Item href="/products/new">New Product</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </Container>
      )
}