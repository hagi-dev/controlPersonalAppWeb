import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Reemplazar useHistory por useNavigate
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Utilizar useNavigate en lugar de useHistory
  const location = useLocation();

  // Function to extract token from query params
  const getTokenFromQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("token"); // assuming the token is sent with the key 'token'
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Simulate API request to change the password
    const token = getTokenFromQueryParams();

    if (!token) {
      setError("No se pudo obtener el token.");
      return;
    }

    // Normally here you would send the request to the API with the new password and token
    // Simulating a success response
    setMessage("Contraseña cambiada con éxito");

    // Redirection after success
    setTimeout(() => {
      navigate("/"); // Redirigir al home después de cambiar la contraseña
    }, 2000); // Redirects to home after 2 seconds
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center pt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center">Cambiar Contraseña</h2>
          {message && <p className="alert alert-success">{message}</p>}
          {error && <p className="alert alert-danger">{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newPassword">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Introduce tu nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="secondary" type="submit" className="w-100 mt-4">
              Cambiar Contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
