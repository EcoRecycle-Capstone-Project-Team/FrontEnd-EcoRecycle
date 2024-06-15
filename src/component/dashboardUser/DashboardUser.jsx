import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnProfileAsync } from "../../redux/authSlice";

function DashboardUser() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOwnProfileAsync(localStorage.getItem("token")));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <section className="content">
        <div className="edit-profile-header">
          <h3 style={{ color: "#157347" }}>Dashboard Ecorecycle</h3>
        </div>
        <hr className="content-divider" />
        <div className="edit-options">
          {isLoggedIn && userProfile && (
            <div className="jumbotron">
              <i className="fa-solid fa-recycle icon"></i>
              <h4>Selamat Datang, {userProfile.name}</h4>
              <p>
                Selamat datang di Dashboard Ecorecycle. Mari berkontribusi untuk
                lingkungan bersama! Yuk laporkan masalah sampah di sekitar anda
                dan lakukan kontribusi menambah titik sebaran TPA !
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default DashboardUser;
