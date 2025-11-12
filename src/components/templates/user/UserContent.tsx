import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Table,
  InputGroup,
} from "react-bootstrap";

import { Controller } from "react-hook-form";

import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import userServices, { type User } from "@/api/user-service";
import { useUserForm } from "./useUserForm";
import type { UserType } from "./UserSchema";

const UserContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState<"Add" | "Edit">("Add");
  const [userId, setUserId] = useState<number | null>(null);

  const {
    userModal,
    setUserModal,

    control,
    handleSubmit,
    trigger,
    handleReset,
    reset,
    errors,
  } = useUserForm();

  const handleAddUser = () => {
    setUserModal(true);
  };

  const onHandlerSubmit = handleSubmit(
    async (formData: UserType) => {
      try {
        trigger(); // untuk check form validation

        const payload = {
          username: formData?.username,
          email: formData?.email,
          password: formData?.password,
        };

        let resp;
        if (action == "Add") {
          resp = await userServices.createUser(payload);
        } else {
          if (userId === null) return;
          resp = await userServices.updateUser(userId, payload);
        }
        if (resp) {
          setCounter((prev) => prev + 1);
          toast.success(
            `${
              action == "Add"
                ? "User created successfully"
                : "Update User  successfully"
            }`
          );
          handleReset();
          setUserModal(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    (error) => {
      console.log("[Form Errors]", error);
    }
  );

  useEffect(() => {
    const init = async () => {
      try {
        const response = await userServices.getUsers();
        if (response) {
          setUsers(response);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        /* empty */
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [counter]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (user: User) => {
    setAction("Edit");
    if (!user?.id) return;
    setUserId(user?.id);
    reset(user);
    setUserModal(true);
  };

  const handleDelete = async (id: number | null) => {
    try {
      if (!id) return;
      const conf = confirm(`Delete user ${id}`);
      if (conf) {
        const resp = await userServices.deleteUser(id);
        if (resp) {
          setCounter(counter + 1);
          toast.success("Delete User successfully");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>User Management</h2>
          <p>Manage users in the system</p>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleAddUser}
          >
            <FaUserPlus className="me-2" /> Tambah User
          </Button>
        </Col>
      </Row>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.username || ""}</td>
              <td>
                {user?.name
                  ? `${user?.name?.firstname || ""} ${
                      user?.name?.lastname || ""
                    }`
                  : ""}
              </td>
              <td>{user?.email || ""}</td>
              <td>{user?.phone || ""}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="warning" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user?.id || null)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add user modal */}
      {userModal && (
        <Modal
          show={userModal}
          backdrop="static"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => {
            handleReset();
            setUserModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {action} User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onHandlerSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Enter Username"
                      isInvalid={!!errors.username}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.username?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="email"
                      placeholder="Enter email"
                      isInvalid={!!errors.email}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputGroup className="mb-3">
                      <Form.Control
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        isInvalid={!!errors.password}
                        aria-describedby="password"
                      />
                      <Button
                        variant="outline-secondary"
                        id="password"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputGroup>
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="password"
                      placeholder="Confirm password"
                      isInvalid={!!errors.confirmPassword}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  variant="danger"
                  type="reset"
                  onClick={() => {
                    handleReset();
                    setUserModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default UserContent;
