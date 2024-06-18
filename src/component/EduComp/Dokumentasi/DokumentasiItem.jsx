/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Dokumentasi.css";

const DokumentasiItem = ({ category, title, description, link, author }) => {
  return (
    <Card className="mb-4 dokumentasi-item shadow-lg rounded">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-primary">{category}</Card.Subtitle>
        <Card.Title className="dokumentasi-title">{title}</Card.Title>
        <Card.Text className="dokumentasi-description">{description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="/assets/Logo without title.png"
              alt="author"
              className="rounded-circle me-2"
              width="30"
              height="30"
            />
            <div>
              <small className="text-muted">{author}</small>
            </div>
          </div>
          <Link to={link}>
            <Button variant="success" className="dokumentasi-button">
              Selengkapnya
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DokumentasiItem;
