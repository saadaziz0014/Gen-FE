import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";

const ReportsManagement = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [rep, setRep] = useState();

  const fetchData = async () => {
    const resp = await axios.get("http://localhost:3001/user/allComplaints");
    setRep(resp.data.complains);
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
        className={`w-1/4 h-auto bg-gray-200 text-gray-500 ${showMenu ? "" : "hidden"
          } lg:block`}
      >
        <Menubar />
      </div>
      <div className="w-full h-screen">
        <Navbar pagename={"Reports Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div className="grid grid-cols-5 bg-slate-800 text-white p-2">
          <h1>First Name</h1>
          <h1>Last Name</h1>
          <h1>Email</h1>
          <h1>Phone</h1>
          <h1>Message</h1>
        </div>
        {rep &&
          rep.map((x) => (
            <div className="grid grid-cols-5 font-normal p-2" key={x._id}>
              <h3>{x.firstName}</h3>
              <h3>{x.lastName}</h3>
              <h3>{x.email}</h3>
              <h3>{x.phoneNo}</h3>
              <textarea readOnly value={x.message} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReportsManagement;
