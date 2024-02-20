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
  Dashboard,
  DonationsManagement,
  OrganizationsManagement,
  ReportsManagement,
  VolunteersManagement,
} from "./pages/Admin";
import ForgetPassword from "./pages/ForgetPassword";
import CategoryManagement from "./pages/Admin/CategoryManagement";
import BeneficiaryProfile from "./pages/Benificiaries/BeneficiariesProfile";
import Beneficiaries from "./pages/Benificiaries/Beneficiaries";
import Volunteer_NavBar from "./components/VOLNAV";
import Volunteers from "./pages/Volunteer/Volunteer";
import VolunteerProfile from "./pages/Volunteer/VolunteerProfile";
import Organization_Navbar from "./components/ORGNAV";
import Organization from "./pages/Organization/Organization";
import OrganizationProfile from "./pages/Organization/OrganizationProfile";
import Request from "./pages/Benificiaries/Request";
import Dontation from "./pages/Benificiaries/Dontation";
import OrgRequest from "./pages/Organization/OrgRequest";
import VolRequest from "./pages/Volunteer/VolRequest";
import DonationBox from "./pages/Admin/DonationBox";

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
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/Register",
      element: (
        <>
          <Register />
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
      path: "/beneficiary/BeneficiaryProfile",
      element: (
        <>
          <BenNav />
          <BeneficiaryProfile />
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
      path: "/volunteer/volunteerProfile",
      element: (
        <>
          <Volunteer_NavBar />
          <VolunteerProfile />
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
      )
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
      )
    },
    {
      path: "/organization/organizationProfile",
      element: (
        <>
          <Organization_Navbar />
          <OrganizationProfile />
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
      element: <DonationBox />
    },
    {
      path: "/admin/volunteerManagement",
      element: <VolunteersManagement />,
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
      element: <DonationsManagement />
    },
    {
      path: "/admin/reportsManagement",
      element: <ReportsManagement />
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
