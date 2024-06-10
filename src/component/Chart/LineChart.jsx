/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

const LineChart = ({ title, data }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="mt-4">
        <Card.Header>{title}</Card.Header>
        <Card.Body style={{ height: "300px" }}>
          <Line data={data} />
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default LineChart;
