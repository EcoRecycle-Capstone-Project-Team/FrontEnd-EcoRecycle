import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, getOwnProfileAsync } from "../../redux/authSlice";
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
    <Navbar style={{ background: "#157347" }} collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: "#fff" }}>
          <img
            src="/assets/MainLogo.png"
            width="136"
            height="70"
            className="d-inline-block align-top"
            alt="Main Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title={<span style={{ color: "#fff" }}>Sebaran</span>}
              id="collapsible-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/sebaransampah">
                Sebaran Sampah
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/sebaranlokasi">
                Sebaran Lokasi
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/edukasi" style={{ color: "#fff" }}>
              Edukasi
            </Nav.Link>
            {isLoggedIn && (
              <NavDropdown
                title={<span style={{ color: "#fff" }}>Form Pelaporan</span>}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/pelaporansampah">
                  Form Pelaporan Sampah
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/pelaporanlokasi">
                  Form Pelaporan Lokasi
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link as={Link} to="/aboutus" style={{ color: "#fff" }}>
              About Us
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/dashboard" style={{ color: "#fff" }}>
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isLoggedIn && userProfile && (
              <NavDropdown
                title={
                  <span style={{ color: "#fff" }}>
                    Halo, {userProfile.name}
                  </span>
                }
                id="basic-nav-dropdown"
                style={{ color: "#fff" }}
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "#fff" }}>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
