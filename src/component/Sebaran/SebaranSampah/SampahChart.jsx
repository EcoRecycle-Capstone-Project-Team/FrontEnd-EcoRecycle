import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import "chart.js/auto";
import { motion } from "framer-motion";

const SampahChart = () => {
  const { sampahLocations } = useSelector((state) => state.mapSebaranSampah);

  const statusCount = sampahLocations.reduce(
    (acc, curr) => {
      if (curr.status === "approved") {
        acc.approved += 1;
      } else if (curr.status === "pending") {
        acc.pending += 1;
      }
      return acc;
    },
    { approved: 0, pending: 0 }
  );

  const total = statusCount.approved + statusCount.pending;
  const approvedPercentage = ((statusCount.approved / total) * 100).toFixed(2);
  const pendingPercentage = ((statusCount.pending / total) * 100).toFixed(2);

  const data = {
    labels: [
      `Approved (${approvedPercentage}%)`,
      `Pending (${pendingPercentage}%)`,
    ],
    datasets: [
      {
        label: "Status Sampah",
        data: [statusCount.approved, statusCount.pending],
        backgroundColor: ["#28a745", "#dc3545"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="mt-4">
        <Card.Header>Grafik Status Sampah</Card.Header>
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

export default SampahChart;
