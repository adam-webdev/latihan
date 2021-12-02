import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";
import { CgChevronDown } from "react-icons/cg";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { UserInfo } from "../../context/UserContext";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserInfo);
  const { userInfo } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleLogout = () => {
    closeSnackbar();
    dispatch({ type: "USER_LOGOUT" });
    localStorage.clear();
    navigate("/login");
    enqueueSnackbar("berhasil logout", { variant: "success" });
  };
  return (
    <div className="nav-container">
      <Link to={userInfo ? "/home" : "/login"} className="nav-logo">
        <FaBookReader />
        <h2>Skripsi</h2>
      </Link>
      {userInfo ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<CgChevronDown />}>
            {userInfo.name}
          </MenuButton>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <div>
          <Link to="login" style={{ marginRight: "10px" }}>
            Login
          </Link>
          <Link to="register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
