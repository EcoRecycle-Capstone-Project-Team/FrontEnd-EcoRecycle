import { Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import Homepage from "./pages/Homepage";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutUsPage from "./pages/AboutUs";

import "./style/style.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FormWithMap from "./component/FormMaps";

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pelaporanlokasi" element={<FormWithMap />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
