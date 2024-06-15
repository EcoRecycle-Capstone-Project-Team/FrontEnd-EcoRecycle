import Sidebar from "../../component/admin/Sidebar";
import DashboardContent from "../../component/admin/DashboardContent";
import NavbarAdmin from "../../component/admin/Navbar";

function Dashboard() {
  return (
    <div className="App">
      <NavbarAdmin />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "2.5rem" }}>
          <Sidebar />
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
