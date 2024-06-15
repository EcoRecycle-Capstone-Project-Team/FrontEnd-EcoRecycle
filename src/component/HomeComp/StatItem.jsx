/* eslint-disable react/prop-types */
import CountUp from "react-countup";
import { Col } from "react-bootstrap";

const StatItem = ({ end, duration, suffix, text }) => {
  return (
    <Col md={2}>
      <div className="stat-item">
        <h2 style={{ color: "#2e9b08", fontWeight: "700" }}>
          <CountUp end={end} duration={duration} suffix={suffix} />
        </h2>
        <p className="text-secondary">{text}</p>
      </div>
    </Col>
  );
};

export default StatItem;
