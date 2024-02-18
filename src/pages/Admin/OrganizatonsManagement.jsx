import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const OrganizationsManagement = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toast = useToast();
  const [org, setOrg] = useState();

  const fetchData = async () => {
    const resp = await axios.get("http://localhost:3001/user/allOrganizations");
    setOrg(resp.data.organizations);
  };

  const handleBlock = async (id) => {
    const resp = await axios.get(
      `http://localhost:3001/user/toogleBlock/${id}`
    );
    if (resp.status == 201) {
      toast({
        title: resp.data.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [org]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex">
      <div
        className={`w-1/4 h-auto bg-gray-200 text-gray-500 ${
          showMenu ? "" : "hidden"
        } lg:block`}
      >
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <Navbar pagename={"Organizations Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div className="grid grid-cols-4 bg-slate-800 text-white p-2">
          <h1>Username</h1>
          <h1>Email</h1>
          <h1>Status</h1>
          <h1>Action</h1>
        </div>
        {org &&
          org.map((orga) => (
            <div className="grid grid-cols-4 font-normal p-2" key={orga._id}>
              <h3>{orga.name}</h3>
              <h3>{orga.email}</h3>
              <h3>{orga.status}</h3>
              {orga.status == "Active" ? (
                <button
                  className="bg-red-800 text-white p-2 w-24 rounded-sm"
                  onClick={() => handleBlock(orga._id)}
                >
                  Block
                </button>
              ) : (
                <button
                  className="bg-green-700 text-white p-2 w-24 rounded-sm"
                  onClick={() => handleBlock(orga._id)}
                >
                  Activate
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrganizationsManagement;
