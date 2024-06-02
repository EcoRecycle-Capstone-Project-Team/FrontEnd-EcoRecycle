import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

function LoginInput({ label, type, placeholder, value, onChange }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
}

LoginInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["email", "password", "text"]).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginInput;
