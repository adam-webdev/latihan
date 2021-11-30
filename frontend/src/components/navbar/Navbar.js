import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { CgChevronDown } from "react-icons/cg";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
const Navbar = () => {
  return (
    <div className="nav-container">
      <Link to="/home" className="nav-logo">
        <FaBookReader />
        <h2>Skripsi</h2>
      </Link>
      <Menu>
        <MenuButton as={Button} rightIcon={<CgChevronDown />}>
          Adam
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Navbar;
