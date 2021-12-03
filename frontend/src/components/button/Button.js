import React from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsTrash, BsEye } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";

import "./button.css";

export const ButtonEdit = ({ link, title }) => {
  return (
    <Link to={link} className="link-button-edit">
      <div className="button-edit">
        <HiOutlinePencilAlt />
      </div>
    </Link>
  );
};
export const ButtonCreate = ({ link, title, disabled }) => {
  return (
    <Link to={link} className="link-button-create">
      <div className="button-create">{title}</div>
    </Link>
  );
};
export const ButtonComment = ({ link }) => {
  return (
    <Link to={link} className="link-button-comment">
      <div className="button-comment">
        <AiOutlineComment />
      </div>
    </Link>
  );
};
export const ButtonView = ({ link }) => {
  return (
    <Link to={link} className="link-button-view">
      <div className="button-view">
        <BsEye />
      </div>
    </Link>
  );
};

export const ButtonDelete = ({ onClick }) => {
  return (
    <div className="button-delete" onClick={onClick}>
      <BsTrash />
    </div>
  );
};
export const ButtonUpdate = ({ onClick, title, disabled }) => {
  return (
    <button
      type="button"
      className="button-update"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export const ButtonStatus = ({ onClick, title, color }) => {
  return (
    <div className={`button-status ${color}`} onClick={onClick}>
      {title}
    </div>
  );
};
