import Navigation from "../../component/Layout//Navigation";
import LacakStatusUser from "../../component/dashboardUser/LacakStatusLaporan";
import SidebarUser from "../../component/dashboardUser/SidebarUser";
import "../../component/dashboardUser/styleDasboard.css";

function LacakStatusLapUserPage() {
  return (
    <>
      <Navigation />
      <main className="main">
        <SidebarUser />
        <LacakStatusUser />
      </main>
    </>
  );
}

export default LacakStatusLapUserPage;
