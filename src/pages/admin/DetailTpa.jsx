import Sidebar from "../../component/admin/Sidebar";
import NavbarAdmin from "../../component/admin/Navbar";
import DetailLaporanTpa from "../../component/admin/DetailLaporanTpa";

function DetailTpaPage() {
  return (
    <div className="App">
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "2.5rem" }}>
          <Sidebar />
          <DetailLaporanTpa />
        </div>
      </div>
    </div>
  );
}

export default DetailTpaPage;
