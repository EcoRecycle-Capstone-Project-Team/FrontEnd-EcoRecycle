import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
      label: "Dashboard",
    },
    {
      to: "/admin/laporan-sampah",
      icon: "fas fa-file-alt",
      label: "Laporan Masuk",
    },
    {
      to: "/admin/laporan-tpa",
      icon: "fas fa-file-alt",
      label: "Data TPA Masuk",
    },
    { to: "/admin/pengguna", icon: "fas fa-users", label: "Pengguna" },
  ];

  return (
    <div className="sidebar bg-light">
      <div className="sidebar-sticky">
        <Nav className="flex-column">
          {navItems.map((item, index) => (
            <Nav.Item key={index}>
              <Nav.Link
                as={Link}
                to={item.to}
                className={location.pathname === item.to ? "active" : ""}
              >
                <i className={item.icon}></i> {item.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
