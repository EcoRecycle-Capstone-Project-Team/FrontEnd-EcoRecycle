import { useSelector } from "react-redux";
import featureData from "../../data/featureData.json";
import { Container, Row, Col } from "react-bootstrap";
import FeaturesCard from "./FeaturesCard";

export default function FeaturesItem() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div id="featuresitem" className="features-item">
      <Container>
        <Row className="text-container">
          <h2>
            Program dan Fitur di <span className="eco-text">Eco</span>
            <span className="recycle-text">Recycle</span>
          </h2>
        </Row>
        <Row>
          {featureData.map((feature, index) => (
            <Col
              key={index}
              md={4}
              className="d-flex justify-content-center mb-4"
            >
              <FeaturesCard
                imgSrc={feature.imgSrc}
                imgAlt={feature.imgAlt}
                title={feature.title}
                description={feature.description}
                link={feature.link}
                isLoggedIn={isLoggedIn}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
