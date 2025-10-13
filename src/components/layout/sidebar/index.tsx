import { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaStore,
  FaTachometerAlt,
  FaUsers,
  FaList,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import LinksGroup from "./LinksGroup";
import "./sidebar.css";
import { logout } from "../../../utils/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  expanded: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ expanded, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div
      className={`sidebar bg-white d-flex flex-column ${expanded ? "expanded" : "collapsed"}`}
      style={{
        width: expanded ? "250px" : "60px",
        transition: "width 0.3s ease",
        position: "fixed",
        height: "100vh",
        overflowX: "hidden",
        zIndex: 1000,
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center p-3 sidebar-header"
        style={{
          background: "linear-gradient(to right, #eb3349, #f45c43)",
          height: "77px",
        }}
      >
        {expanded && <h5 className="mb-0">Fake Store</h5>}
        <Button
          variant="link"
          className="text-light p-0 ms-auto toggle-btn"
          onClick={toggleSidebar}
        >
          {expanded ? <FaChevronLeft /> : <FaChevronRight />}
        </Button>
      </div>

      <div className="sidebar-content">
        <ul className="nav flex-column sidebar-nav">
          <LinksGroup
            header="Dashboard"
            headerLink="/dashboard"
            Icon={FaTachometerAlt}
            activeItem={activeItem}
            onClick={(link) => setActiveItem(link)}
          />
          <LinksGroup
            header="Products"
            headerLink="/products"
            Icon={FaStore}
            activeItem={activeItem}
            onClick={(link) => setActiveItem(link)}
          />
          <LinksGroup
            header="Categories"
            Icon={FaList}
            headerLink="/categories"
            activeItem={activeItem}
            onClick={(link) => setActiveItem(link)}
          />
          <LinksGroup
            header="Orders"
            Icon={FaShoppingCart}
            badge={{ text: "New", variant: "danger" }}
            childrenLinks={[
              {
                name: "All Orders",
                link: "/orders",
              },
              {
                name: "Pending",
                link: "/orders/pending",
                badge: { text: "5", variant: "warning" },
              },
              {
                name: "Completed",
                link: "/orders/completed",
              },
            ]}
            activeItem={activeItem}
            onClick={(link) => setActiveItem(link)}
          />
          <LinksGroup
            header="Users"
            Icon={FaUsers}
            headerLink="/users"
            activeItem={activeItem}
            onClick={(link) => setActiveItem(link)}
          />
          <LinksGroup
            header="Settings"
            Icon={FaCog}
            headerLink="/settings"
            activeItem={activeItem}
            onClick={(link) => setActiveItem(link)}
          />
        </ul>
      </div>

      {expanded && (
        <div className="sidebar-footer mt-auto p-3">
          <Button
            variant="outline-danger"
            size="sm"
            className="w-100 d-flex align-items-center justify-content-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
