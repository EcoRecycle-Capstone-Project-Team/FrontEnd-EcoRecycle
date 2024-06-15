import Sidebar from "../../component/admin/Sidebar";
import NavbarAdmin from "../../component/admin/Navbar";
import LaporanMasuk from "../../component/admin/LaporanMasuk";

function LaporanSampah() {
  return (
    <div className="App">
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "2.5rem" }}>
          <Sidebar />
          <LaporanMasuk />
        </div>
      </div>
    </div>
  );
}

export default LaporanSampah;
