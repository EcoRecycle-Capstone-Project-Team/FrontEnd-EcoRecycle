import { Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import Homepage from "./pages/Homepage";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutUsPage from "./pages/AboutUs";

import "./style/style.css";
import EducationPage from "./pages/EducationPage";
import ArticleDetail from "./component/ArticleDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/edukasi" element={<EducationPage />} />
          <Route path="/edukasi/Artikel/:id" element={<ArticleDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
