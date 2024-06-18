import { useNavigate, useParams } from "react-router-dom";
import articlesData from "../../../data/articlesData.json";
import { Container, Image } from "react-bootstrap";
import Navigation from "../../Navigation";
import Footer from "../../Footer";
import "./ArticleDetail.css";
import { BsArrowLeft } from "react-icons/bs";
import ShareIcons from "../SharedIcon/ShareIcon";
import RecommendedArticles from "./RecommendedArticles";
import NotFoundPage from "../../error/NotFoundPage";

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articlesData.find((article) => article.id.toString() === id);
  const navigate = useNavigate();

  if (!article) {
    return <NotFoundPage />;
  }

  const handleBack = () => {
    navigate("/edukasi");
  };

  return (
    <>
      <Navigation />
      <div className="article-container">
        <div className="background-image"></div>
        <button className="back-button" onClick={handleBack}>
          <BsArrowLeft /> Kembali Ke Halaman Sebelumnya
        </button>
        <Container className="article-content">
          <p className="article-author">
            By {article.author} | {article.date} | {article.tag}
          </p>
          <h1 className="article-title">{article.title}</h1>
          <Image src={article.image} className="article-image" />
          <div
            className="article-text"
            dangerouslySetInnerHTML={{ __html: article.desc }}
          ></div>
          {article.articleDetail.map((detail, index) => (
            <div key={index} className="article-section">
              {detail.imgDetail && (
                <img src={detail.imgDetail} alt={`Detail ${index + 1}`} />
              )}
              <div dangerouslySetInnerHTML={{ __html: detail.desc }}></div>
            </div>
          ))}
          <ShareIcons />
        </Container>
        <RecommendedArticles currentArticleId={id} />
      </div>
      <Footer />
    </>
  );
}
