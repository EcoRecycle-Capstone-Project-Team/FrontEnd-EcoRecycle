import { Container, Row } from "react-bootstrap";
import MapSebaranLokasi from "../component/Sebaran/Sebaran Lokasi/MapSebaranLokasi";
import DoughnutLokasi from "../component/Sebaran/Sebaran Lokasi/DoughnutLokasi";
import TabelLokasi from "../component/Sebaran/Sebaran Lokasi/TabelLokasi";
import HeroSection from "../component/Hero/HeroSection";
import Navigation from "../component/Navigation";

export default function SebaranLokasiPage() {
  return (
    <>
      <Navigation />
      <Container>
        <div className="mb-4">
          <h2 className="text-center mb-4">
            Sebaran Lokasi TPA & Bank Sampah di Indonesia
          </h2>
          <HeroSection
            title="Sebaran Lokasi Sampah Yang Berhasil Terselesaikan"
            subtitle="Lihat perkembangan dan partisipasi masyarakat dalam menjaga kebersihan lingkungan."
            imageUrl="/src/assets/Bali-Indonesia.jpg"
          />
        </div>
        <Row>
          <MapSebaranLokasi />
        </Row>
        <Row>
          <DoughnutLokasi />
        </Row>
        <Row>
          <TabelLokasi />
        </Row>
      </Container>
    </>
  );
}
