import { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Card, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import "./SampahTable.css";

const SampahTable = () => {
  const { sampahLocations } = useSelector((state) => state.mapSebaranSampah);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  return (
    <>
      <Card className="mt-4 mb-4">
        <Card.Header>Tabel Data Sampah</Card.Header>
        <Card.Body>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nama Pelapor</th>
                  <th>Alamat</th>
                  <th>Kota</th>
                  <th>Tanggal Lapor</th>
                  <th>Status</th>
                  <th>Gambar Bukti</th>
                </tr>
              </thead>
              <tbody>
                {sampahLocations.map((sampah, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>{sampah.nama_pelapor}</td>
                    <td>{sampah.alamat}</td>
                    <td>{sampah.kota}</td>
                    <td>{new Date(sampah.created_at).toLocaleDateString()}</td>
                    <td>{sampah.status}</td>
                    <td>
                      {sampah.image && (
                        <img
                          src={sampah.image}
                          alt="bukti"
                          className="hover-image"
                          onClick={() => handleImageClick(sampah.image)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </motion.div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Gambar Bukti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Bukti"
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SampahTable;
