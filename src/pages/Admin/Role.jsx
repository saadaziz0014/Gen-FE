import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Role = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toast = useToast();
  const [users, setUsers] = useState();

  const fetchData = async () => {
    const resp = await axios.get("http://localhost:3001/user/allUsers");
    setUsers(resp.data.users);
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
  }, [users]);

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
        <Navbar pagename={"Roles Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div className="grid grid-cols-4 bg-slate-800 text-white p-2">
          <h1>Email</h1>
          <h1>Role</h1>
          <h1>Status</h1>
          <h1>Action</h1>
        </div>
        {users &&
          users.map((x) => (
            <div className="grid grid-cols-4 font-normal p-2" key={x._id}>
              <h3>{x.email}</h3>
              <h3>{x.role}</h3>
              <h3>{x.status}</h3>
              {x.status == "Active" ? (
                <button
                  className="bg-red-800 text-white p-2 w-24 rounded-sm"
                  onClick={() => handleBlock(x._id)}
                >
                  Block
                </button>
              ) : (
                <button
                  className="bg-green-700 text-white p-2 w-24 rounded-sm"
                  onClick={() => handleBlock(x._id)}
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

export default Role;
