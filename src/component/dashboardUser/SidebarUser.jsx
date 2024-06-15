import { useDispatch, useSelector } from "react-redux";
import { getOwnProfileAsync, logoutUser } from "../../redux/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SidebarUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOwnProfileAsync(localStorage.getItem("token")));
    }
  }, [dispatch, isLoggedIn]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <aside className="sidebarUser">
        {isLoggedIn && userProfile && (
          <div className="profile-card">
            <img
              src={`https://api.ecorecycle.my.id/img/${userProfile.profile_photo}`}
              alt="Profile Picture"
              className="profile-card-img"
            />

            <div className="profile-info">
              <h2 className="text-uppercase">{userProfile.name}</h2>
              <p className="profile-info-role">{userProfile.email}</p>
              <p className="profile-info-school">
                Selamat datang di Sistem Ecorecycle
              </p>
            </div>
          </div>
        )}
        <div className="profile-options">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                <i className="fas fa-dashboard profile-option-icon"></i>{" "}
                Dashboard
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to="/dashboard/laporan-saya"
                className={
                  location.pathname === "/dashboard/laporan-saya"
                    ? "active"
                    : ""
                }
              >
                <i className="fas fa-file-alt profile-option-icon"></i> Laporan
                Saya
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to="/dashboard/kontribusi-saya"
                className={
                  location.pathname === "/dashboard/kontribusi-saya"
                    ? "active"
                    : ""
                }
              >
                <i className="fas fa-location-pin profile-option-icon"></i>
                Kontribusi Sebaran TPA Saya
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to="/dashboard/lacak-status-laporan"
                className={
                  location.pathname === "/dashboard/lacak-status-laporan"
                    ? "active"
                    : ""
                }
              >
                <i className="fas fa-check-circle profile-option-icon"></i>
                Lacak Status Laporan Saya
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className={
                  location.pathname === "/dashboard/profile" ? "active" : ""
                }
              >
                <i className="fas fa-user profile-option-icon"></i> Profil Saya
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link to="#" className="profile-option" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt profile-option-icon"></i>
                Keluar
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SidebarUser;
