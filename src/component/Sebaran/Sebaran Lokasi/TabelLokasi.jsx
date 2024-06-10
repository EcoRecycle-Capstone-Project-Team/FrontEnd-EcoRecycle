import { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./TabelLokasi.css";

export default function TabelLokasi() {
  const { tpaLocations, bankSampahLocations } = useSelector(
    (state) => state.maps
  );

  const [sortConfig, setSortConfig] = useState({
    key: "provinsi",
    direction: "ascending",
  });

  const provinces = [
    ...new Set(
      [...tpaLocations, ...bankSampahLocations].map(
        (location) => location.provinsi
      )
    ),
  ];

  const provinceData = provinces.map((provinsi) => {
    const tpaCount = tpaLocations.filter(
      (location) => location.provinsi === provinsi
    ).length;
    const bankSampahCount = bankSampahLocations.filter(
      (location) => location.provinsi === provinsi
    ).length;
    return {
      provinsi,
      tpaCount,
      bankSampahCount,
      total: tpaCount + bankSampahCount,
    };
  });

  const totalLocations = provinceData.reduce(
    (sum, data) => sum + data.total,
    0
  );

  provinceData.forEach((data) => {
    data.percentage = ((data.total / totalLocations) * 100).toFixed(2);
  });

  const sortedData = [...provinceData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return "↕";
  };

  return (
    <Card className="mt-4">
      <Card.Header>Grafik Sebaran Lokasi TPA dan Bank Sampah</Card.Header>
      <Card.Body>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="table-container">
            <Table className="styled-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th onClick={() => requestSort("provinsi")}>
                    Nama Provinsi {getArrow("provinsi")}
                  </th>
                  <th onClick={() => requestSort("bankSampahCount")}>
                    Total Bank Sampah {getArrow("bankSampahCount")}
                  </th>
                  <th onClick={() => requestSort("tpaCount")}>
                    Total TPA {getArrow("tpaCount")}
                  </th>
                  <th>Status</th>
                  <th onClick={() => requestSort("percentage")}>
                    Persentase {getArrow("percentage")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.provinsi}</td>
                    <td>{data.bankSampahCount}</td>
                    <td>{data.tpaCount}</td>
                    <td>Operasional</td>
                    <td>{data.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </motion.div>
      </Card.Body>
    </Card>
  );
}
