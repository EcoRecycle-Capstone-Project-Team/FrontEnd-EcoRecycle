import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { fetchSampahLocations } from "../../../utils/api";
import { setSampahLocations } from "../../../redux/mapSebaranSampah/action";
import DokumentasiGallery from "./DokumentasiGallery";
import Navigation from "../../Navigation";
import Footer from "../../Footer";
import "./Dokumentasi.css";

export default function DokumentasiSampah() {
  const dispatch = useDispatch();
  const { sampahLocations } = useSelector((state) => state.mapSebaranSampah);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSampahLocations();
        dispatch(setSampahLocations(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!sampahLocations || sampahLocations.length === 0) {
      fetchData();
    }
  }, [dispatch, sampahLocations]);

  const locationsData = sampahLocations.map((sampah) => ({
    ...sampah,
    src: sampah.image,
    nama_pelapor: sampah.nama_pelapor,
    deskripsi: sampah.deskripsi,
    alamat: sampah.alamat,
  }));

  return (
    <div className="dokumentasi-sampah">
      <Navigation />
      <Container className="dokumentasi-detail mt-4">
        <h2 className="text-center mb-4">
          Dokumentasi Sebaran Sampah yang Berhasil Tersimpan di{" "}
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
