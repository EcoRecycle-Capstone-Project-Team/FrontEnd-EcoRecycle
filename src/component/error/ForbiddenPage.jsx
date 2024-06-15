import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import forbiddenImage from "/assets/forbidden.png"; // Pastikan Anda memiliki gambar ini di folder assets

const ForbiddenContainer = styled(Container)`
  text-align: center;
  margin-top: 50px;

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  img {
    max-width: 30%;
    height: auto;
    margin-bottom: 30px;
  }
`;

const ForbiddenPage = () => {
  return (
    <ForbiddenContainer>
      <Row>
        <Col>
          <img src={forbiddenImage} alt="403 Forbidden" />
          <h1>403 - Forbidden</h1>
          <p>You do not have permission to access this page.</p>
          <Link to="/">
            <Button variant="success">Go to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </ForbiddenContainer>
  );
};

export default ForbiddenPage;
