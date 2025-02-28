import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const MainNavBar = () => {
  return (
    <Navbar className="bg-white shadow-sm mb-3">
      <Container>
        <Navbar.Brand>Ecommerce</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/create-customer" as={NavLink}>
            Add customer
          </Nav.Link>
          <Nav.Link to="/list-customer" as={NavLink}>
            Customers
          </Nav.Link>
          <Nav.Link to="/products" as={NavLink}>
            Products
          </Nav.Link>
          <Nav.Link to="/create-order" as={NavLink}>
            Add order
          </Nav.Link>
          <Nav.Link to="/list-order" as={NavLink}>
            List order
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
