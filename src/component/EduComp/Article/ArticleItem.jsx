/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function ArticleItem({ article }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edukasi/artikel/${article.id}`);
  };

  return (
    <div style={{ padding: "0 10px" }}>
      <Card className="custom-card">
        <Card.Img variant="top" src={article.image} className="card-image" />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-success">
            {article.tag}
          </Card.Subtitle>
          <Card.Title onClick={handleClick} style={{ cursor: "pointer" }}>
            {article.title}
          </Card.Title>
          <div className="author-info">
            <img src="/assets/nasa.jpg" alt="Author" className="author-image" />
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
