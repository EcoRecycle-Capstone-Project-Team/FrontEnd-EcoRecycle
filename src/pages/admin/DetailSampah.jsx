import Sidebar from "../../component/admin/Sidebar";
import NavbarAdmin from "../../component/admin/Navbar";
import DetailLaporanSampah from "../../component/admin/DetailLaporanSampah";

function DetailSampahPage() {
  return (
    <div className="App">
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "2.5rem" }}>
          <Sidebar />
          <DetailLaporanSampah />
        </div>
      </div>
    </div>
  );
}

export default DetailSampahPage;
