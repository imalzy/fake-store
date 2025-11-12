import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./LoginForm";

const LoginContent = React.memo(() => {

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="justify-content-center w-100 px-3">
        <Col md={8} lg={6}>
          <Card className="border-0 rounded-4">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Fake Store Admin</h2>
                <p className="text-muted small">
                  Please log in to your dashboard
                </p>
              </div>

            <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

LoginContent.displayName = "LoginContent";
export default LoginContent;
