import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { getOwnProfileAsync } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
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

const FormWithMap = () => {
  const [marker, setMarker] = useState(null);
  const [formValues, setFormValues] = useState({
    user_id: "",
    nama_pelapor: "",
    no_tlp: "",
    jenis_lokasi: "TPA",
    nama_lokasi: "",
    alamat: "",
    kota: "",
    kode_pos: "",
    provinsi: "",
    latitude: "",
    longitude: "",
    img_tpa: null,
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
      img_tpa: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    dispatch(submitReportAsync(formData, "lokasi"));
  };

  const getGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        let city = "";
        let province = "";
        let postalCode = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("administrative_area_level_2")) {
            city = component.long_name;
          }
          if (component.types.includes("locality") && !city) {
            city = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            province = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        setFormValues((prevValues) => ({
          ...prevValues,
          alamat: results[0].formatted_address,
          kota: city,
          provinsi: province,
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
            Form Pelaporan Lokasi
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
                      required
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
                      value={formValues.no_tlp}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="jenis_lokasi">
                    <Form.Label>Jenis Lokasi</Form.Label>
                    <Form.Control
                      as="select"
                      name="jenis_lokasi"
                      value={formValues.jenis_lokasi}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="TPA">TPA</option>
                      <option value="Bank Sampah">Bank Sampah</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="nama_lokasi">
                    <Form.Label>Nama Lokasi</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_lokasi"
                      value={formValues.nama_lokasi}
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
                      readOnly
                      required
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
                      readOnly
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
                      value={formValues.kode_pos}
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#e9ecef" }}
                      readOnly
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="provinsi">
                    <Form.Label>Provinsi</Form.Label>
                    <Form.Control
                      type="text"
                      name="provinsi"
                      value={formValues.provinsi}
                      onChange={handleInputChange}
                      style={{ backgroundColor: "#e9ecef" }}
                      readOnly
                      required
                    />
                  </Form.Group>
                </Col>
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
              </Row>
              <Row>
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
                <Col md={6}>
                  <Form.Group controlId="img_tpa">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="img_tpa"
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
};

export default FormWithMap;
