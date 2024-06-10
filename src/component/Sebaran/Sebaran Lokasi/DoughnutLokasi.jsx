import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "chart.js/auto";

const DoughnutLokasi = () => {
  const { tpaLocations, bankSampahLocations } = useSelector(
    (state) => state.maps
  );

  const data = {
    labels: ["TPA", "Bank Sampah"],
    datasets: [
      {
        data: [tpaLocations.length, bankSampahLocations.length],
        backgroundColor: ["#28a745", "#dc3545"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="mt-4">
        <Card.Header>Grafik Sebaran Lokasi TPA dan Bank Sampah</Card.Header>
        <Card.Body
          className="d-flex justify-content-center"
          style={{ height: "300px" }}
        >
          <Doughnut data={data} />
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default DoughnutLokasi;
