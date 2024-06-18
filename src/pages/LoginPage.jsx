import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginInput from "../component/Form/LoginInput";
import AnimatedSection from "../component/AnimatedSection";
import { useEffect } from "react";
import Navigation from "../component/Layout/Navigation";

const LoginPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <>
      <Navigation />
      <AnimatedSection>
        <main className="d-flex flex-column align-items-center justify-content-center mt-5">
          <div className="text-center mb-4">
            <img
              src="/assets/MainLogo.png"
              alt="Eco Friendly Activities"
              className="img-fluid mw-100"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          <section className="shadow p-5 mb-5 bg-white rounded login-section">
            <h2 className="text-center mb-4">EcoRecycle</h2>
            <LoginInput onLogin={handleLogin} />
          </section>
        </main>
      </AnimatedSection>
    </>
  );
};

export default LoginPage;
