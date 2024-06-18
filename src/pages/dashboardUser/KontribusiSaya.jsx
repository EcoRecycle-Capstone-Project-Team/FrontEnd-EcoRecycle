import Navigation from "../../component/Layout//Navigation";
import KontribusiLokasiSaya from "../../component/dashboardUser/KontribusiLokasiSaya";
import SidebarUser from "../../component/dashboardUser/SidebarUser";
import "../../component/dashboardUser/styleDasboard.css";

function KontribusiSayaPage() {
  return (
    <>
      <Navigation />
      <main className="main">
        <SidebarUser />
        <KontribusiLokasiSaya />
      </main>
    </>
  );
}

export default KontribusiSayaPage;
