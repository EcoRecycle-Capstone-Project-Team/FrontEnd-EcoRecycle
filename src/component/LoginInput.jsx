import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { Form, Button, FloatingLabel, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

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
          onChange={onEmailChange}
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
          onChange={onPasswordChange}
          className="form-control"
        />
        <Form.Text className="text-muted form-text password-help">
          Lupa Kata Sandi?
        </Form.Text>
      </FloatingLabel>
      <div className="button-container">
        <Button
          type="button"
          className="login-button"
          onClick={() => login({ email, password })}
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
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};
