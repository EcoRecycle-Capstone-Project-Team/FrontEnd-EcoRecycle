import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../redux/authSlice";
import RegisterInput from "../component/RegisterInput";
import AnimatedSection from "../component/AnimatedSection";
import { useEffect } from "react";
import Navigation from "../component/Navigation";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = ({ username, email, password }) => {
    dispatch(registerUserAsync({ username, email, password }));
    navigate("/");
  };

  return (
    <>
      <Navigation />
      <AnimatedSection>
        <main className="d-flex flex-column align-items-center justify-content-center mb-3">
          <div className="text-center mb-4">
            <img
              src="/src/assets/MainLogo.png"
              alt="Eco Friendly Activities"
              className="img-fluid mw-100"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          <section className="shadow p-5 mb-5 bg-white rounded login-section">
            <h2 className="text-center mb-4">EcoRecycle</h2>
            <RegisterInput register={handleRegister} />
          </section>
        </main>
      </AnimatedSection>
    </>
  );
}
