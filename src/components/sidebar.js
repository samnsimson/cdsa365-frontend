import React from "react";
import { useSelector } from "react-redux";
import Menus from "./menus";

const Sidebar = () => {
  const { minimiseSidebar } = useSelector((state) => state.dashboard);
  return (
    <div
      className={`${
        minimiseSidebar ? "w-1/3" : "w-full"
      } h-screen bg-slate-800 p-4 text-white font-default`}
    >
      <div
        className={`flex items-center ${
          minimiseSidebar && "justify-center"
        } space-x-4 h-20 max-h-full -mt-4 -mx-4 px-4 `}
      >
        <h4>CDSA 365</h4>
      </div>
      <div>
        <Menus />
      </div>
    </div>
  );
};

export default Sidebar;
