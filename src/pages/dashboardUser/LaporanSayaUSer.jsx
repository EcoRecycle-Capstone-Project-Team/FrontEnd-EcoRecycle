import Navigation from "../../component/Layout//Navigation";
import LaporanSaya from "../../component/dashboardUser/LaporanSaya";
import SidebarUser from "../../component/dashboardUser/SidebarUser";
import "../../component/dashboardUser/styleDasboard.css";

function LaporanSayaPage() {
  return (
    <>
      <Navigation />
      <main className="main">
        <SidebarUser />
        <LaporanSaya />
      </main>
    </>
  );
}

export default LaporanSayaPage;
