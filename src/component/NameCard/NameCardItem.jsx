import PropTypes from "prop-types";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "./NameCard.css";

export default function NameCardItem({
  name,
  jobdesk,
  imageUrl,
  instagramUrl,
  linkedinUrl,
  githubUrl,
}) {
  return (
    <div className="name-card-item">
      <div className="namecard">
        <div className="namecard-header"></div>
        <div className="namecard-body">
          <div className="profile-pic">
            <img src={imageUrl} alt={name} />
          </div>
          <div className="card-info">
            <h5>{name}</h5>
            <p>{jobdesk}</p>
          </div>
          <div className="card-icons">
            <a
              href={instagramUrl}
              className="icon instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href={linkedinUrl}
              className="icon linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href={githubUrl}
              className="icon github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

NameCardItem.propTypes = {
  name: PropTypes.string.isRequired,
  jobdesk: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  instagramUrl: PropTypes.string,
  linkedinUrl: PropTypes.string,
  githubUrl: PropTypes.string,
};
