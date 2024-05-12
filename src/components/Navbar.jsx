import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { scrollToTop } from "../constants/scrollToTop";
const NavBar = () => {
  const [whenScroll, setWhenScroll] = useState("bg-transparent");
  const [logo, setlogo] = useState("/GEN-Serve.png");
  const [textColor, setTextColor] = useState("text-white");
  const [showcaseDropDown, setShowcaseDropDown] = useState(false);
  const [viewSideNav, setViewSideNav] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const hideNav = () => {
    setViewSideNav(false);
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
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <>
      <div style={{}} className="bg-white sticky top-0 z-50">
        <nav
          style={{ maxWidth: 1200 }}
          className="flex justify-between mx-auto items-center gap-4 px-5 font-medium"
        >
          <NavLink onClick={scrollToTop} to="/">
            <img src="/GEN-Serve.png" className="w-32" alt="GEN-Serve" />
          </NavLink>
          <ul
            className={`${"text-blue-400"} text-lg flex justify-center items-center gap-8`}
          >
            <NavLink
              onClick={scrollToTop}
              className={({ isActive }) => {
                return isActive
                  ? "bg-orange-300 p-2 text-white"
                  : "hover:text-orange-400 transition-all";
              }}
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              onClick={scrollToTop}
              className={({ isActive }) => {
                return isActive
                  ? "bg-orange-300 p-2 text-white"
                  : "hover:text-orange-400 transition-all";
              }}
              to="/Services"
            >
              Our Services
            </NavLink>
            <NavLink
              onClick={scrollToTop}
              className={({ isActive }) => {
                return isActive
                  ? "bg-orange-300 p-2 text-white"
                  : "hover:text-orange-400 transition-all";
              }}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              onClick={scrollToTop}
              to="/contact"
              className={({ isActive }) => {
                return isActive
                  ? "bg-orange-300 p-2 text-white"
                  : "hover:text-orange-400 transition-all";
              }}
            >
              Contact US
            </NavLink>
            <NavLink
              onClick={scrollToTop}
              className={({ isActive }) => {
                return isActive
                  ? "bg-orange-300 p-2 text-white"
                  : "hover:text-orange-400 transition-all";
              }}
              to="/Login"
            >
              Login
            </NavLink>
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
        } bg-white  left-0 w-96 px-10 z-30 transition-all font-medium`}
      >
        <div id="header" className="flex justify-between items-center">
          <img className="w-32 h-20" src="/GEN-Serve.jpg" alt="GEN-Serve" />
          <div
            onClick={() => {
              setViewSideNav(!viewSideNav);
            }}
            className="cancel cursor-pointer w-7 h-7"
            id="close-modal"
          >
            <div style={{ width: 3 }} className="relative mx-auto">
              <div
                style={{ width: 2 }}
                className=" bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 rotate-45"
              ></div>
              <div
                style={{ width: 2 }}
                className=" bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 -rotate-45"
              ></div>
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-3 text-lg ">
          <NavLink
            onClick={() => {
              hideNav();
              scrollToTop();
            }}
            to="/"
            className={({ isActive }) => {
              return isActive
                ? "bg-orange-300 p-2 text-white"
                : "hover:text-orange-400 transition-all";
            }}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              hideNav();
              scrollToTop();
            }}
            to="/services"
            className={({ isActive }) => {
              return isActive
                ? "bg-orange-300 p-2 text-white"
                : "hover:text-orange-400 transition-all";
            }}
          >
            Our Services
          </NavLink>
          <div className="relative">
            <div
              className={`${
                showcaseDropDown ? "top-[114px]" : "top-[41px]"
              } transition-all duration-200 absolute  w-full bg-white h-24`}
            >
              <NavLink
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                to={"/about"}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-orange-300 p-2 text-white"
                    : "hover:text-orange-400 transition-all";
                }}
              >
                About
              </NavLink>
              <NavLink
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                to={"/contact"}
                className={({ isActive }) => {
                  return isActive
                    ? "bg-orange-300 p-2 text-white"
                    : "hover:text-orange-400 transition-all";
                }}
              >
                Contact US
              </NavLink>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
