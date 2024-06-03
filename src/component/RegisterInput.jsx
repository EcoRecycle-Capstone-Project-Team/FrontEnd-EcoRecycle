import { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { Form, Button, FloatingLabel, Nav, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [repassword, onRepasswordChange] = useInput("");
  const [showToast, setShowToast] = useState(false);

  const handleRegister = () => {
    if (password !== repassword) {
      setShowToast(true);
      return;
    }
    register({ name, email, password });
  };

  const now = new Date();
  const formattedDate = format(now, "HH:mm:ss");

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
          value={name}
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
            <small>{formattedDate}</small>
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
