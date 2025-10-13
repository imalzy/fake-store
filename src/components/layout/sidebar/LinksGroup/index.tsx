import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse, Badge } from "react-bootstrap";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import cn from "classnames";

import "./styles.css";

export interface LinkInterface {
  name: string;
  link: string;
  badge?: {
    text: string;
    variant: string;
  };
}

interface LinksGroupProps {
  header: string;
  headerLink?: string;
  childrenLinks?: LinkInterface[];
  glyph?: string;
  badge?: {
    text: string;
    variant: string;
  };
  Icon?: React.FC;
  label?: string;
  activeItem?: string;
  index?: string | number;
  deep?: number;
  onClick?: (headerLink: string) => void;
}

const LinksGroup = ({
  header,
  headerLink,
  childrenLinks,
  badge,
  Icon,
  label,
  onClick,
}: LinksGroupProps) => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(
    () =>
      childrenLinks &&
      childrenLinks.some(({ link }) => link === location.pathname),
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const isActive =
    headerLink &&
    (location.pathname === headerLink ||
      (childrenLinks &&
        childrenLinks.some(({ link }) => link === location.pathname)));

  const componentIcon = () => {
    if (Icon) {
      return <Icon />;
    }
    return null;
  };

  if (childrenLinks) {
    return (
      <li className={cn("nav-item", { active: isActive })}>
        <a
          className={`sidebar-link sidebar-link-with-children d-flex ${isActive ? "active" : ""}`}
          onClick={toggleOpen}
        >
          <div className="sidebar-item-icon">{componentIcon()}</div>
          <span className="sidebar-item-label">
            {header}
            {badge && (
              <Badge bg={badge.variant} className="ms-1">
                {badge.text}
              </Badge>
            )}
          </span>
          <span className="sidebar-arrow ml-auto">
            {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          </span>
        </a>
        <Collapse in={isOpen}>
          <ul className="sidebar-sub-links">
            {childrenLinks.map((link, idx) => (
              <li key={`${link.link}-${idx}`} className="nav-item">
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    cn("sidebar-sub-link d-flex", {
                      active: isActive,
                    })
                  }
                >
                  <span className="sidebar-item-label">
                    {link.name}
                    {link.badge && (
                      <Badge bg={link.badge.variant} className="ms-1">
                        {link.badge.text}
                      </Badge>
                    )}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </Collapse>
      </li>
    );
  }

  if (headerLink) {
    return (
      <li className={cn("nav-item", { active: isActive })}>
        <NavLink
          to={headerLink}
          onClick={onClick && (() => onClick(headerLink))}
          className={({ isActive }) =>
            cn("sidebar-link d-flex", {
              active: isActive,
            })
          }
        >
          <div className="sidebar-item-icon">{componentIcon()}</div>
          <span className="sidebar-item-label">
            {header}
            {badge && (
              <Badge bg={badge.variant} className="ms-1">
                {badge.text}
              </Badge>
            )}
          </span>
          {label && (
            <Badge bg="primary" className="ms-auto sidebar-label">
              {label}
            </Badge>
          )}
        </NavLink>
      </li>
    );
  }

  return (
    <li>
      <a className={cn("sidebar-link d-flex", { active: isActive })}>
        <div className="sidebar-item-icon">{componentIcon()}</div>
        <span>
          {header}
          {badge && (
            <Badge bg={badge.variant} className="ms-1">
              {badge.text}
            </Badge>
          )}
        </span>
        {label && (
          <Badge bg="primary" className="ms-auto">
            {label}
          </Badge>
        )}
      </a>
    </li>
  );
};

export default LinksGroup;
