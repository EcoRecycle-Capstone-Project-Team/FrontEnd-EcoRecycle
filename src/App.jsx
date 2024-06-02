import { Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import Homepage from "./pages/Homepage";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
