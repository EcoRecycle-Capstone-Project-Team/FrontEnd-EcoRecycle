import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import "./HeroSection.css";

export default function HeroSection({ title, subtitle, imageUrl }) {
  return (
    <Container fluid className="hero-container">
      <Row>
        <Col>
          <div
            className="hero-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-text">
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
