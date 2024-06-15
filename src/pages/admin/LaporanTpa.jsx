import Sidebar from "../../component/admin/Sidebar";
import NavbarAdmin from "../../component/admin/Navbar";
import LaporanTpa from "../../component/admin/LaporanTpa";

function LaporanTpaPage() {
  return (
    <div className="App">
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "2.5rem" }}>
          <Sidebar />
          <LaporanTpa />
        </div>
      </div>
    </div>
  );
}

export default LaporanTpaPage;
