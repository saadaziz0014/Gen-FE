import React, { useEffect, useState } from "react";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import axios from "axios";
import { BE } from "../../constants/constants";
import DonationAdmin from "../../components/admin/DonationAdmin";
import ViewBenReq from "../../components/admin/ViewBenReq";
import { Button } from "@chakra-ui/react";

const DonationBenReq = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [donations, setDonations] = useState();
    const [toogle, setToogle] = useState("Initial");
    const allDonations = async () => {
        const resp = await axios.get(`${BE}adminDonation/allBen`);
        setDonations(resp.data.requests)
    }
    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    const verify = async (id) => {
        const resp = await axios.get(`${BE}adminDonation/makeVerify/${id}`);
    }

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
                <Navbar pagename={"Beneficiaries Donation Request"} />
                <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
                <div className="flex justify-start ml-3 mb-6">
                    <select name="" id="" value={toogle} onChange={(e) => setToogle(e.target.value)}>
                        <option value="Initial">Initial</option>
                        <option value="Verified">Verified</option>
                        <option value="PaymentDone">Payment Done</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="grid grid-cols-6 bg-slate-800 text-white p-2">
                    <h1>Beneficiary</h1>
                    <h1>Title</h1>
                    <h1>Amount Required</h1>
                    <h1>Benefactor</h1>
                    <h1>View</h1>
                    <h1>Action</h1>
                </div>
                {donations &&
                    donations.map((x) => (
                        <>
                            {x.status == toogle && (
                                <div className="grid grid-cols-6 font-normal p-2" key={x._id}>
                                    <h3>{x.beneficiary.name}</h3>
                                    <h3>{x.title}</h3>
                                    <h3>{x.amount}</h3>
                                    <h3>{x.benefactor.name}</h3>
                                    <ViewBenReq donation={x} />
                                    {x.status == "Initial" && <Button colorScheme="green" width={20} onClick={() => verify(x._id)}>Verify</Button>}
                                </div>
                            )}
                        </>
                    ))}
            </div>
        </div>
    );
};

export default DonationBenReq;