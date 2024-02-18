import React, { useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import UsersTable from "../../components/admin/Table";

const RoleManagement = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-screen bg-gray-100 ${showMenu ? "" : "hidden"
          } lg:block`}>
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <Navbar pagename={"Permission and Role Management"} />
        <div>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
