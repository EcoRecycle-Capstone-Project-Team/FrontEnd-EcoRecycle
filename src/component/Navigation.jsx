import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, getOwnProfileAsync } from "../redux/authSlice";
import { useEffect } from "react";

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOwnProfileAsync(localStorage.getItem("token")));
    }
  }, [dispatch, isLoggedIn]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

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
            <Nav.Link as={Link} to="/edukasi">
              Edukasi
            </Nav.Link>
            <NavDropdown title="Form Pelaporan" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Form Pelaporan Sampah
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Form Pelaporan Lokasi
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/aboutUs">
              About Us
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn && userProfile && (
              <NavDropdown
                title={`Halo, ${userProfile.name}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="get-started" eventKey={2} href="#">
                  Get Started
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
