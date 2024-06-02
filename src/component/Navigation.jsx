import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Navbar className="bg-white" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="src/assets/MainLogo.png"
            width="136"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Sebaran" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Lokasi TPA</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">
                Lokasi Bank Sampah
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Edukasi</Nav.Link>
            <NavDropdown title="Form Pelaporan" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Form Pelaporan Sampah
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Form Pelaporan Lokasi
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/AboutUs">
              About Us
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link className="get-started" eventKey={2} href="#">
              Get Started
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
