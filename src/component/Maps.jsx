import { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Container, Button, Card } from "react-bootstrap";

const MapComponent = () => {
  const [tpaLocations, setTpaLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showNearest, setShowNearest] = useState(false);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: -2.334444,
    lng: 115.163333,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.ecorecycle.my.id/report/tpa");
        const data = await response.json();
        const filteredData = data.data
          .filter((tpa) => tpa.status === "verify")
          .map((tpa) => ({
            lat: parseFloat(tpa.latitude),
            lng: parseFloat(tpa.longitude),
            name: tpa.nama_lokasi,
            status: "Operasional",
            image: tpa.img_tpa
              ? `https://api.ecorecycle.my.id/img/${tpa.img_tpa}`
              : null,
          }));
        setTpaLocations(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const findNearestTpa = () => {
    if (!userLocation || tpaLocations.length === 0) return [];

    return tpaLocations
      .map((tpa) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          tpa.lat,
          tpa.lng
        );
        return { ...tpa, distance };
      })
      .sort((a, b) => a.distance - b.distance);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const nearestTpa = findNearestTpa();

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <LoadScript googleMapsApiKey="AIzaSyD6i6_yN1sttL0vPFRfz3kCiJcvQJ6mQe0">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={defaultCenter}
              zoom={5}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                />
              )}
              {tpaLocations.map((location, index) => (
                <Marker
                  key={index}
                  position={{ lat: location.lat, lng: location.lng }}
                  icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  onClick={() => handleMarkerClick(location)}
                />
              ))}
              {selectedLocation && (
                <InfoWindow
                  position={{
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                  }}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div style={{ width: "200px" }}>
                    {selectedLocation.image && (
                      <img
                        src={selectedLocation.image}
                        alt={selectedLocation.name}
                        style={{ width: "100%", height: "auto" }}
                      />
                    )}
                    <h3>{selectedLocation.name}</h3>
                    <p>Status: {selectedLocation.status}</p>
                    {selectedLocation.distance !== undefined && (
                      <p>Distance: {selectedLocation.distance.toFixed(2)} km</p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
          {userLocation && (
            <div className="text-center mt-4">
              <Button
                variant="success"
                onClick={() => setShowNearest((prev) => !prev)}
              >
                {showNearest ? "Hide Nearest TPAs" : "Show Nearest TPAs"}
              </Button>
              {showNearest && (
                <div>
                  <h5 className="mt-4">Nearest TPA Locations:</h5>
                  {nearestTpa.slice(0, 5).map((tpa, index) => (
                    <Card key={index} className="my-2">
                      <Card.Body>
                        <Card.Title>{tpa.name}</Card.Title>
                        <Card.Text>
                          Distance: {tpa.distance.toFixed(2)} km
                        </Card.Text>
                        <Button
                          variant="success"
                          onClick={() => handleMarkerClick(tpa)}
                        >
                          View on Map
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MapComponent;
