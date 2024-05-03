import React from 'react';
import Cam from "../img/cam.jpg";
import Voice from "../img/voice.png";
import Setting from "../img/setting.png";
import navbarStyle from '../css/navbar.module.css';

const Navbar = ({ latestUser }) => {
  return (
    <div className={navbarStyle.navbar}>
      <div className={navbarStyle.left}>
       <p>It's <span>{latestUser ? latestUser : "Me"}</span></p>  {/* Display latestUser */}
      </div>
      <div className={navbarStyle.right}>
        <img src={Cam} alt="cam" />
        <img src={Voice} alt="voice" />
        <img src={Setting} alt="setting" />
      </div>
    </div>
  );
};

export default Navbar;
