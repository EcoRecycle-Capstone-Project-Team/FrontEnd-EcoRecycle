import { Col, Row, Container, Button } from "react-bootstrap";
import { ReactTyped } from "react-typed";
import StatItem from "./StatItem";
import { Link } from "react-scroll";
import "./HomeComp.css";

export default function HeroHeader() {
  return (
    <div className="hero-header w-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row className="hero-section d-flex align-items-center">
          <Col md={6}>
            <div className="head_left">
              <span className="h_subTitle">#EcorecycleOnTOP🚀</span>
              <div className="w-75 mt-4 h_title">
                <h1
                  style={{
                    color: "#2e9b08",
                    fontSize: "4em",
                    fontWeight: "700",
                  }}
                >
                  Eco
                  <span style={{ color: "rgba(121, 147, 81, 0.53)" }}>
                    Recycle
                  </span>
                </h1>
                <h1>
                  {" "}
                  <ReactTyped
                    strings={["Daftarkan", "Laporkan", "Terselesaikan."]}
                    typeSpeed={120}
                    backSpeed={120}
                    loop
                  />
                </h1>
              </div>
              <p className="text-secondary">
                Tingkatkan Kesadaran, Bersihkan Lingkungan Bersama EcoRecycle,
                Mari Lapor dan Edukasi Sampah di Sekitar Kita
              </p>
              <div className="d-flex justify-content-between align-items-start w-50 mt-4">
                <Link to="featuresitem" smooth={true} duration={200}>
                  <Button className="btn btn-success btn-lg btn-animated">
                    Get Started 🌍
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="head_right">
              <div className="imageContainer d-flex justify-content-end align-items-center">
                <img
                  src="/assets/eco.png"
                  alt="Eco Friendly Activities"
                  className="img-fluid head_rightImg"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <StatItem end={10000} duration={2.5} suffix="+" text="Users Joined" />
          <StatItem
            end={500}
            duration={2.5}
            suffix="+"
            text="Reports Completed"
          />
          <StatItem end={100} duration={2.5} suffix="T" text="Waste Recycled" />
        </Row>
      </Container>
    </div>
  );
}
