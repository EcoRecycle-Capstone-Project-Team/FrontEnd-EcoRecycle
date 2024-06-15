import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, FloatingLabel, Alert, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginAdminAsync } from "../../redux/authSlice";
import styled from "styled-components";

const StyledForm = styled(Form)`
  padding: 30px;
  max-width: 400px;
  margin: auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled(FloatingLabel)`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  background-color: #2e9b08;
  border-color: #2e9b08;

  &:hover {
    background-color: #218838;
    border-color: #1e7e34;
  }
`;

const AdminLogin = ({ onLoginAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginAdminAsync({ email, password }));
      const { status, message, user } = response.payload;

      if (status === "success") {
        if (user?.role === "admin") {
          onLoginAdmin();
        } else {
          throw new Error("Akses ditolak: Anda bukan admin.");
        }
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan login:", error.message);
    }
  };

  return (
    <StyledForm className="form-floating mt-5 mb-5">
      <FormGroup
        controlId="floatingInputEmail"
        label="Email Address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </FormGroup>
      <FormGroup controlId="floatingPassword" label="Password" className="mb-4">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </FormGroup>
      <FormCheck
        type="checkbox"
        id="keepSignedIn"
        label="Keep me signed in"
        className="mb-3"
      />
      {error && <Alert variant="danger">{error}</Alert>}
      <ButtonContainer>
        <FullWidthButton type="button" onClick={handleLogin} size="lg">
          Login
        </FullWidthButton>
      </ButtonContainer>
    </StyledForm>
  );
};

AdminLogin.propTypes = {
  onLoginAdmin: PropTypes.func.isRequired,
};

export default AdminLogin;
