import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import {
  Container,
  Card,
  ListGroup,
  Col,
  Row,
  Form,
  Button,
} from "react-bootstrap";
import {
  setTpaLocations,
  setBankSampahLocations,
  setSelectedLocation,
  setUserLocation,
  setShowNearest,
} from "../../redux/maps/action";
import { fetchTpaLocations } from "../../utils/api";

function MainMap() {
  const dispatch = useDispatch();
  const {
    tpaLocations,
    bankSampahLocations,
    selectedLocation,
    userLocation,
    showNearest,
  } = useSelector((state) => state.maps);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLegend, setActiveLegend] = useState("All");

  const mapContainerStyle = {
    width: "100%",
    height: "625px",
  };

  const defaultCenter = {
    lat: -2.334444,
    lng: 115.163333,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTpaLocations();
        const tpaData = [];
        const bankSampahData = [];

        data.forEach((location) => {
          if (location.status === "Operasional") {
            if (location.jenis_lokasi === "TPA") {
              tpaData.push(location);
            } else if (location.jenis_lokasi === "Bank Sampah") {
              bankSampahData.push(location);
            }
          }
        });

        dispatch(setTpaLocations(tpaData));
        dispatch(setBankSampahLocations(bankSampahData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleMarkerClick = (location) => {
    dispatch(setSelectedLocation(location));
  };

  const findNearestLocation = (locations) => {
    if (!userLocation || locations.length === 0) return [];

    return locations
      .map((location) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          location.lat,
          location.lng
        );
        return { ...location, distance };
      })
      .sort((a, b) => a.distance - b.distance)[0];
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      });
    }
  }, [dispatch]);

  const nearestTpa = findNearestLocation(tpaLocations);
  const nearestBankSampah = findNearestLocation(bankSampahLocations);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const customIcon = (url, size) => ({
    url: url,
    scaledSize: new window.google.maps.Size(size.width, size.height),
  });

  const renderMarkers = () => {
    switch (activeLegend) {
      case "TPA":
        return tpaLocations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            icon={customIcon("/assets/icon-tpamarker.png", {
              width: 25,
              height: 36,
            })}
            onClick={() => handleMarkerClick(location)}
          />
        ));
      case "Bank Sampah":
        return bankSampahLocations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            icon={customIcon("/assets/icon-banksampahmarker.png", {
              width: 25,
              height: 36,
            })}
            onClick={() => handleMarkerClick(location)}
          />
        ));
      default:
        return [
          ...tpaLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={customIcon("/assets/icon-tpamarker.png", {
                width: 25,
                height: 36,
              })}
              onClick={() => handleMarkerClick(location)}
            />
          )),
          ...bankSampahLocations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={customIcon("/assets/icon-banksampahmarker.png", {
                width: 25,
                height: 36,
              })}
              onClick={() => handleMarkerClick(location)}
            />
          )),
        ];
    }
  };

  const handleLegendClick = (legend) => {
    if (activeLegend === legend) {
      setActiveLegend("All");
    } else {
      setActiveLegend(legend);
    }
  };

  const mapOptions = {
    styles: [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
          {
            saturation: "-100",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36,
          },
          {
            color: "#000000",
          },
          {
            lightness: 40,
          },
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "off",
          },
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#4d6059",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4d6059",
          },
        ],
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#4d6059",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            lightness: 21,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#4d6059",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4d6059",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#7f8d89",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#7f8d89",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#7f8d89",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#7f8d89",
          },
          {
            lightness: 29,
          },
          {
            weight: 0.2,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#7f8d89",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#7f8d89",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#7f8d89",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#7f8d89",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#000000",
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#2b3638",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#2b3638",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#24282b",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#24282b",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };

  return (
    <Container className="py-5">
      <Row className="text-center text-container">
        <h2>
          Lokasi TPA & Bank Sampah Di <span className="eco-text">Eco</span>
          <span className="recycle-text">Recycle</span>
        </h2>
      </Row>
      <Row>
        <Col md={9}>
          <LoadScript
            googleMapsApiKey={apiKey}
            loadingElement={<div>Loading...</div>}
            onLoad={() => setMapLoaded(true)}
          >
            {mapLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={defaultCenter}
                zoom={5}
                options={mapOptions}
              >
                {userLocation && (
                  <Marker
                    position={userLocation}
                    icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  />
                )}
                {renderMarkers()}
                {selectedLocation && (
                  <InfoWindowF
                    position={{
                      lat: selectedLocation.lat,
                      lng: selectedLocation.lng,
                    }}
                    onCloseClick={() => dispatch(setSelectedLocation(null))}
                  >
                    <div
                      style={{
                        width: "250px",
                        padding: "10px",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      {selectedLocation.image && (
                        <img
                          src={selectedLocation.image}
                          alt={selectedLocation.name}
                          style={{ width: "100%", height: "auto" }}
                        />
                      )}
                      <h3 style={{ margin: "5px 0", color: "black" }}>
                        {selectedLocation.name}
                      </h3>
                      <p style={{ margin: "5px 0", color: "gray" }}>
                        Status: {selectedLocation.status}
                      </p>
                      {selectedLocation.distance !== undefined && (
                        <p>
                          Distance: {selectedLocation.distance.toFixed(2)} km
                        </p>
                      )}
                      <p style={{ margin: "5px 0", color: "gray" }}>
                        <strong>Pelapor:</strong>{" "}
                        {selectedLocation.nama_pelapor}
                      </p>
                      <p style={{ margin: "5px 0", color: "gray" }}>
                        <strong>Alamat:</strong> {selectedLocation.alamat}
                      </p>
                      <p style={{ margin: "5px 0", color: "gray" }}>
                        <strong>Kota:</strong> {selectedLocation.kota}
                      </p>
                      <p style={{ margin: "5px 0", color: "gray" }}>
                        <strong>Kode Pos:</strong> {selectedLocation.kode_pos}
                      </p>
                      <p style={{ margin: "5px 0", color: "gray" }}>
                        <strong>Provinsi:</strong> {selectedLocation.provinsi}
                      </p>
                      <p
                        style={{
                          margin: "5px 0",
                          fontSize: "12px",
                          color: "gray",
                        }}
                      >
                        <strong>Dibuat:</strong>{" "}
                        {new Date(selectedLocation.created_at).toLocaleString()}
                      </p>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            )}
          </LoadScript>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Legend:</h5>
              <ListGroup>
                <ListGroup.Item
                  active={activeLegend === "TPA"}
                  onClick={() => handleLegendClick("TPA")}
                >
                  <img
                    src="assets/icon-tpamarker.png"
                    alt="TPA Icon"
                    style={{
                      marginRight: "10px",
                      width: "25px",
                      height: "36px",
                    }}
                  />
                  TPA
                </ListGroup.Item>
                <ListGroup.Item
                  active={activeLegend === "Bank Sampah"}
                  onClick={() => handleLegendClick("Bank Sampah")}
                >
                  <img
                    src="assets/icon-banksampahmarker.png"
                    alt="Bank Sampah Icon"
                    style={{
                      marginRight: "10px",
                      width: "25px",
                      height: "36px",
                    }}
                  />
                  Bank Sampah
                </ListGroup.Item>
              </ListGroup>
              <Form.Check
                type="switch"
                id="show-nearest-switch"
                label="Tampilkan Lokasi Terdekat"
                checked={showNearest}
                onChange={() => dispatch(setShowNearest(!showNearest))}
                className="mt-3"
              />
            </Card.Body>
          </Card>
          {userLocation && showNearest && (
            <div className="mt-4">
              <h5>Lokasi Terdekat:</h5>
              <Row>
                <Col md={12}>
                  {nearestTpa && (
                    <Card className="my-2">
                      <Card.Body>
                        <Card.Title>TPA Terdekat</Card.Title>
                        <Card.Text className="renew-design">
                          {nearestTpa.name}
                          <br />
                          Jarak: {nearestTpa.distance.toFixed(2)} km
                        </Card.Text>
                        <Button
                          variant="success"
                          onClick={() => handleMarkerClick(nearestTpa)}
                        >
                          Tampilkan di Map
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
                <Col md={12}>
                  {nearestBankSampah && (
                    <Card className="my-2">
                      <Card.Body>
                        <Card.Title>Bank Sampah Terdekat</Card.Title>
                        <Card.Text className="renew-design">
                          {nearestBankSampah.name}
                          <br />
                          Jarak: {nearestBankSampah.distance.toFixed(2)} km
                        </Card.Text>
                        <Button
                          variant="success"
                          onClick={() => handleMarkerClick(nearestBankSampah)}
                        >
                          Tampilkan di Map
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MainMap;
