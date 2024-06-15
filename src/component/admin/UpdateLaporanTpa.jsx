import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOwnProfileAsync,
  getPelaporanByIdAsync,
  updatePelaporanAsync,
} from "../../redux/authSlice";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -6.2,
  lng: 106.816666,
};

const UpdateLaporanTpa = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);
  console.log(userProfile);
  const token = localStorage.getItem("token");
  const detail = useSelector((state) => state.auth.singlePelaporan);

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

  useEffect(() => {
    if (token) {
      dispatch(getPelaporanByIdAsync(id, token));
      dispatch(getOwnProfileAsync(token));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (detail) {
      setFormValues({
        user_id: detail.user_id,
        nama_pelapor: detail.nama_pelapor,
        no_tlp: detail.no_tlp,
        jenis_lokasi: detail.jenis_lokasi,
        nama_lokasi: detail.nama_lokasi,
        alamat: detail.alamat,
        kota: detail.kota,
        kode_pos: detail.kode_pos,
        provinsi: detail.provinsi,
        latitude: detail.latitude,
        longitude: detail.longitude,
        img_tpa: null,
      });
    }
  }, [detail]);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setFormValues((prevValues) => ({
      ...prevValues,
      latitude: lat,
      longitude: lng,
    }));
    getGeocode(lat, lng);
  };

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

    dispatch(updatePelaporanAsync(formData, id));
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

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <main
      role="main"
      className="main-content col-md-9 ml-sm-auto col-lg-10 px-md-4"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Detail Laporan TPA</h1>
      </div>

      <Card>
        <Card.Header>Form Update Laporan TPA</Card.Header>
        <Card.Body>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              onClick={handleMapClick}
            >
              {formValues.latitude && formValues.longitude && (
                <Marker
                  position={{
                    lat: parseFloat(formValues.latitude),
                    lng: parseFloat(formValues.longitude),
                  }}
                />
              )}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="success" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </main>
  );
};

export default UpdateLaporanTpa;
