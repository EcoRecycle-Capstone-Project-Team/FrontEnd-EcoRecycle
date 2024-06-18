import { Container, Row, Col } from "react-bootstrap";
import DokumentasiItem from "./DokumentasiItem";
import "./Dokumentasi.css";

const DokumentasiList = () => {
  return (
    <Container className="dokumentasi-list">
      <Row className="justify-content-center">
        <Col lg={4} md={6} sm={12}>
          <DokumentasiItem
            category="TPA"
            title="Dokumentasi TPA dan Bank Sampah"
            description="Kumpulan gambar dari TPA dan Bank Sampah."
            link="/dokumentasi/tpa-bank-sampah"
            image="https://via.placeholder.com/30"
            author="EcoRecycle"
          />
        </Col>
        <Col lg={4} md={6} sm={12}>
          <DokumentasiItem
            category="Sebaran"
            title="Dokumentasi Sebaran Sampah"
            description="Kumpulan gambar dari sebaran sampah di berbagai lokasi."
            link="/dokumentasi/sebaran-sampah"
            image="https://via.placeholder.com/30"
            author="EcoRecycle"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DokumentasiList;
