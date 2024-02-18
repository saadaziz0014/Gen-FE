import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import { BE } from "../../constants/constants";
import DonationAdmin from "../../components/admin/DonationAdmin";

const DonationsManagement = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [donations, setDonations] = useState();
  const allDonations = async () => {
    const resp = await axios.get(`${BE}adminDonation/all`);
    setDonations(resp.data.donations)
  }
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    allDonations()
  }, [donations])

  return (
    <div className="flex">
      <div
        className={`w-1/4  h-screen bg-gray-200 text-gray-500 ${showMenu ? "" : "hidden"
          } lg:block`}>
        <Menubar />
      </div>
      <div className="w-3/4 h-screen">
        <Navbar pagename={"Donation Management"} />
        <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
        <div className="grid grid-cols-5 bg-slate-800 text-white p-2">
          <h1>Beneficiary</h1>
          <h1>Title</h1>
          <h1>Amount Required</h1>
          <h1>Amount Till</h1>
        </div>
        {donations &&
          donations.map((x) => (
            <div className="grid grid-cols-5 font-normal p-2" key={x._id}>
              <h3>{x.beneficiary.name}</h3>
              <h3>{x.title}</h3>
              <h3>{x.amountRequired}</h3>
              <h3>{x.amount}</h3>
              <DonationAdmin donation={x} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DonationsManagement;
