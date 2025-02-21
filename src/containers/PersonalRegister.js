import React, { useRef, useState } from "react";
import {
  ButtonGroup,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Toast,
} from "react-bootstrap";
import WebcamCapture from "../components/WebcamCapture.jsx";

const PersonalRegister = () => {
  const [image, setImage] = useState(null);
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("warning");
  const webcamRef = useRef(null);

  const capture = async (buttonValue) => {
    if (dni.length < 8) {
      setError("El DNI debe tener al menos 8 dígitos");
      setToastMessage("El DNI debe tener al menos 8 dígitos");
      setToastType("danger");
      setShowToast(true);
      return;
    }
    setError("");
    setShowToast(false);
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    const currentTime = new Date().toLocaleTimeString();
    handleRegister(buttonValue, imageSrc, currentTime);
  };

  const handleRegister = (buttonValue, imageSrc, currentTime) => {
    console.log("Register");

    const send_api = post_value({
      inputx: buttonValue,
      imagex: imageSrc,
      dni: dni,
      time: currentTime,
    });

    console.log("Register Done", send_api);
    setToastMessage("Registro correcto");
    setToastType("success");
    setShowToast(true);
    setDni(""); // Limpiar el input
  };

  const post_value = (value) => {
    return {
      register: value.inputx,
      image: value.imagex,
      numero_doc: value.dni,
      time: value.time,
    };
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center pt-5">
          <Col
            xs={12}
            md={6}
            >
            {/* className="d-flex align-content-center flex-column justify-content-center gap-3" */}
            <h2 className="text-center">Control de Usuario</h2>

            <WebcamCapture setImage={setImage} webcamRef={webcamRef} />

            <section className="container">
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Número de DNI:
                </InputGroup.Text>
                <Form.Control
                  maxLength={8}
                  minLength={8}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
              </InputGroup>

              <ButtonGroup aria-label="Basic example">
                <Button
                  onClick={() => capture("input_register")}
                  variant="outline-info"
                  type="button"
                  className="w-100 mt-4"
                  value={"input_register"}
                >
                  Registrar Entrada
                </Button>
                <Button
                  onClick={() => capture("output_register")}
                  variant="outline-warning"
                  type="button"
                  className="w-100 mt-4"
                  value={"output_register"}
                >
                  Registrar Salida
                </Button>
              </ButtonGroup>
            </section>
          </Col>
          {/* <Col xs={12} md={6}>
          {image && <img src={image} alt="Captured" />}
        </Col> */}
        </Row>
      </Container>
      <div className="toast-container">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastType}
        >
          <Toast.Header>
            <strong className="me-auto">Mensaje</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default PersonalRegister;
