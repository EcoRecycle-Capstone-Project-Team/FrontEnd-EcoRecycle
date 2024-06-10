import { Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import Homepage from "./pages/Homepage";
import Footer from "./component/Footer";
import AboutUsPage from "./pages/AboutUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EducationPage from "./pages/EducationPage";
import ProtectedRoute from "./component/ProtectedRoute";
import ArticleDetail from "./component/Article/ArticleDetail";
import FormPelaporanSampah from "./component/Form/FormPelaporanSampah";
import FormWithMap from "./component/Form/FormPelaloranLokasi";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SebaranSampahPage from "./pages/SebaranSampahPage";
import { AnimatePresence } from "framer-motion";
import SebaranLokasiPage from "./pages/SebaranLokasiPage";

function App() {
  return (
    <div className="app-container">
      <Navigation />
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
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
