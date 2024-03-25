import React from "react";
import NavBar from "./components/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Services from "./pages/Service";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import BenNav from "./components/BENNAV";
import ExploreServices from "./pages/Benificiaries/Explore-Services";
import About from "./pages/About";
import Footer from "./components/footer";
import AdminLogin from "./components/admin/AdminLogin";
import {
  BeneficiariesManagement,
  CommunityManagement,
  Dashboard,
  DonationsManagement,
  OrganizationsManagement,
  ReportsManagement,
  Role,
  Settings,
  VolunteersManagement,
} from "./pages/Admin";
import ForgetPassword from "./pages/ForgetPassword";
import CategoryManagement from "./pages/Admin/CategoryManagement";
import Beneficiaries from "./pages/Benificiaries/Beneficiaries";
import Volunteer_NavBar from "./components/VOLNAV";
import Volunteers from "./pages/Volunteer/Volunteer";
import Organization_Navbar from "./components/ORGNAV";
import Organization from "./pages/Organization/Organization";
import Request from "./pages/Benificiaries/Request";
import Dontation from "./pages/Benificiaries/Dontation";
import OrgRequest from "./pages/Organization/OrgRequest";
import VolRequest from "./pages/Volunteer/VolRequest";
import DonationBox from "./pages/Admin/DonationBox";
import Community from "./pages/Organization/Community";
import CommunityV from "./pages/Volunteer/CommunityV";
import Otp from "./pages/Otp";
import BProfile from "./pages/Benificiaries/BProfile";
import ServiceDetails from "./pages/ServiceDetail";
import VProfile from "./pages/Volunteer/VProfile";
import OProfile from "./pages/Organization/OProfile";
import CategoryRequest from "./pages/CategoryRequest";
import DonationBen from "./pages/Benificiaries/DonationBen";
import DonationBenReq from "./pages/Admin/DonationBenReq";
import DonationReq from "./pages/Volunteer/DonationReq";
import ReqDontation from "./pages/Benificiaries/ReqDonation";

const App = () => {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
          <HomePage />
          <Footer />
        </>
      ),
    },
    {
      path: "/Services",
      element: (
        <>
          <NavBar />
          <Services />
          <Footer />
        </>
      ),
    },
    {
      path: "/Services/:id",
      element: (
        <>
          <NavBar />
          <ServiceDetails />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <NavBar />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/otp",
      element: (
        <>
          <NavBar />
          <Otp />
          <Footer />
        </>
      ),
    },
    {
      path: "/Register",
      element: (
        <>
          <NavBar />
          <Register />
          <Footer />
        </>
      ),
    },
    {
      path: "/forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "/contact",
      element: (
        <>
          <NavBar />
          <Contact />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <NavBar />
          <About />
          <Footer />
        </>
      ),
    },
    {
      path: "/beneficiary/beneficiary",
      element: (
        <>
          <BenNav />
          <Beneficiaries />
          <Footer />
        </>
      ),
    },
    {
      path: "/beneficiary/donationBen/:id",
      element: (
        <>
          <BenNav />
          <DonationBen />
          <Footer />
        </>
      ),
    },
    {
      path: "/beneficiary/beneficiaryExplore",
      element: (
        <>
          <BenNav />
          <ExploreServices />
          <Footer />
        </>
      ),
    },
    {
      path: "/beneficiary/beneficiaryRequest",
      element: (
        <>
          <BenNav />
          <Request />
          <Footer />
        </>
      ),
    },
    {
      path: "/beneficiary/beneficiaryDonation",
      element: (
        <>
          <BenNav />
          <Dontation />
          <Footer />
        </>
      ),
    },
    {
      path: "/beneficiary/donationReqBen",
      element: (
        <>
          <BenNav />
          <ReqDontation />
          <Footer />
        </>
      ),
    },
    {
      path: "/beneficiary/BeneficiaryProfile",
      element: (
        <>
          <BenNav />
          {/* <BeneficiaryProfile /> */}
          <BProfile />
          <Footer />
        </>
      ),
    },
    {
      path: "/volunteer/volunteer",
      element: (
        <>
          <Volunteer_NavBar />
          <Volunteers />
          <Footer />
        </>
      ),
    },
    {
      path: "/volunteer/beneficiaryCategoryRequests",
      element: (
        <>
          <Volunteer_NavBar />
          <CategoryRequest />
          <Footer />
        </>
      ),
    },
    {
      path: "/volunteer/volunteerProfile",
      element: (
        <>
          <Volunteer_NavBar />
          {/* <VolunteerProfile /> */}
          <VProfile />
          <Footer />
        </>
      ),
    },
    {
      path: "/volunteer/volunteerRequest",
      element: (
        <>
          <Volunteer_NavBar />
          <VolRequest />
          <Footer />
        </>
      ),
    },
    {
      path: "/volunteer/volunteerCommunity",
      element: (
        <>
          <Volunteer_NavBar />
          <CommunityV />
          <Footer />
        </>
      ),
    },
    {
      path: "/volunteer/beneficiaryDonations",
      element: (
        <>
          <Volunteer_NavBar />
          <DonationReq />
          <Footer />
        </>
      ),
    },
    {
      path: "/organization/organization",
      element: (
        <>
          <Organization_Navbar />
          <Organization />
          <Footer />
        </>
      ),
    },
    {
      path: "/organization/organizationRequest",
      element: (
        <>
          <Organization_Navbar />
          <OrgRequest />
          <Footer />
        </>
      ),
    },
    {
      path: "/organization/organizationProfile",
      element: (
        <>
          <Organization_Navbar />
          {/* <OrganizationProfile /> */}
          <OProfile />
          <Footer />
        </>
      ),
    },
    {
      path: "/organization/community",
      element: (
        <>
          <Organization_Navbar />
          <Community />
          <Footer />
        </>
      ),
    },
    {
      path: "/organization/beneficiaryCategoryRequests",
      element: (
        <>
          <Organization_Navbar />
          <CategoryRequest />
          <Footer />
        </>
      ),
    },
    {
      path: "/organization/beneficiaryDonations",
      element: (
        <>
          <Organization_Navbar />
          <DonationReq />
          <Footer />
        </>
      ),
    },
    {
      path: "/adminLogin",
      element: <AdminLogin />,
    },
    {
      path: "/admin/adminDashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin/allDonation",
      element: <DonationBox />,
    },
    {
      path: "/admin/communityManagement",
      element: <CommunityManagement />,
    },
    {
      path: "/admin/volunteerManagement",
      element: <VolunteersManagement />,
    },
    {
      path: "/admin/role-management",
      element: <Role />,
    },
    {
      path: "/admin/organizationManagement",
      element: <OrganizationsManagement />,
    },
    {
      path: "/admin/beneficiaryManagement",
      element: <BeneficiariesManagement />,
    },
    {
      path: "/admin/categoryManagement",
      element: <CategoryManagement />,
    },
    {
      path: "/admin/donationManagement",
      element: <DonationsManagement />,
    },
    {
      path: "/admin/reportsManagement",
      element: <ReportsManagement />,
    },
    {
      path: "/admin/donationBenReq",
      element: <DonationBenReq />,
    },
    {
      path: "/admin/settings",
      element: <Settings />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
};

export default App;
