import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { fetchTpaLocations } from "../../../utils/api";
import {
  setTpaLocations,
  setBankSampahLocations,
} from "../../../redux/maps/action";
import DokumentasiGallery from "./DokumentasiGallery";
import Navigation from "../../Navigation";
import Footer from "../../Footer";
import "./Dokumentasi.css";

export default function DokumentasiLokasi() {
  const dispatch = useDispatch();

  const { tpaLocations, bankSampahLocations } = useSelector(
    (state) => state.maps
  );

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

    if (
      (!tpaLocations || tpaLocations.length === 0) &&
      (!bankSampahLocations || bankSampahLocations.length === 0)
    ) {
      fetchData();
    }
  }, [dispatch, tpaLocations, bankSampahLocations]);

  const locationsData = [
    ...tpaLocations.map((location) => ({
      ...location,
      src: location.image,
      nama_pelapor: location.nama_pelapor,
      nama_lokasi: location.name,
      alamat: location.alamat,
    })),
    ...bankSampahLocations.map((location) => ({
      ...location,
      src: location.image,
      nama_pelapor: location.nama_pelapor,
      nama_lokasi: location.name,
      alamat: location.alamat,
    })),
  ];

  return (
    <div className="dokumentasi-lokasi">
      <Navigation />
      <Container className="dokumentasi-detail mt-4">
        <h2 className="text-center mb-4">
          Dokumentasi TPA dan Bank Sampah yang Berhasil Tersimpan di{" "}
          <span className="eco-text">Eco</span>
          <span className="recycle-text">Recycle</span>
        </h2>
        {locationsData.length > 0 ? (
          <DokumentasiGallery locationsData={locationsData} />
        ) : (
          <p>No data available.</p>
        )}
      </Container>
      <Footer />
    </div>
  );
}
