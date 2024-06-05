import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const LegendContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 10;
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const ToggleButton = styled(Button)`
  width: 100%;
  text-align: left;
`;

const LegendContent = styled.div`
  margin-top: 10px;
`;

export default function MapLegend() {
  const [expanded, setExpanded] = useState(false);

  const toggleLegend = () => {
    setExpanded(!expanded);
  };

  return (
    <LegendContainer>
      <ToggleButton variant="light" onClick={toggleLegend}>
        Legend {expanded ? "▲" : "▼"}
      </ToggleButton>
      {expanded && (
        <LegendContent>
          <div className="d-flex align-items-center mb-2">
            <img
              src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              alt="User Location"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            <span>User Location</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <img
              src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              alt="TPA Location"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            <span>TPA Location</span>
          </div>
        </LegendContent>
      )}
    </LegendContainer>
  );
}
