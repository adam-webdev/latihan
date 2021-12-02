import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../context/UserContext";
import useInput from "../../custom-hooks/useInput";
import { useSnackbar } from "notistack";
import { ButtonUpdate } from "../button/Button";
import "./user.css";
const UpdateUser = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { id } = useParams();
  const [roles, setRoles] = useState();
  const navigate = useNavigate();

  // console.log(`${baseUrl}/user/${id}`);

  const handleClick = () => {
    const updateUser = {
      method: "PUT",
      url: `${baseUrl}/user/${id}`,
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      data: {
        role: roles,
      },
    };
    closeSnackbar();
    axios
      .request(updateUser)
      .then((response) => {
        enqueueSnackbar("User Berhasil diupdate", {
          variant: "success",
        });
        navigate("/user");
      })
      .catch((error) => {
        enqueueSnackbar("User gagal diupdate", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="update-user">
      <h3>ROLES</h3>
      <select
        className="select-role"
        value={roles}
        onChange={(e) => setRoles(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="petani">Petani</option>
        <option value="ahli tani">Ahli Tani</option>
        <option value="penyuluh">Penyuluh</option>
        <option value="petugas">Petugas</option>
      </select>
      <ButtonUpdate onClick={handleClick} title="Update Roles" />
    </div>
  );
};

export default UpdateUser;
