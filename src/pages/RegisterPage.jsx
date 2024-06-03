import { useNavigate } from "react-router-dom";
import RegisterInput from "../component/RegisterInput";
import AnimatedSection from "../component/AnimatedSection";

export default function RegisterPage() {
  const navigate = useNavigate();

  const onRegister = () => {
    navigate("/");
  };

  return (
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
          <RegisterInput register={onRegister} />
        </section>
      </main>
    </AnimatedSection>
  );
}
