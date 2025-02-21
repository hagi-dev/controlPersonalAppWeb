import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const RecoveryPassword = () => {
  //const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API request to send the recovery email.
    // For now, we'll just simulate a success message.
    setMessage(`Revise su correo electronico DNI: ${number}`);
    // setEmail('');
  };


  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    // Ensure the value is a number and has a minimum length of 7
    if (/^\d*$/.test(newValue) && newValue.length <= 7) {
      setNumber(newValue);
    }
    if (newValue.length > 7) {
      setError(''); // Clear the error message if the number is valid
    }
  };

  const handleBlur = () => {
    if (number.length < 7) {
        setError('El número debe tener al menos 7 dígitos.');
    } else {
        setError('');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center pt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center">Recuperar Contraseña</h2>
          <p className="text-center">Se te enviará un correo de confirmación para restablecer tu contraseña.</p>
          {message && <p className="alert alert-success">{message}</p>}
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group controlId="formBasicEmail">  <Form.Label>Enter your email</Form.Label>  <Form.Control    type="email"    placeholder="Enter email"    value={email}    onChange={(e) => setEmail(e.target.value)}    required  /></Form.Group><Form.Group controlId="formBasicNumber">    <Form.Label>Enter a number</Form.Label>    <Form.Control type="number" min="1" max="100" placeholder="Enter a number between 1 and 100" /></Form.Group>*/}
            <Form.Group controlId="formBasicNumber">
                <Form.Label>Ingresa tu DNI</Form.Label>
                <Form.Control
                    type="text"
                    value={number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ej.: 7654321"
                    required
                />
                {error && <p className="text-danger">{error}</p>}
            </Form.Group>

            <Button variant="secondary" type="submit" className="w-100 mt-4">
                Recuperar Contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecoveryPassword;
