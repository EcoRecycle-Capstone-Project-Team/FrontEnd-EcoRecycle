import { Accordion, Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import faqsData from "../../data/faqsData.json";
import "./HomeComp.css";

function FaqComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 5;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredFaqs = faqsData.filter((faq) =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaqs.length / faqsPerPage);

  const displayedFaqs = filteredFaqs.slice(
    (currentPage - 1) * faqsPerPage,
    currentPage * faqsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="faq">
      <Container className="custom-container">
        <h1 className="text-center fw-bold">
          Pertanyaan Yang Sering Ditanyakan
        </h1>
        <Row className="d-flex align-items-center">
          <Col md={6}>
            <div className="imageContainer d-flex justify-content-end align-items-center">
              <img
                src="/assets/faq-icon.png"
                alt="FAQ ICON"
                className="img-fluid"
              />
            </div>
          </Col>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-4"
            />
            <Accordion className="custom-accordion">
              {displayedFaqs.map((faq) => (
                <Accordion.Item
                  eventKey={faq.eventKey.toString()}
                  key={faq.id}
                  className="accordion-item"
                >
                  <Accordion.Header>
                    <i className="bi bi-question-circle me-2"></i>
                    {faq.title}
                  </Accordion.Header>
                  <Accordion.Body>{faq.desc}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            {totalPages > 1 && (
              <div className="pagination-dots text-center mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <span
                    key={index}
                    className={`dot ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  ></span>
                ))}
              </div>
            )}
          </Col>
        </Row>
        <p className="text-center">
          Tidak Menemukan Jawaban?{" "}
          <a href="mailto:ecorecycle@my.id" className="eco-email">
            Hubungi Kami
          </a>
        </p>
      </Container>
    </div>
  );
}

export default FaqComponent;
