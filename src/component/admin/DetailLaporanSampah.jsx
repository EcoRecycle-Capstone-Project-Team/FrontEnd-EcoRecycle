import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSampahReportByIdAsync } from "../../redux/authSlice";
import { Card, Col, Form, Row, Image } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const DetailLaporanSampah = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const detail = useSelector((state) => state.auth.sampahReportDet);

  useEffect(() => {
    if (token) {
      dispatch(getSampahReportByIdAsync(id, token));
    }
  }, [dispatch, id, token]);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: parseFloat(detail?.latitude) || -6.2,
    lng: parseFloat(detail?.longitude) || 106.816666,
  };

  return (
    <main
      role="main"
      className="main-content col-md-9 ml-sm-auto col-lg-10 px-md-4"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Detail Laporan Masalah Sampah</h1>
      </div>

      <Card>
        <Card.Header>Laporan Masalah Sampah</Card.Header>
        <Card.Body>
          {detail && detail.latitude && detail.longitude && (
            <>
              <LoadScript
                googleMapsApiKey={apiKey}
                loadingElement={<div>Loading...</div>}
                onLoad={() => console.log("Google Maps API loaded")}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={13}
                >
                  <Marker
                    position={{
                      lat: parseFloat(detail.latitude),
                      lng: parseFloat(detail.longitude),
                    }}
                  />
                </GoogleMap>
              </LoadScript>
              <Form id="locationForm" className="mt-4">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="nama_pelapor">
                      <Form.Label>Nama Pelapor</Form.Label>
                      <Form.Control
                        type="text"
                        name="nama_pelapor"
                        defaultValue={detail.nama_pelapor}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="no_tlp">
                      <Form.Label>No Telepon</Form.Label>
                      <Form.Control
                        type="text"
                        name="no_tlp"
                        defaultValue={detail.no_tlp}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="alamat">
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        name="alamat"
                        defaultValue={detail.alamat}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="kota">
                      <Form.Label>Kota</Form.Label>
                      <Form.Control
                        type="text"
                        name="kota"
                        defaultValue={detail.kota}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="tgl_lapor">
                      <Form.Label>Tanggal Lapor</Form.Label>
                      <Form.Control
                        type="text"
                        name="tgl_lapor"
                        defaultValue={detail.tgl_lapor}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="kode_pos">
                      <Form.Label>Kode Pos</Form.Label>
                      <Form.Control
                        type="text"
                        name="kode_pos"
                        defaultValue={detail.kode_pos}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="latitude">
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control
                        type="text"
                        name="latitude"
                        defaultValue={detail.latitude}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="longitude">
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control
                        type="text"
                        name="longitude"
                        defaultValue={detail.longitude}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="deskripsi">
                      <Form.Label>Deskripsi</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="deskripsi"
                        defaultValue={detail.deskripsi}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Row style={{ marginTop: "1rem" }}>
                      <Col md={6}>
                        <Image
                          src={`https://api.ecorecycle.my.id/img/${detail.img_bukti}`}
                          alt="Gambar Lokasi"
                          fluid
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </main>
  );
};

export default DetailLaporanSampah;
