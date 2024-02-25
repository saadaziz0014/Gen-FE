import React, { useEffect } from "react";
import { demouser } from "../Assets/index";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

const Navbar = ({ pagename }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    if (
      location.pathname == "/admin/role-management" &&
      (Cookies.get("role") == undefined || Cookies.get("role") != "superAdmin")
    ) {
      toast({
        title: `Only Super Admin Allowed`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
      navigate("/admin/adminDashboard");
    }
    if (
      location.pathname.startsWith("/admin") &&
      (Cookies.get("adminToken") == undefined ||
        Cookies.get("adminToken") != "genserveadmin")
    ) {
      toast({
        title: `Not Allowed`,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
      navigate("/adminLogin");
    }
  }, []);

  return (
    <nav className="bg-white flex items-center justify-between h-20 px-8 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-500">{pagename}</h1>
      </div>
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-4">
          <img src={demouser} alt="avatar" className="rounded-full h-8 w-8" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium">Genserve</span>
          <span>{Cookies.get("role")}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
