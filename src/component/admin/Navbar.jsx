import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useEffect } from "react";
import { getOwnProfileAsync, logoutUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const NavbarAdmin = () => {
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
    navigate("/admin/login");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className="navbar-custom"
    >
      <Navbar.Brand href="#">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav className="ml-auto" style={{ marginRight: "1rem" }}>
          <NavDropdown
            title={
              <>
                <i className="fas fa-user"></i>{" "}
                {userProfile ? userProfile.name : ""}
              </>
            }
            id="profileDropdown"
          >
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarAdmin;
