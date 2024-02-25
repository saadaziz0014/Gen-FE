import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Role = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toast = useToast();
  const [role, setRole] = useState({ r: "", i: -1 });
  const [users, setUsers] = useState();

  const fetchData = async () => {
    setRole({ r: "", i: -1 });
    const resp = await axios.get("http://localhost:3001/user/allUsers");
    setUsers(resp.data.users);
  };

  const handleRole = (index, role) => {
    setRole({ r: role, i: index });
  };

  const chnageRole = async (id, role) => {
    const resp = await axios.post(`http://localhost:3001/user/changeRole`, {
      id,
      role,
    });
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
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <div className="grid grid-cols-4 gap-2 bg-slate-800 text-white p-2">
          <h1>Email</h1>
          <h1>Role</h1>
          <h1>Status</h1>
          <h1>Action</h1>
        </div>
        {users &&
          users.map((x, index) => (
            <div className="grid grid-cols-4 gap-2 font-normal p-2" key={x._id}>
              <h3>{x.email}</h3>
              <select
                value={role.i == index ? role.r : x.role}
                onChange={(e) => handleRole(index, e.target.value)}
              >
                <option value="beneficiary">Beneficiary</option>
                <option value="organization">Organization</option>
                <option value="volunteer">Volunteer</option>
                <option value="admin">Admin</option>
              </select>
              <h3>{x.status}</h3>
              {role.i == index && (
                <button
                  className="bg-blue-600 text-white p-2 w-24 rounded-sm"
                  onClick={() => chnageRole(x._id, role.r)}
                >
                  Update
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Role;
