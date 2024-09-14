import React from "react";
import { ReactComponent as Logo } from "./../assets/images/logo.svg";
import { ReactComponent as Moon } from "./../assets/images/icon-moon.svg";
import { ReactComponent as Arrow } from "./../assets/images/icon-arrow-down.svg";
import { Switch } from "antd";
import "antd/dist/reset.css";

export default function Navbar({ darkMode, setDarkMode }) {
  const onChange = (checked) => {
    setDarkMode(checked);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-5 sm:space-y-0">
      <Logo />

      <div className="flex space-x-5 items-center">
        <div className="flex items-baseline space-x-3 border-r pr-5">
          <p className="dark:text-white">Serif</p> <Arrow />
        </div>
        <Switch
          checked={darkMode}
          onChange={onChange}
          style={darkMode ? { backgroundColor: "#a942f3" } : {}}
        />

        <Moon />
      </div>
    </div>
  );
}
