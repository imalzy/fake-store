import { Navbar as BootstrapNavbar, Nav, Dropdown } from "react-bootstrap";
import { FaSignOutAlt, FaCog, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/cartContext";

interface NavbarProps {
  expanded: boolean;
}

const Navbar = ({ expanded }: NavbarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <BootstrapNavbar
      bg="white"
      expand="lg"
      className="shadow-none"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: expanded ? "250px" : "60px",
        zIndex: 100,
        transition: "left 0.3s ease",
        height: "77px",
        padding: "0 2rem",
      }}
    >
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav" className="justify-content-end">
        <Nav>
          <div className="cartIconWrapper">
            <FaShoppingCart className="cartIcon" />
            {cartCount > 0 && <span className="badge" style={{color: 'red'}}>{cartCount}</span>}
          </div>

          <Dropdown align="end">
            <Dropdown.Toggle
              as={Nav.Link}
              id="dropdown-user"
              className="d-flex align-items-center gap-2 text-dark py-2 px-3 "
              style={{ fontWeight: 500 }}
            >
              {/* Avatar image */}
              <img
                src={`https://placehold.co/40x40?text=${user?.username
                  ?.split("")[0]
                  .toUpperCase()}`}
                alt="User Avatar"
                className="rounded-circle"
                style={{ width: "32px", height: "32px", objectFit: "cover" }}
              />
              <span className="d-none d-md-inline">
                {user?.username || "User"}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-sm rounded-3 mt-2">
              <Dropdown.Item className="d-flex align-items-center gap-2 py-2">
                <FaCog size={16} />
                <span>Settings</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={handleLogout}
                className="d-flex align-items-center gap-2 text-danger py-2"
              >
                <FaSignOutAlt size={16} />
                <span>Logout</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
