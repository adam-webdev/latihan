import React from "react";
import "./home.css";
import { FiUsers } from "react-icons/fi";
import { BsBook } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { BiPaperPlane } from "react-icons/bi";
import { AiOutlineAppstore, AiOutlineLock } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";
import { DiRedis } from "react-icons/di";
import { MdOutlineVerifiedUser, MdOutlineManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="wrapp-home">
      <div className="card">
        <div className="row">
          <Link to="/user" className="link-home">
            <FiUsers className="icons-home" />
            <p>User</p>
          </Link>
          <Link to="/complain" className="link-home">
            <BsBook className="icons-home" />
            <p>Complain</p>
          </Link>
        </div>
        <div className="row">
          <Link to="/news" className="link-home">
            <FaRegNewspaper className="icons-home" />
            <p>News</p>
          </Link>
          <Link to="/pest-management" className="link-home">
            <MdOutlineManageAccounts className="icons-home" />
            <p>Pest Management</p>
          </Link>
        </div>
        <div className="row">
          <Link to="/product" className="link-home">
            <GoTasklist className="icons-home" />
            <p>Product</p>
          </Link>
          <Link to="/plaint" className="link-home">
            <BiPaperPlane className="icons-home" />
            <p>Plant</p>
          </Link>
        </div>
        <div className="row">
          <Link to="/discussion" className="link-home">
            <FiUsers className="icons-home" />
            <p>Discussion</p>
          </Link>
          <Link to="/erdkk" className="link-home">
            <AiOutlineAppstore className="icons-home" />
            <p>E-RDKK</p>
          </Link>
        </div>
        <div className="row">
          <Link to="/producer-price" className="link-home">
            <IoPricetagsOutline className="icons-home" />
            <p>Producer Price</p>
          </Link>
          <Link to="/planting-guide" className="link-home">
            <MdOutlineVerifiedUser className="icons-home" />
            <p>Planting Guide</p>
          </Link>
        </div>
        <div className="row">
          <Link to="/directory" className="link-home">
            <DiRedis className="icons-home" />
            <p>Directory</p>
          </Link>
          <Link to="/field" className="link-home">
            <AiOutlineLock className="icons-home" />
            <p>Field</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
