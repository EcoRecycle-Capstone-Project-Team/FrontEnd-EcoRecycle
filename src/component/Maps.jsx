import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import { Container, Button, Card } from "react-bootstrap";
import {
  setTpaLocations,
  setBankSampahLocations,
  setSelectedLocation,
  setUserLocation,
  setShowNearest,
} from "../redux/maps/action";
import { fetchTpaLocations } from "../utils/api";

const MapComponent = () => {
  const dispatch = useDispatch();
  const {
    tpaLocations,
    bankSampahLocations,
    selectedLocation,
    userLocation,
    showNearest,
  } = useSelector((state) => state.maps);
  const [mapLoaded, setMapLoaded] = useState(false);

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

  const calculateDistance = (lat1, lng1, lat2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lat2 - lng1);
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
        dispatch(
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      });
    }
  }, [dispatch]);

  const nearestTpa = findNearestTpa();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <LoadScript
            googleMapsApiKey={apiKey}
            onLoad={() => setMapLoaded(true)}
          >
            {mapLoaded && (
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
                {bankSampahLocations.map((location, index) => (
                  <Marker
                    key={index}
                    position={{ lat: location.lat, lng: location.lng }}
                    icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    onClick={() => handleMarkerClick(location)}
                  />
                ))}
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
                      <h3>{selectedLocation.name}</h3>
                      <p>Status: {selectedLocation.status}</p>
                      {selectedLocation.distance !== undefined && (
                        <p>
                          Distance: {selectedLocation.distance.toFixed(2)} km
                        </p>
                      )}
                      <p style={{ margin: "5px 0" }}>
                        <strong>Pelapor:</strong>{" "}
                        {selectedLocation.nama_pelapor}
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Alamat:</strong> {selectedLocation.alamat}
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Kota:</strong> {selectedLocation.kota}
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Kode Pos:</strong> {selectedLocation.kode_pos}
                      </p>
                      <p style={{ margin: "5px 0" }}>
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
          <div className="mt-4">
            <h5>Legend:</h5>
            <div>
              <img
                src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                alt="User Location"
              />{" "}
              Lokasi Anda Sekarang
            </div>
            <div>
              <img
                src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                alt="TPA Location"
              />{" "}
              Lokasi TPA Terdaftar
            </div>
            <div>
              <img
                src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                alt="Bank Sampah Location"
              />{" "}
              Lokasi Bank Sampah Terdaftar
            </div>
          </div>
          {userLocation && (
            <div className="text-center mt-4">
              <Button
                variant="success"
                onClick={() => dispatch(setShowNearest(!showNearest))}
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
