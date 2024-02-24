import React, { useEffect, useState } from "react";
import { reedem, service, users, revenue } from "../../components/Assets/index";
import Menubar from "../../components/admin/Menubar";
import MenuToggle from "../../components/admin/MenuToggle";
import Navbar from "../../components/admin/Navbar";
import { Card } from "@chakra-ui/react";
import ChartCard from "../../components/admin/Chart";
import { BE } from "../../constants/constants";
import axios from "axios";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [users, setUsers] = useState();
  const [requests, setRequests] = useState();
  const fetchData = async () => {
    const resp = await axios.get(`${BE}user/totalUser`);
    setUsers(resp.data.data);
    const respReq = await axios.get(`${BE}user/totalRequests`);
    setRequests(respReq.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div
          className={`w-1/4 h-full bg-gray-200 ${
            showMenu ? "" : "hidden"
          } lg:block`}
        >
          <Menubar />
        </div>
        <div className="flex-1 sm:relative">
          <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
          <div className="h-16 bg-white shadow-md">
            <Navbar pagename={"Dashboard"} />
          </div>
          <div className="flex flex-wrap justify-between mt-10 mx-4 sm:justify-start">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={"350K"}
                subtitle={"Total revenue from home service"}
                icon={revenue}
                color={"bg-gradient-to-r from-cyan-500 to-blue-500"}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={"1.5K"}
                subtitle={"Reward Points redeemed"}
                icon={reedem}
                color={"bg-gradient-to-r from-purple-500 to-pink-500"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={"1.2K"}
                subtitle={"Top Products/Services"}
                icon={service}
                color={"bg-gradient-to-r from-amber-400 to-amber-600"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={"50K"}
                subtitle={"New Users"}
                icon={users}
                color={"bg-gradient-to-r from-lime-400 to-lime-600"}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-between w-full px-2 mb-4">
              {users && (
                <ChartCard
                  heading="Total Active Users"
                  fields={[
                    {
                      name: "Beneficiaries",
                      value: users.beneficiaries,
                    },
                    {
                      name: "Volunteers",
                      value: users.volunteers,
                    },
                    {
                      name: "Organizations",
                      value: users.organizations,
                    },
                    {
                      name: "Admins",
                      value: users.admins,
                    },
                  ]}
                />
              )}
              {requests && (
                <ChartCard
                  heading="Total Requests"
                  fields={[
                    {
                      name: "Pending Beneficiary Requests",
                      value: requests.pendingReq,
                    },
                    {
                      name: "Completed Beneficiary Requests",
                      value: requests.nonPendingReq,
                    },
                    {
                      name: "Pending Donation Requests",
                      value: requests.pendingDon,
                    },
                    {
                      name: "Completed Donation Requests",
                      value: requests.nonPendingDon,
                    },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
