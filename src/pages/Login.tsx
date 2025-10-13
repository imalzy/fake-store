import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../api/user-service";
import { isAuthenticated, login } from "../utils/auth";

import { FaLock, FaUser } from "react-icons/fa";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Username and password are required");
      return;
    }

    setIsLoading(true);

    try {
      // Mock authentication for demo purposes
      // In a real application, you would call your API here
      // Call the signin service
      const resp = await userService.signin({ username, password });

      if (resp) {
        login(resp.token, username);
        toast.success("Login successful!");
      }

      // Navigate to the redirect path or dashboard
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
      setIsLoading(false);
    } catch {
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

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

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaUser className="text-muted" />
                    </span>
                    <Form.Control
                      type="text"
                      className="border-start-0"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      disabled={isLoading}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FaLock className="text-muted" />
                    </span>
                    <Form.Control
                      type="password"
                      className="border-start-0"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      disabled={isLoading}
                    />
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 rounded-pill py-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
