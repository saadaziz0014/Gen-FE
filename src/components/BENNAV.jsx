import "./bennav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { scrollToTop } from "../constants/scrollToTop";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
const BenNav = ({ navBar2, showCase1Page }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [whenScroll, setWhenScroll] = useState("bg-transparent");
  const [logo, setlogo] = useState("/GEN-Serve.png");
  const [textColor, setTextColor] = useState("text-white");
  const [showcaseDropDown, setShowcaseDropDown] = useState(false);
  const [viewSideNav, setViewSideNav] = useState(false);
  const hideNav = () => {
    setViewSideNav(false);
  };
  const handleLogout = () => {
    Cookies.remove("role");
    Cookies.remove("id");
    navigate("/login");
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setWhenScroll("bg-white");
        setlogo("/GEN-Serve.png");
        setTextColor("text-blue-400");
      } else {
        setWhenScroll("transparent");
        setTextColor("text-white");
        setlogo("/GEN-Serve.png");
      }
    };
    if (
      !Cookies.get("role") ||
      (Cookies.get("role") != "beneficiary" && Cookies.get("role") != "admin")
    ) {
      toast({
        title: "Only Beneficiary Allowed",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
      navigate("/login");
    }
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <>
      <div style={{ zIndex: 99 }} className="bg-white sticky top-0 z-50">
        <nav
          style={{ maxWidth: 1200 }}
          className="flex justify-between mx-auto items-center gap-4  px-10 max-sm:px-5 font-medium"
        >
          <Link onClick={scrollToTop} to="/">
            <img
              src={navBar2 ? "/GEN-Serve.png" : logo}
              className="w-32 max-lg:w-10"
              alt="Homyz-logo"
            />
          </Link>
          <ul
            className={`${"text-black"} text-xl flex max-lg:hidden gap-11 items-center`}
          >
            <Link
              onClick={scrollToTop}
              className={`${
                location.pathname == "/beneficiary/beneficiary" &&
                "bg-orange-500 p-1 text-white"
              } hover:text-orange-500`}
              to="/beneficiary/beneficiary"
            >
              Beneficiaries
            </Link>
            <Link
              onClick={scrollToTop}
              className={`${
                location.pathname == "/beneficiary/beneficiaryExplore" &&
                "bg-orange-500 p-1 text-white"
              } hover:text-orange-500`}
              to="/beneficiary/beneficiaryExplore"
            >
              Explore Services
            </Link>

            <Link
              onClick={scrollToTop}
              className={`${
                location.pathname == "/beneficiary/beneficiaryRequest" &&
                "bg-orange-500 p-1 text-white"
              } hover:text-orange-500`}
              to="/beneficiary/beneficiaryRequest"
            >
              Request Services
            </Link>
            <Link
              onClick={scrollToTop}
              className={`${
                location.pathname == "/beneficiary/donationReqBen" &&
                "bg-orange-500 p-1 text-white"
              } hover:text-orange-500`}
              to="/beneficiary/donationReqBen"
            >
              Donation Services
            </Link>

            <Link
              onClick={scrollToTop}
              className={`${
                location.pathname == "/beneficiary/beneficiaryDonation" &&
                "bg-orange-500 p-1 text-white"
              } hover:text-orange-500`}
              to="/beneficiary/beneficiaryDonation"
            >
              Donation Requests
            </Link>

            {/* <Link onClick={scrollToTop} to="/beneficiary/BeneficiaryProfile">
              <button className="text-xl px-5 py-2">Profile</button>
            </Link> */}
            <Link
              onClick={handleLogout}
              className="hover:text-orange-400 transition-all w-full block"
            >
              <button className="text-xl px-5 py-2">Logout</button>
            </Link>
            <Link
              onClick={scrollToTop}
              to="/beneficiary/BeneficiaryProfile"
              className="transition-all w-full block"
            >
              <img src="/profile-icon.png" alt="aa" />
            </Link>
          </ul>
        </nav>
      </div>

      {/* side nav bar for mobile view */}
      <div
        onClick={() => {
          setViewSideNav(!viewSideNav);
        }}
        style={{ zIndex: 99 }}
        className={`fixed ${
          viewSideNav ? "translate-x-0" : "-translate-x-full"
        } top-0 left-0 bottom-0 right-0  bg-black/40`}
      ></div>
      <nav
        style={{ zIndex: 100 }}
        // style={{ height: 8000 }}
        className={`fixed top-0 bottom-0 hidden max-lg:block ${
          viewSideNav ? "translate-x-0" : "-translate-x-full"
        } bg-white  left-0 w-96 p-5 px-10 max-sm:px-5 max-sm:w-80 z-30 transition-all font-medium`}
      >
        <div id="header" className="flex justify-between items-center">
          <img className="w-36" src="/Homyz-logo2.png" alt="Homyz-logo2" />
          <div
            onClick={() => {
              setViewSideNav(!viewSideNav);
            }}
            className="cancel cursor-pointer w-7 h-7"
            id="close-modal"
          >
            <div style={{ width: 3 }} className="relative mx-auto h-full">
              <div
                style={{ width: 2 }}
                className="absolute h-full bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 rotate-45"
              ></div>
              <div
                style={{ width: 2 }}
                className="absolute h-full bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 -rotate-45"
              ></div>
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-3 mt-8 text-xl ">
          <Link
            onClick={() => {
              hideNav();
              scrollToTop();
            }}
            to="/"
            className={`${
              location.pathname == "/beneficiary/" &&
              "bg-orange-500 p-1 text-white"
            } hover:text-orange-500`}
          >
            Beneficiaries
          </Link>
          <Link
            onClick={() => {
              hideNav();
              scrollToTop();
            }}
            to="/services"
            className={`${
              location.pathname == "/beneficiary/" &&
              "bg-orange-500 p-1 text-white"
            } hover:text-orange-500`}
          >
            Explore Services
          </Link>
          <div className="relative">
            <div
              className={`${
                showcaseDropDown ? "top-[114px]" : "top-[41px]"
              } transition-all duration-200 absolute  w-full bg-white h-24`}
            >
              <Link
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                to={"/BeneficiariesRequests"}
                className="hover:text-orange-400 transition-all w-full block"
              >
                Request Services
              </Link>
              <Link
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                to={"/BeneficiaryProfile"}
                className="hover:text-orange-400 transition-all w-full block"
              >
                <button className="py-[6px] px-3 mt-4">Profile</button>
              </Link>
              <div className="hover:text-orange-400 transition-all w-full block">
                <button className="py-[6px] px-3 mt-4">Logout</button>
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default BenNav;
