import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Category from "../../components/admin/Category";

const CategoryManagement = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toast = useToast();
  const [cat, setCat] = useState();

  const fetchData = async () => {
    const resp = await axios.get("http://localhost:3001/category/adminAll");
    setCat(resp.data.categories);
  };

  const handleBlock = async (id) => {
    const resp = await axios.get(
      `http://localhost:3001/category/toogleDelete/${id}`
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

  const handleDelete = async (id) => {
    const resp = await axios.get(
      `http://localhost:3001/category/toogleDelete/${id}`
    );
    if (resp.status == 201) {
      toast({
        title: "Action Done",
        status: "success",
        isClosable: true,
        duration: 2000,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

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
      <div className="w-full h-screen">
        <Navbar pagename={"Categories Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div className="flex justify-end">
          {/* <button className="bg-green-600 m-5 p-2 rounded-md text-white hover:bg-gradient-to-r from-green-800">
            Add Category
          </button> */}
          <Category />
        </div>
        <div className="grid grid-cols-4 bg-slate-800 text-white p-2">
          <h1>Name</h1>
          <h1>Is Deleted</h1>
          <h1>Action</h1>
        </div>
        {cat &&
          cat.map((orga) => (
            <div className="grid grid-cols-4 font-normal p-2" key={orga._id}>
              <h3>{orga.name}</h3>
              <h3>{orga.isDeleted ? "Deleted" : "Active"}</h3>
              {orga.isDeleted == false ? (
                <button
                  className="bg-red-800 text-white p-2 w-24 rounded-sm"
                  onClick={() => handleDelete(orga._id)}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="bg-green-700 text-white p-2 w-24 rounded-sm"
                  onClick={() => handleDelete(orga._id)}
                >
                  Restore
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
