import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import "chart.js/auto";
import { motion } from "framer-motion";

const SampahLineChart = () => {
  const { sampahLocations } = useSelector((state) => state.mapSebaranSampah);

  const dateCount = sampahLocations.reduce((acc, curr) => {
    const date = new Date(curr.created_at).toLocaleDateString();
    if (acc[date]) {
      acc[date] += 1;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  const sortedDates = Object.keys(dateCount).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: "Jumlah Laporan Sampah",
        data: sortedDates.map((date) => dateCount[date]),
        fill: true,
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Warna background di bawah garis
        borderColor: "#007bff",
        tension: 0.4, // Menambahkan ketegangan untuk membuat garis bergelombang
      },
    ],
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="mt-4">
        <Card.Header>Grafik Jumlah Laporan Sampah per Tanggal</Card.Header>
        <Card.Body style={{ height: "300px" }}>
          <Line data={data} />
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default SampahLineChart;
