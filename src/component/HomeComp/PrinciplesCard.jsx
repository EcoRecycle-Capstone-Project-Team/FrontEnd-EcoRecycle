import { Container, Row, Col } from "react-bootstrap";
import principlesData from "../../data/featuresData.json";

export default function PrinciplesCard() {
  return (
    <div className="principles-card">
      <Container>
        <Row className="text-center text-container">
          <h2>
            3W of <span className="eco-text">Eco</span>
            <span className="recycle-text">Recycle</span> Principles
          </h2>
        </Row>
        <Row>
          {principlesData.map((principles, index) => (
            <Col
              key={index}
              md={4}
              className="d-flex justify-content-center mb-4"
            >
              <div className="principles-box d-flex align-items-center">
                <div className="principles-image">
                  <img src={principles.imgSrc} alt={principles.imgAlt} />
                </div>
                <div className="principles-content">
                  <h5>{principles.title}</h5>
                  <p>{principles.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
