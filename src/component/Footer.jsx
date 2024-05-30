import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 ">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center mb-2">
              <img
                src="src/assets/Logo without title.png"
                width="57"
                height="50"
                alt="Logo"
                className="me-2"
              />
              <span className="h5 mb-0">EcoRecycle</span>
            </div>
            <p className="mb-0">
              Welcome to Estrella, where brilliance meets innovation!
              <br />
              We are a leading company dedicated to delivering exceptional
              products and services to cater to your needs.
            </p>
            <div className="mt-3">
              <a href="#" className="text-light me-3">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-light me-3">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-light me-3">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-light">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5 className="mb-4 green-line">Useful Links</h5>
            <Row>
              <Col>
                <p className="mb-2">
                  <a href="#" className="text-light">
                    Sebaran
                  </a>
                </p>
                <p className="mb-2">
                  <a href="#" className="text-light">
                    Edukasi
                  </a>
                </p>
                <p className="mb-2">
                  <a href="#" className="text-light">
                    Form Pelaporan
                  </a>
                </p>
                <p className="mb-2">
                  <a href="#" className="text-light">
                    About Us
                  </a>
                </p>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <h5 className="mb-4 green-line">Subscribe</h5>
            <p className="mb-2">Email: contact@ecorecycle.com</p>
            <p className="mb-2">Phone: +123 456 7890</p>
            <p className="mb-2">Address: 123 Eco St, Green City, Country</p>
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
