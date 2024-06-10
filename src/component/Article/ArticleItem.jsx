/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function ArticleItem({ article }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edukasi/artikel/${article.id}`);
  };

  return (
    <div style={{ padding: "0 10px" }} onClick={handleClick}>
      <Card className="custom-card">
        <Card.Img variant="top" src={article.imageUrl} className="card-image" />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {article.tag}
          </Card.Subtitle>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>
          <div className="author-info">
            <img
              src="https://via.placeholder.com/30"
              alt="Author"
              className="author-image"
            />
            <div>
              <div>{article.author}</div>
              <div>{article.date}</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
