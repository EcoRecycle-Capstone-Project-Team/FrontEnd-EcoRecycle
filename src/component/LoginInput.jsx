import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, FloatingLabel, Nav, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../redux/authSlice";

const LoginInput = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginUserAsync({ email, password }));
      const { status, message } = response.payload;

      if (status === "success") {
        onLogin();
      } else {
        error(message);
      }
    } catch (error) {
      ("Terjadi kesalahan saat melakukan login. Silakan coba lagi.");
    }
  };

  return (
    <Form className="login-input form-floating mt-5">
      <FloatingLabel
        controlId="floatingInputEmail"
        label="Email address"
        className="mb-4 form-group"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-4 form-group"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <Form.Text className="text-muted form-text password-help">
          Lupa Kata Sandi?
        </Form.Text>
      </FloatingLabel>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="button-container">
        <Button
          type="button"
          className="login-button"
          onClick={handleLogin}
          size="lg"
        >
          Login
        </Button>
      </div>
      <div className="mt-3 text-center">
        <Form.Text className="text-muted">
          Tidak punya akun?
          <Nav.Link
            as={Link}
            to="/Register"
            style={{ cursor: "pointer", color: "green" }}
          >
            Daftar sekarang
          </Nav.Link>
        </Form.Text>
      </div>
    </Form>
  );
};

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
