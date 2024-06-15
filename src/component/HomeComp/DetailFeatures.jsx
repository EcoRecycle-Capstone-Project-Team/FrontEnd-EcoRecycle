import { Container, Row, Col } from "react-bootstrap";
import MainMap from "../MainMap/MainMap";
import PrinciplesCard from "./PrinciplesCard";

export default function DetailFeatures() {
  return (
    <div className="detail-features w-100 min-vh-100 text-white d-flex">
      <Container>
        <Row className="align-items-center mb-5">
          <Col md={6} className="text-container">
            <h1>
              <span className="eco-text">Eco</span>
              <span className="recycle-text">Recycle</span>
            </h1>
            <h3>Solusi Efektif untuk Masalah Pengelolaan Sampah Nasional</h3>
            <p>
              <span className="eco-text">Eco</span>
              <span className="recycle-text">Recycle</span> adalah sebuah
              aplikasi inovatif yang dirancang untuk memfasilitasi pelaporan
              masalah sampah secara efektif dan menyediakan informasi edukasi
              kepada masyarakat mengenai pengelolaan sampah yang benar.
            </p>
            <p>
              Aplikasi ini bertujuan untuk{" "}
              <span className="eco-text">
                menjembatani kesenjangan dalam sistem pengelolaan sampah
                nasional di Indonesia
              </span>
              , di mana masih terdapat{" "}
              <span className="eco-text">
                sekitar 7.2 juta ton sampah yang belum terkelola dengan baik
              </span>{" "}
              berdasarkan data tahun 2022 dari Sistem Informasi Pengelolaan
              Sampah Nasional (SIPSN) Kementerian Lingkungan Hidup dan Kehutanan
              (KLHK).
            </p>
          </Col>
          <Col md={6} className="image-container d-flex justify-content-center">
            <img
              src="/assets/MainLogoWithBackground.png"
              alt="EcoRecycle Logo"
              className="img-fluid rounded-img"
            />
          </Col>
          <PrinciplesCard />
          <MainMap />
        </Row>
      </Container>
    </div>
  );
}
