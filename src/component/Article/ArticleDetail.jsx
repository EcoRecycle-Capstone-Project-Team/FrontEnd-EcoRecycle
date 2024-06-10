import { useParams } from "react-router-dom";
import articlesData from "../../data/articlesData.json";
import { Container, Image } from "react-bootstrap";
import "./ArticleDetail.css";

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articlesData.find((article) => article.id.toString() === id);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="article-detail">
      <Container className="article-detail">
        <h1 className="article-title">The Importance of Waste Management</h1>
        <h2 className="article-subtitle">
          Educating on the Benefits and Methods
        </h2>
        <Image src="path-to-your-image.jpg" fluid className="article-image" />
        <p className="article-content">
          Waste management is crucial for maintaining the cleanliness and
          sustainability of our environment...
        </p>
        {/* Add more content as needed */}
      </Container>
    </div>
  );
}
