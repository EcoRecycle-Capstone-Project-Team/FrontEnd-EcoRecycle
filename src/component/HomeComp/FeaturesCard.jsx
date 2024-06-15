/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function FeaturesCard({
  imgSrc,
  imgAlt,
  title,
  description,
  link,
  isLoggedIn,
}) {
  const handleLinkClick = (e) => {
    if (
      !isLoggedIn &&
      (link === "/pelaporansampah" || link === "/pelaporanlokasi")
    ) {
      e.preventDefault();
      window.location.href = "/login";
    }
  };
  return (
    <div className="custom-feature-card">
      <div className="feature-image">
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div className="feature-content">
        <h5 className="feature-title">{title}</h5>
        <p className="feature-description">{description}</p>
        <p className="feature-link">
          <Link to={link} onClick={handleLinkClick}>
            Selengkapnya →
          </Link>
        </p>
      </div>
    </div>
  );
}
