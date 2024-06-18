import Sidebar from "../../component/admin/Sidebar";
import NavbarAdmin from "../../component/admin/Navbar";
import USerAll from "../../component/admin/UserAll";

function AllUserPage() {
  return (
    <div className="App">
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "2.5rem" }}>
          <Sidebar />
          <USerAll />
        </div>
      </div>
    </div>
  );
}

export default AllUserPage;
