/* eslint-disable react/prop-types */
import articlesData from "../../../data/articlesData.json";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./ArticleDetail";

export default function RecommendedArticles({ currentArticleId }) {
  const navigate = useNavigate();

  const recommendedArticles = articlesData.filter(
    (article) => article.id.toString() !== currentArticleId
  );

  const handleArticleClick = (id) => {
    navigate(`/edukasi/artikel/${id}`);
  };

  return (
    <Container className="recommended-articles-container">
      <h2 className="recommended-articles-title">Recommended Articles</h2>
      <Row>
        {recommendedArticles.slice(0, 4).map((article) => (
          <Col key={article.id} xs={12} sm={6} md={3}>
            <Card
              className="recommended-article-card"
              onClick={() => handleArticleClick(article.id)}
            >
              <Card.Img
                variant="top"
                src={article.image}
                className="recommended-article-image"
              />
              <Card.Body>
                <Card.Subtitle className="mb-2 text-success">
                  {article.tag}
                </Card.Subtitle>
                <Card.Title>{article.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
