import React, { useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";

const CommunityManagement = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-auto bg-gray-200 text-gray-500 ${showMenu ? "" : "hidden"
          } lg:block`}>
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <Navbar pagename={"Community Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <p>Community Management</p>
      </div>
    </div>
  );
};

export default CommunityManagement;
