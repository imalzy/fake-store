import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import userService from "../api/user-service";
import type { User } from "../api/user-service";
import { FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User form state
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add User");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipcode] = useState("");

  // Form validation
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userService.getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users. Please try again later.");
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = () => {
    setModalTitle("Add User");
    resetForm();
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user: User) => {
    setModalTitle("Edit User");
    setCurrentUser(user);

    // Populate form fields
    setUsername(user.username || "");
    setPassword(""); // For security, don't populate password
    setEmail(user.email || "");
    setName(user?.name?.firstname || "");
    setPhone(user.phone || "");
    setCity(user.address?.city || "");
    setStreet(user.address?.street || "");
    setZipcode(user.address?.zipcode || "");

    setShowModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete || !userToDelete.id) return;

    try {
      await userService.deleteUser(userToDelete.id);
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user.id !== userToDelete.id));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setName("");
    setPhone("");
    setCity("");
    setStreet("");
    setZipcode("");
    setValidated(false);
    setErrors({});
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation (only required for new users)
    if (!currentUser && !password) {
      newErrors.password = "Password is required for new users";
    } else if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Phone validation
    if (phone && !/^[0-9+\-() ]{10,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark form as validated to show validation feedback
    setValidated(true);

    // Run custom validation
    if (!validateForm()) {
      return;
    }

    const userData = {
      username,
      password,
      email,
      name,
      phone,
      address: {
        city,
        street,
        zipcode,
      },
    };

    try {
      if (currentUser && currentUser.id) {
        // Update existing user
        await userService.updateUser(currentUser.id, userData);
        toast.success("User updated successfully");

        // Update users list
        // setUsers(
        //   users.map((user) =>
        //     user.id === currentUser.id
        //       ? { ...user, ...userData, id: currentUser.id }
        //       : user,
        //   ),
        // );
      } else {
        // Create new user
        const newUser = await userService.createUser(userData);
        toast.success("User created successfully");

        // Add new user to list
        setUsers([...users, newUser]);
      }

      // Reset form and close modal
      setValidated(false);
      setErrors({});
      setShowModal(false);
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    }
  };

  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Users Management</h2>
          <p>Manage users in the system</p>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleAddUser}
            className="rounded-pill"
          >
            <FaUserPlus className="me-2" /> Add New User
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading users...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : users.length === 0 ? (
            <Alert variant="info">
              No users found. Add your first user by clicking the "Add New User"
              button.
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>{user.name?.firstname || "-"}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td>{user.address?.city || "-"}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditUser(user)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* User Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={validated && !!errors.username}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username || "Username is required"}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Password{" "}
                    {currentUser ? "(leave blank to keep current)" : ""}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={validated && !!errors.password}
                    required={!currentUser}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password || "Password is required"}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={validated && !!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email || "Valid email is required"}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                isInvalid={validated && !!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <h5 className="mt-4">Address</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentUser ? "Update User" : "Create User"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user{" "}
          <strong>{userToDelete?.name?.firstname || userToDelete?.username}</strong>? This
          action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserPage;
