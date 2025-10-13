import { useState } from "react";
import type { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="d-flex">
      <Sidebar expanded={sidebarExpanded} toggleSidebar={toggleSidebar} />

      <div
        className="content-wrapper"
        style={{
          marginLeft: sidebarExpanded ? "250px" : "60px",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        <Navbar expanded={sidebarExpanded} />

        <div
          className="content p-4"
          style={{
            marginTop: "60px",
            backgroundColor: "#f9f6f2",
            height: "100%",
          }}
        >
          <Container className="py-3">{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
