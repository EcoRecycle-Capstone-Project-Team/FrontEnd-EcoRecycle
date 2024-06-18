import MapSebaranSampah from "../component/Sebaran/SebaranSampah/MapSebaranSampah";
import SampahChart from "../component/Sebaran/SebaranSampah/SampahChart";
import SampahLineChart from "../component/Sebaran/SebaranSampah/SampahLineChart";
import SampahTable from "../component/Sebaran/SebaranSampah/SampahTable";
import HeroSection from "../component/Hero/HeroSection";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Navigation from "../component/Navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SebaranSampahPage() {
  return (
    <>
      <Navigation />
      <div className="sebaran-sampah">
        <Container>
          <div className="mb-4">
            <h2 className="text-center mb-4">
              Sebaran Lokasi Sampah Terselesaikan
            </h2>
            <HeroSection
              title="Sebaran Lokasi Sampah Yang Berhasil Terselesaikan"
              subtitle="Lihat perkembangan dan partisipasi masyarakat dalam menjaga kebersihan lingkungan."
              imageUrl="/assets/background-sampah.jpg"
            />
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <MapSebaranSampah />
            </motion.div>
            <Row>
              <Col md={6}>
                <motion.div variants={itemVariants}>
                  <SampahChart />
                </motion.div>
              </Col>
              <Col md={6}>
                <motion.div variants={itemVariants}>
                  <SampahLineChart />
                </motion.div>
              </Col>
            </Row>
            <motion.div variants={itemVariants}>
              <SampahTable />
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
