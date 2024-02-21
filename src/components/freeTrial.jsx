import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../constants/scrollToTop";

const FreeTrial = () => {
  return (
    <div
      className="py-28 max-sm:py-20 px-10 max-sm:px-5 flex flex-col justify-center items-center text-center gap-8 max-sm:gap-6 bg-orange-400 bg-no-repeat text-white bg-center bg-cover"
      style={{
        backgroundImage: `url("/trial-bg.png")`,
      }}
    >
      <h1 className=" text-5xl max-sm:text-4xl font-semibold">
        {" "}
        JOIN OUR COMMUNITY AND MAKE A DIFFERNCE
      </h1>
      <p className="text-xl max-sm:text-lg">
        Discover opportunities to contribute and enhance your impact.
      </p>
      <Link onClick={scrollToTop} to="/contact">
        <button className="text-2xl max-sm:text-xl px-6 py-2 border-2 border-white">
          Start Free Trial
        </button>
      </Link>
    </div>
  );
};

export default FreeTrial;
