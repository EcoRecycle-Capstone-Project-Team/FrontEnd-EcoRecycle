import { useNavigate } from "react-router-dom";
import AdminLogin from "../../component/admin/AdminLogin";
import AnimatedSection from "../../component/AnimatedSection";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Navigation from "../../component/Layout/Navigation";
import Swal from "sweetalert2";

function LoginPageAdmin() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin/dashboard");
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda berhasil login sebagai admin.",
        timer: 3000,
      });
    }
  }, [isLoggedIn, navigate, user]);

  const handleLogin = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <Navigation />
      <AnimatedSection>
        <AdminLogin onLoginAdmin={handleLogin} />
      </AnimatedSection>
    </>
  );
}

export default LoginPageAdmin;
