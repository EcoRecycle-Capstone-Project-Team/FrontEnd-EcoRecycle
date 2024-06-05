import styled from "styled-components";
import CardList from "../component/CardList";
import imageData from "../data/imageData.json";
import MapComponent from "../component/Maps";

const StyledHeader = styled.h1`
  color: black;
  font-weight: 700;
`;

const EcoSpan = styled.span`
  color: #2e9b08;
`;

const RecycleSpan = styled.span`
  color: #799351;
`;

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const LeftCol = styled.div`
  flex: 1 1 300px; // Flex-grow, flex-shrink, and flex-basis
  margin: 10px;
  max-width: 600px; // Limiting max width for larger screens
`;

const RightCol = styled(LeftCol)`
  justify-content: center;
  align-items: center;
`;

export default function Homepage() {
  return (
    <div className="container-fluid p-5">
      <StyledRow>
        <LeftCol>
          <StyledHeader>
            Selamat Datang di <EcoSpan>Eco</EcoSpan>
            <RecycleSpan>Recycle</RecycleSpan>
          </StyledHeader>
          <p className="lead">
            Tingkatkan Kesadaran, Bersihkan Lingkungan Bersama EcoRecycle, Mari
            Lapor dan Edukasi Sampah di Sekitar Kita
          </p>
          <button className="btn btn-success btn-lg">Get Started 🌍</button>
        </LeftCol>
        <RightCol>
          <img
            src="/src/assets/volunteer.png"
            alt="Eco Friendly Activities"
            className="img-fluid"
          />
        </RightCol>
      </StyledRow>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center main-title mb-4">Tentang Aplikasi</h2>
            <p className="text-muted text-center main-body">
              EcoRecycle adalah sebuah aplikasi inovatif yang dirancang untuk
              memfasilitasi
              <br /> pelaporan masalah sampah secara efektif dan menyediakan
              informasi edukasi kepada <br />
              masyarakat mengenai pengelolaan sampah yang benar.
            </p>
            <p className="text-muted text-center main-body">
              Aplikasi ini bertujuan untuk menjembatani kesenjangan dalam sistem
              pengelolaan
              <br />
              sampah nasional di Indonesia, di mana masih terdapat sekitar 7.2
              juta ton sampah
              <br /> yang belum terkelola dengan baik berdasarkan data tahun
              2022 dari Sistem Informasi <br />
              Pengelolaan Sampah Nasional (SIPSN) Kementerian Lingkungan Hidup
              dan Kehutanan <br />
              (KLHK).
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5 icons-section">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-center align-items-center title-icons-container">
              <div className="title-background"></div>
              <img
                src="./src/assets/trash vector.png"
                alt="Left Icon"
                style={{ height: "120px", marginRight: "10px" }}
                className="title-icon-img"
              />
              <h2 className="text-center">
                Jenis-Jenis Sampah <br />
                Yang Perlu Kita Ketahui
              </h2>
            </div>
            <CardList items={imageData} />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center">
              Sebaran Fasilitas Lokasi TPA & Bank Sampah yang Telah Terdaftar
            </h2>
            <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
