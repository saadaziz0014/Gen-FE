import React, { useState } from "react";
import {
  logo,
  dashboard,
  home,
  user,
  showcase,
  settings,
  role,
  market,
  content,
  customer,
  category,
  logout,
  donation,
  donationBen,
} from "../Assets/index";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Menubar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("adminToken");
    Cookies.remove("role");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: dashboard, link: "/admin/adminDashboard" },
    {
      name: "All Donations",
      icon: donation,
      link: "/admin/allDonation",
    },
    {
      name: "Organizatons Management",
      icon: user,
      link: "/admin/organizationManagement",
    },
    {
      name: "Volunteers Management",
      icon: customer,
      link: "/admin/volunteerManagement",
    },
    {
      name: "Beneficiaries Management",
      icon: content,
      link: "/admin/beneficiaryManagement",
    },
    {
      name: "Community Management",
      icon: showcase,
      link: "/admin/communityManagement",
    },
    {
      name: "Beneficiaries Donations Request",
      icon: donationBen,
      link: "/admin/donationBenReq"
    },
    {
      name: "Donations Management",
      icon: home,
      link: "/admin/donationManagement",
    },
    {
      name: "Category Management",
      icon: category,
      link: "/admin/categoryManagement",
    },
    {
      name: "Report Management",
      icon: market,
      link: "/admin/reportsManagement",
    },
    { name: "Permission & Role", icon: role, link: "/admin/role-management" },
    { name: "Settings", icon: settings, link: "/admin/settings" },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-center h-20">
        <img src={logo} alt="Company Logo" className="h-20 w-30 pt-5" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col items-start pt-20">
          <span className="px-5 py-2 text-black">Menu</span>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`px-4 py-3 flex items-center ${selectedItem === item ? "text-lime-500" : "hover:text-gray"
                }`}
              onClick={() => handleItemClick(item)}
            >
              <img src={item.icon} alt={item.name} className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline-block">{item.name}</span>
            </Link>
          ))}
        </div>
        <div
          className="flex items-center justify-center h-20 cursor-pointer text-red-500"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <div className="flex" onClick={handleLogout}>
            <img src={logout} alt="Logout" className="h-6 w-6 mr-2" />
            <span className="hidden sm:inline-block text-red-500 text-2xl ">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
