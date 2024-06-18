/* eslint-disable react/prop-types */
import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import "./Dokumentasi.css";

export default function DokumentasiGallery({ locationsData }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const photos = locationsData.map((location) => ({
    src: location.src,
    width: 800,
    height: 600,
    nama_pelapor: location.nama_pelapor,
    deskripsi: location.deskripsi,
    alamat: location.alamat,
    nama_lokasi: location.name,
  }));

  return (
    <>
      <PhotoAlbum
        photos={photos}
        layout="rows"
        onClick={({ index }) => handleImageClick(index)}
        targetRowHeight={200}
      />

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={photos.map((photo) => ({
            ...photo,
            title: (
              <div>
                <h3>{photo.nama_pelapor}</h3>
                {photo.deskripsi ? (
                  <p>{photo.deskripsi}</p>
                ) : (
                  <p>{photo.nama_lokasi}</p>
                )}
                <p>{photo.alamat}</p>
              </div>
            ),
          }))}
          index={selectedIndex}
          plugins={[Fullscreen, Zoom, Captions]}
          animation={{ fadeIn: true }}
        />
      )}
    </>
  );
}
