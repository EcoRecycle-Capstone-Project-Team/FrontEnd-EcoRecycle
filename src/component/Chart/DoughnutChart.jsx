/* eslint-disable react/prop-types */
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

const DoughnutChart = ({ title, data }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="mt-4">
        <Card.Header>{title}</Card.Header>
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

export default DoughnutChart;
