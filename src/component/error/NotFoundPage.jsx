import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import notFoundImage from "/assets/not-found.png";

const NotFoundContainer = styled(Container)`
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

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <Row>
        <Col>
          <img src={notFoundImage} alt="404 Not Found" />
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Link to="/">
            <Button variant="success">Go to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
