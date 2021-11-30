import React from "react";
import { ButtonUpdate } from "../button/Button";
import "./user.css";
const UpdateUser = () => {
  const handleClick = () => {
    console.log("ok updated");
  };
  return (
    <div className="update-user">
      <h3>ROLES</h3>
      <select className="select-role">
        <option>Admin</option>
        <option>User</option>
        <option>Petani</option>
        <option>Ahli Tani</option>
        <option>Penyuluh</option>
        <option>Petugas</option>
      </select>
      <ButtonUpdate onClick={handleClick} title="Update Roles" />
    </div>
  );
};

export default UpdateUser;
