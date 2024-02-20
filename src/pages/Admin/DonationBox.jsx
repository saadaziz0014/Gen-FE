import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import { BE } from "../../constants/constants";

const DonationBox = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [donations, setDonations] = useState();
    const [amount, setAmount] = useState();
    const allDonations = async () => {
        const resp = await axios.get(`${BE}donation/all`);
        setDonations(resp.data.data.donations)
        setAmount(resp.data.data.sum);
    }
    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        allDonations()
    }, [])

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
                <div className="flex justify-end my-5">
                    <h1 className="font-semibold text-xl">Total: {amount}</h1>
                </div>
                <div className="grid grid-cols-2 bg-slate-800 text-white p-2">
                    <h1>Doner</h1>
                    <h1>Amount</h1>
                </div>
                {donations &&
                    donations.map((x) => (
                        <div className="grid grid-cols-2 font-normal p-2" key={x._id}>
                            <h3>{x.userId.name}</h3>
                            <h3>{x.amount}</h3>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DonationBox;
