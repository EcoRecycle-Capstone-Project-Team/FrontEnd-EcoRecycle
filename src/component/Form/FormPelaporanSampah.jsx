import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { getOwnProfileAsync } from "../../redux/authSlice";
import { submitReportAsync } from "../../redux/formPelaporan/action";
import PageTransitionWrapper from "../Animations/PageTransitionWrapper";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -6.2,
  lng: 106.816666,
};

export default function FormPelaporanSampah() {
  const [marker, setMarker] = useState(null);
  const [formValues, setFormValues] = useState({
    user_id: "",
    nama_pelapor: "",
    no_tlp: "",
    alamat: "",
    kota: "",
    kode_pos: "",
    tgl_lapor: "",
    deskripsi: "",
    img_bukti: null,
    latitude: "",
    longitude: "",
  });

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOwnProfileAsync(localStorage.getItem("token")));
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (userProfile && userProfile.id && userProfile.name) {
      setFormValues((prevValues) => ({
        ...prevValues,
        user_id: userProfile.id,
        nama_pelapor: userProfile.name,
      }));
    }
  }, [userProfile]);

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    setFormValues((prevValues) => ({
      ...prevValues,
      latitude: lat,
      longitude: lng,
    }));
    getGeocode(lat, lng);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      img_bukti: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    dispatch(submitReportAsync(formData, "sampah"));
  };

  const getGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        let city = "";
        let postalCode = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("administrative_area_level_2")) {
            city = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        setFormValues((prevValues) => ({
          ...prevValues,
          alamat: results[0].formatted_address,
          kota: city,
          kode_pos: postalCode,
        }));
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  return (
    <PageTransitionWrapper>
      <Container className="py-5">
        <Card>
          <Card.Header
            as="h3"
            className="text-center"
            style={{ backgroundColor: "green", color: "white" }}
          >
            Form Pelaporan Sampah
          </Card.Header>
          <Card.Body>
            <LoadScript googleMapsApiKey="-">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onClick={handleMapClick}
              >
                {marker && <Marker position={marker} />}
              </GoogleMap>
            </LoadScript>
            <Form id="locationForm" onSubmit={handleSubmit} className="mt-4">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="user_id">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="user_id"
                      value={formValues.user_id}
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#e9ecef" }}
                      required
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="nama_pelapor">
                    <Form.Label>Nama Pelapor</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_pelapor"
                      value={formValues.nama_pelapor}
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#e9ecef" }}
                      required
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="no_tlp">
                    <Form.Label>No Telepon</Form.Label>
                    <Form.Control
                      type="text"
                      name="no_tlp"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="alamat">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      type="text"
                      name="alamat"
                      value={formValues.alamat}
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#e9ecef" }}
                      required
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="kota">
                    <Form.Label>Kota</Form.Label>
                    <Form.Control
                      type="text"
                      name="kota"
                      value={formValues.kota}
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#e9ecef" }}
                      required
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="tgl_lapor">
                    <Form.Label>Tanggal Lapor</Form.Label>
                    <Form.Control
                      type="date"
                      name="tgl_lapor"
                      value={formValues.tgl_lapor}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="kode_pos">
                    <Form.Label>Kode Pos</Form.Label>
                    <Form.Control
                      type="text"
                      name="kode_pos"
                      value={formValues.kode_pos}
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#e9ecef" }}
                      required
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
                      value={formValues.latitude}
                      style={{ backgroundColor: "#e9ecef" }}
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
                      value={formValues.longitude}
                      style={{ backgroundColor: "#e9ecef" }}
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
                      value={formValues.deskripsi}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="img_bukti">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="img_bukti"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <motion.div
                whileHover={{ rotate: 4320 }}
                transition={{ duration: 6 }}
                className="d-inline-block"
              >
                <Button variant="success" type="submit" className="mt-3">
                  Submit
                </Button>
              </motion.div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </PageTransitionWrapper>
  );
}
