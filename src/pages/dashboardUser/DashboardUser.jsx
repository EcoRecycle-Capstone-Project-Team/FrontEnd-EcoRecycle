import Navigation from "../../component/Layout/Navigation";
import DashboardUser from "../../component/dashboardUser/DashboardUser";
import SidebarUser from "../../component/dashboardUser/SidebarUser";
import "../../component/dashboardUser/styleDasboard.css";

function DashboardUserPage() {
  return (
    <>
      <Navigation />
      <main className="main">
        <SidebarUser />
        <DashboardUser />
      </main>
    </>
  );
}

export default DashboardUserPage;
