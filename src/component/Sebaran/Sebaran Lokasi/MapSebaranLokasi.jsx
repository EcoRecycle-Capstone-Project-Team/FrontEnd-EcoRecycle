import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import { Container } from "react-bootstrap";
import {
  setTpaLocations,
  setBankSampahLocations,
  setSelectedLocation,
  setUserLocation,
} from "../../../redux/maps/action";
import { fetchTpaLocations } from "../../../utils/api";

const MapSebaranLokasi = () => {
  const dispatch = useDispatch();
  const { tpaLocations, bankSampahLocations, selectedLocation, userLocation } =
    useSelector((state) => state.maps);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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

  const CustomLegend = () => {
    return (
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
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <img
            src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            alt="User Location"
            style={{ marginRight: "8px" }}
          />
          Lokasi Anda Sekarang
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
        >
          <img
            src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            alt="TPA Location"
            style={{ marginRight: "8px" }}
          />
          Lokasi TPA Terdaftar
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            alt="Bank Sampah Location"
            style={{ marginRight: "8px" }}
          />
          Lokasi Bank Sampah Terdaftar
        </div>
      </div>
    );
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <Container>
      <LoadScript googleMapsApiKey={apiKey} onLoad={() => setMapLoaded(true)}>
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
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {selectedLocation.image && (
                    <img
                      src={selectedLocation.image}
                      alt={selectedLocation.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <h3 style={{ color: "#333", marginBottom: "10px" }}>
                    {selectedLocation.name}
                  </h3>
                  <p
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <strong>Status:</strong> {selectedLocation.status}
                  </p>
                  {selectedLocation.distance !== undefined && (
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      <strong>Distance:</strong>{" "}
                      {selectedLocation.distance.toFixed(2)} km
                    </p>
                  )}
                  <p
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <strong>Pelapor:</strong> {selectedLocation.nama_pelapor}
                  </p>
                  <p
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <strong>Alamat:</strong> {selectedLocation.alamat}
                  </p>
                  <p
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <strong>Kota:</strong> {selectedLocation.kota}
                  </p>
                  <p
                    style={{
                      margin: "10px 0",
                      fontSize: "12px",
                      color: "gray",
                      borderTop: "1px solid #eee",
                      paddingTop: "10px",
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
      <CustomLegend />
    </Container>
  );
};

export default MapSebaranLokasi;
