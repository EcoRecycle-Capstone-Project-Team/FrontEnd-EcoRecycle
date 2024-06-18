import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import { Container } from "react-bootstrap";
import {
  setSampahLocations,
  setSelectedSampahLocation,
} from "../../../redux/mapSebaranSampah/action";
import { fetchSampahLocations } from "../../../utils/api";
import { motion } from "framer-motion";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

const defaultCenter = {
  lat: -2.334444,
  lng: 115.163333,
};

const mapOptions = {
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7c93a3" }, { lightness: "-10" }],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [{ color: "#a0a4a5" }],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [{ color: "#62838e" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [{ color: "#dde3e3" }],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [{ color: "#3f4a51" }, { weight: "0.30" }],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [{ color: "#c6e8b3" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#588ca4" }],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ saturation: "-100" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#c5c6c6" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#9d9d9c" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "geometry.fill",
      stylers: [{ color: "#a4a4a4" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#7dcdcd" }],
    },
  ],
};

const MapSebaranSampah = () => {
  const dispatch = useDispatch();
  const { sampahLocations, selectedSampahLocation } = useSelector(
    (state) => state.mapSebaranSampah
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSampahLocations();
        dispatch(setSampahLocations(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleMarkerClick = (location) => {
    dispatch(setSelectedSampahLocation(location));
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Container fluid>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={5}
            options={mapOptions}
          >
            {sampahLocations.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                icon={
                  location.status === "resolved"
                    ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    : location.status === "in_progress"
                    ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                    : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
                onClick={() => handleMarkerClick(location)}
              />
            ))}
            {selectedSampahLocation && (
              <InfoWindowF
                position={{
                  lat: selectedSampahLocation.lat,
                  lng: selectedSampahLocation.lng,
                }}
                onCloseClick={() => dispatch(setSelectedSampahLocation(null))}
              >
                <div
                  style={{
                    width: "250px",
                    padding: "10px",
                    fontFamily: "Arial, sans-serif",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                  }}
                >
                  {selectedSampahLocation.image && (
                    <img
                      src={selectedSampahLocation.image}
                      alt={selectedSampahLocation.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <p>Status: {selectedSampahLocation.status}</p>
                  <p>
                    <strong>Pelapor:</strong>{" "}
                    {selectedSampahLocation.nama_pelapor}
                  </p>
                  <p>
                    <strong>Deskripsi:</strong>{" "}
                    {selectedSampahLocation.deskripsi}
                  </p>
                  <p>
                    <strong>Alamat:</strong> {selectedSampahLocation.alamat}
                  </p>
                  <p>
                    <strong>Kota:</strong> {selectedSampahLocation.kota}
                  </p>
                  <p>
                    <strong>Kode Pos:</strong> {selectedSampahLocation.kode_pos}
                  </p>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    <strong>Dibuat:</strong>{" "}
                    {new Date(
                      selectedSampahLocation.created_at
                    ).toLocaleString()}
                  </p>
                </div>
              </InfoWindowF>
            )}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                background: "#fff",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h5 style={{ margin: "0 0 10px 0" }}>Legend</h5>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  alt="resolved"
                  style={{ marginRight: "8px" }}
                />
                Resolved
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                  alt="In Progress"
                  style={{ marginRight: "8px" }}
                />
                In Progress
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  alt="Pending"
                  style={{ marginRight: "8px" }}
                />
                Pending
              </div>
            </div>
          </GoogleMap>
        </LoadScript>
      </Container>
    </motion.div>
  );
};

export default MapSebaranSampah;
