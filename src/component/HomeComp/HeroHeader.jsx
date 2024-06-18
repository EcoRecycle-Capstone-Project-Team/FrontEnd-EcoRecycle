import { Col, Row, Container, Button } from "react-bootstrap";
import { ReactTyped } from "react-typed";
import StatItem from "./StatItem";
import { Link } from "react-scroll";
import "./HomeComp.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllPelaporanAsync,
  getAllPelaporanSampahAsync,
  getAllUsersAsync,
} from "../../redux/authSlice";

export default function HeroHeader() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const pelaporanSampah = useSelector((state) => state.auth.pelaporanSampah);
  const pelaporan = useSelector((state) => state.auth.pelaporan);

  const countUser = users.length;
  const conutPela = pelaporan.length;
  const resolvedPelaporanSampah = pelaporanSampah.filter(
    (report) => report.status === "resolved"
  );
  const countResolvedPelaporanSampah = resolvedPelaporanSampah.length;

  useEffect(() => {
    dispatch(getAllUsersAsync());
    dispatch(getAllPelaporanSampahAsync());
    dispatch(getAllPelaporanAsync());
  }, [dispatch]);

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
          <StatItem
            end={countUser}
            duration={2.5}
            suffix="+"
            text="User Bergabung"
          />
          <StatItem
            end={countResolvedPelaporanSampah}
            duration={2.5}
            suffix="+"
            text="Laporan Selesai"
          />
          <StatItem
            end={conutPela}
            duration={2.5}
            suffix="T"
            text="Daur Ulang Limbah"
          />
        </Row>
      </Container>
    </div>
  );
}
