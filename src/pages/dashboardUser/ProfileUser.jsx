import Navigation from "../../component/Layout//Navigation";
import ProfileUser from "../../component/dashboardUser/ProfileUser";
import SidebarUser from "../../component/dashboardUser/SidebarUser";
import "../../component/dashboardUser/styleDasboard.css";

function ProfileUserPage() {
  return (
    <>
      <Navigation />
      <main className="main">
        <SidebarUser />
        <ProfileUser />
      </main>
    </>
  );
}

export default ProfileUserPage;
