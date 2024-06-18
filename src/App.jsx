import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutUsPage from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EducationPage from "./pages/EducationPage";
import ProtectedRoute from "./component/ProtectedRoute";
import ArticleDetail from "./component/Article/ArticleDetail";
import FormPelaporanSampah from "./component/Form/FormPelaporanSampah";
import FormWithMap from "./component/Form/FormPelaloranLokasi";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SebaranSampahPage from "./pages/SebaranSampahPage";
import SebaranLokasiPage from "./pages/SebaranLokasiPage";
import LoginPageAdmin from "./pages/admin/LoginPageAdmin";
import Dashboard from "./pages/admin/Dashboard";
import LaporanSampah from "./pages/admin/LaporanSampah";
import LaporanTpaPage from "./pages/admin/LaporanTpa";
import DetailTpaPage from "./pages/admin/DetailTpa";
import UpdateTpaPage from "./pages/admin/UpdateTpa";
import DetailSampahPage from "./pages/admin/DetailSampah";
import DashboardUserPage from "./pages/dashboardUser/DashboardUser";
import LaporanSayaPage from "./pages/dashboardUser/LaporanSayaUSer";
import KontribusiSayaPage from "./pages/dashboardUser/KontribusiSaya";
import ProfileUserPage from "./pages/dashboardUser/ProfileUser";
import { getOwnProfileAsync } from "./redux/authSlice";
import { AnimatePresence } from "framer-motion";
import ForbiddenPage from "./component/error/ForbiddenPage";
import NotFoundPage from "./component/error/NotFoundPage";
import LacakStatusLapUserPage from "./pages/dashboardUser/LacakLaporan";
import AllUserPage from "./pages/admin/AllUSerPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOwnProfileAsync(localStorage.getItem("token"))).then(() => {
        setProfileLoaded(true);
      });
    } else {
      setProfileLoaded(true);
    }
  }, [dispatch, isLoggedIn]);

  const isAdmin = isLoggedIn && userProfile && userProfile.roles == "admin";

  if (!profileLoaded) {
    return <div></div>;
  }

  return (
    <div className="app-container">
      <main>
        <AnimatePresence mode={"wait"}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Homepage />} />
            <Route path="/aboutUs" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/pelaporanlokasi"
              element={
                <ProtectedRoute>
                  <FormWithMap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pelaporansampah"
              element={
                <ProtectedRoute>
                  <FormPelaporanSampah />
                </ProtectedRoute>
              }
            />
            <Route path="/edukasi" element={<EducationPage />} />
            <Route path="/edukasi/artikel/:id" element={<ArticleDetail />} />
            <Route path="/sebaransampah" element={<SebaranSampahPage />} />
            <Route path="/sebaranlokasi" element={<SebaranLokasiPage />} />

            <>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardUserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <ProfileUserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/laporan-saya"
                element={
                  <ProtectedRoute>
                    <LaporanSayaPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/kontribusi-saya"
                element={
                  <ProtectedRoute>
                    <KontribusiSayaPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/lacak-status-laporan"
                element={
                  <ProtectedRoute>
                    <LacakStatusLapUserPage />
                  </ProtectedRoute>
                }
              />
            </>

            <Route path="/admin/login" element={<LoginPageAdmin />} />
            {profileLoaded && (
              <>
                {isAdmin ? (
                  <>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route
                      path="/admin/laporan-sampah"
                      element={<LaporanSampah />}
                    />
                    <Route
                      path="/admin/laporan-sampah/detail/:id"
                      element={<DetailSampahPage />}
                    />
                    <Route
                      path="/admin/laporan-sampah/update/:id"
                      element={<LaporanSampah />}
                    />
                    <Route
                      path="/admin/laporan-tpa"
                      element={<LaporanTpaPage />}
                    />
                    <Route
                      path="/admin/laporan-tpa/detail/:id"
                      element={<DetailTpaPage />}
                    />
                    <Route
                      path="/admin/laporan-tpa/update/:id"
                      element={<UpdateTpaPage />}
                    />

                    <Route path="/admin/pengguna" element={<AllUserPage />} />
                  </>
                ) : (
                  <Route path="/admin/*" element={<ForbiddenPage />} />
                )}
              </>
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
