import { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";
import {
  Form,
  Button,
  FloatingLabel,
  Nav,
  Toast,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../../redux/authSlice";

export default function RegisterInput({ register }) {
  const [username, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [repassword, onRepasswordChange] = useInput("");
  const [showToast, setShowToast] = useState(false);
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setEmailError("Email tidak valid!");
      return;
    } else {
      setEmailError("");
    }

    if (password !== repassword) {
      setShowToast(true);
      return;
    }

    try {
      const response = await dispatch(
        registerUserAsync({ username, email, password })
      );
      const { status, message } = response.payload;

      if (status === "success") {
        register();
      } else {
        error(message);
      }
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <Form className="register-input form-floating mt-5">
      <FloatingLabel
        controlId="floatingInputName"
        label="Full name"
        className="mb-4 form-group"
      >
        <Form.Control
          type="text"
          placeholder="Full name"
          value={username}
          onChange={onNameChange}
          className="form-control"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputEmail"
        label="Email address"
        className="mb-4 form-group"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={onEmailChange}
          className="form-control"
        />
      </FloatingLabel>
      {emailError && <Alert variant="danger">{emailError}</Alert>}
      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-4 form-group"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="form-control"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingRePassword"
        label="Confirm Password"
        className="mb-4 form-group"
      >
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={repassword}
          onChange={onRepasswordChange}
          className="form-control"
        />
      </FloatingLabel>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="button-container">
        <Button
          type="button"
          className="register-button"
          onClick={handleRegister}
          size="lg"
        >
          Register
        </Button>
      </div>
      <div className="mt-3 text-center">
        <Form.Text className="text-muted">
          Sudah punya akun?
          <Nav.Link
            as={Link}
            to="/login"
            style={{ cursor: "pointer", color: "green" }}
          >
            Login Bos
          </Nav.Link>
        </Form.Text>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1050,
        }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="/src/assets/MainLogo.png"
              className="rounded me-2"
              alt=""
              style={{ width: "25px", height: "auto" }}
            />
            <strong className="me-auto">Admin EcoRecycle</strong>
          </Toast.Header>
          <Toast.Body>Passwordnya kagak mirip Boss!!!!!</Toast.Body>
        </Toast>
      </div>
    </Form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
