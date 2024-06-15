import Sidebar from "../../component/admin/Sidebar";
import NavbarAdmin from "../../component/admin/Navbar";
import EditLaporanTpa from "../../component/admin/UpdateLaporanTpa";

function UpdateTpaPage() {
  return (
    <div className="App">
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "2.5rem" }}>
          <Sidebar />
          <EditLaporanTpa />
        </div>
      </div>
    </div>
  );
}

export default UpdateTpaPage;
