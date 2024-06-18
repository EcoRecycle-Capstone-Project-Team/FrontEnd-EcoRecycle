import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import "./ShareIcons.css";

export default function ShareIcons() {
  return (
    <div className="share-icons">
      <span>Ayo Coba Di Share Dong: </span>
      <div className="icon-container">
        <FaInstagram className="icon instagram" />
        <FaTwitter className="icon twitter" />
        <FaFacebook className="icon facebook" />
      </div>
    </div>
  );
}
