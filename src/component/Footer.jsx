import { Container, Row, Col } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 ">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center mb-2">
              <img
                src="/assets/Logo without title.png"
                width="57"
                height="50"
                alt="Logo"
                className="me-2"
              />
              <span className="h5 mb-0">EcoRecycle</span>
            </div>
            <p className="mb-0">
              Bersama Ecorecycle, melindungi lingkungan kita bersama
              <br />
              Bersama Kelola Sampah, Mewujudkan Bumi yang Lebih Baik
            </p>
            <div className="mt-3">
              <a
                href="https://github.com/EcoRecycle-Capstone-Project-Team"
                target="_blank"
                className="text-light me-3"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5 className="mb-4 green-line">Useful Links</h5>
            <Row>
              <Col>
                <p className="mb-2">
                  <Link to="/sebaranlokasi" className="text-light">
                    Sebaran Lokasi
                  </Link>
                </p>
                <p className="mb-2">
                  <Link to="/sebaransampah" className="text-light">
                    Sebaran Sampah
                  </Link>
                </p>
                <p className="mb-2">
                  <Link to="/edukasi" className="text-light">
                    Edukasi
                  </Link>
                </p>
                <p className="mb-2">
                  <Link to="/aboutus" className="text-light">
                    About Us
                  </Link>
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <h5 className="mb-4 green-line">Subscribe</h5>
            <p className="mb-2">Email: contact@ecorecycle.com</p>
            <p className="mb-2">No. Telp: +6282162205010</p>
            <p className="mb-2">Alamat: Jakarta Pusat</p>
          </Col>
        </Row>
        <hr className="my-3" />
        <div className="text-center">
          <small>&copy; 2024 EcoRecycle All rights reserved</small>
        </div>
      </Container>
    </footer>
  );
}
