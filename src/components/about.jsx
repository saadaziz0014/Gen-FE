import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";
import { scrollToTop } from "../constants/scrollToTop";
import ReviewCard from "../components/reviewCard";
import Carousel from "../components/carousel";

import "./about.css";
import axios from "axios";
import { BE } from "../constants/constants";
import { Progress } from "@chakra-ui/react";

const AboutPage = () => {
  const [cities, setCities] = useState();
  const [userz, setUserz] = useState();
  const fetchCities = async () => {
    const resp = await axios.get(`${BE}users/city/loadCities`);
    setCities(resp.data.cities);
  };
  const users = async (location) => {
    console.log(location);
    const resp = await axios.get(`${BE}users/all/${location}`);
    setUserz(resp.data.data);
    console.log(resp);
  };
  useEffect(() => {
    fetchCities();
    users("a");
  }, []);
  return (
    <>
      <div className="bg-[url(/services-page-images/service-hero-bg.jpg)] bg-fixed bg-center bg-cover pt-44 pb-36 max-md:pt-36 max-md:pb-24 ">
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.zoomOut}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: 1200 }}
          className="flex gap-10 justify-between items-end max-md:items-center px-10 mx-auto max-md:px-5 max-md:flex-col"
        >
          <div className="text-white flex flex-col gap-8 max-md:items-center max-md:text-center">
            <h1 className="text-5xl font-bold">Our Mission</h1>
            <p className="text-xl max-w-md">
              At GEN Serve, our mission is to actively address and contribute to
              issues that matter most to beneficiaries. We are dedicated to
              creating a meaningful impact by connecting communities,
              volunteers, and organizations to provide essential aid and
              support.
            </p>
          </div>
        </motion.div>
      </div>
      <div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: 1200 }}
          className="mx-auto  p-10 py-28  max-sm:px-5 max-md:py-16 "
        >
          <div>
            <div className="flex justify-center">
              <select
                name="cities"
                id=""
                aria-placeholder="Select City"
                className="border-4 border-slate-400 p-3"
                onChange={(e) => users(e.target.value)}
              >
                <option value="">All</option>
                {cities &&
                  cities.map((city) => (
                    <option value={city.name} key={city._id}>
                      {city.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-5">
              {userz && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-bold">Volunteers</h1>
                    <Progress colorScheme="blue" value={userz.volunteers} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-bold">Organizations</h1>
                    <Progress colorScheme="red" value={userz.organizations} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-bold">Beneficiaries</h1>
                    <Progress colorScheme="green" value={userz.beneficiaries} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      {/* what we offer section start */}
      <div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: 1200 }}
          className="mx-auto  p-10 py-28  max-sm:px-5 max-md:py-16 "
        >
          <div className="flex w-full gap-10 max-md:flex-col max-md:justify-center max-md:items-center max-md:text-center">
            <div className="flex flex-col items-start justify-between max-md:items-center">
              <h1 className="text-5xl font-bold title-font w-max">
                What Drives Us
              </h1>
              <Link onClick={scrollToTop} to={"/services"}>
                <button className="text-xl px-5 py-2 mt-8 text-blue border-2 border-orange-400 text-blue-400 hover:text-white hover:bg-orange-400">
                  Services
                </button>
              </Link>
            </div>
            <div className="w-full">
              <img
                src="/about-page-images/whatdrivesus_3(1).jpg"
                className="w-full h-full"
                alt=""
              />
            </div>
          </div>
          <div className="what-we-do-cards mt-14 gap-8 max-md:grid-cols-1 max-md:grid-rows-3 grid grid-cols-3 grid-rows-1">
            <div>
              <h2 className="text-2xl text-orange-400 font-semibold">
                Community Well-being
              </h2>
              <p className="text-xl mt-2">
                We are fueled by a deep commitment to the well-being of
                communitites. Our platform serves as a hub for Beneficiaries,
                Volunteers eager to make a positive differnce and Organizations.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-orange-400 font-semibold">
                Empowering Volunteers
              </h2>
              <p className="text-xl mt-2">
                We beleive in the power of individuals coming together to create
                change. Our mission involves empowering volunteers with the
                resources and opportunities to lend a helping land.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-orange-400 font-semibold">
                Responsive Support
              </h2>
              <p className="text-xl mt-2">
                GEN Serve is designed to be responsive to the pressing issues
                faced by individuals.Through swift and effective support, we aim
                to address concerns and foster a sense of community.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="bg-blue">
        <div
          style={{ maxWidth: 1200 }}
          className="mx-auto flex max-md:flex-col justify-center items-center max-md:text-center gap-20 max-md:gap-12 p-10 py-28  max-sm:px-5 max-md:py-16  md:pb-36 "
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            className=" w-1/2 max-md:w-full flex flex-col text-white items-start justify-between max-md:items-center"
          >
            <h1 className="text-5xl font-bold title-font w-max">
              What we offer
            </h1>
            <p className="text-xl mt-5">
              GEN Serve is a community-driven initiative committed to making a
              positive impact. Established to serve beneficiaries, we take pride
              in our unique approach to fostering assistance and building
              connections within communities.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.zoomOut}
            viewport={{ once: true, amount: 0.2 }}
            className=" w-1/2 max-md:w-full text-white/50"
          >
            <h2 className="text-2xl">Rate</h2>
            <div className="relative w-fit max-md:mx-auto -mt-9 max-md:-mt-5">
              <h1 className="text-[150px] max-sm:text-[120px] font-semibold relative text-orange-400">
                99+
              </h1>
              **{" "}
              <div
                className="absolute z-50 top-0 right-0 left-0 bottom-0 bg-no-repeat "
                style={{
                  backgroundImage: "url(/99+.png)",
                  backgroundPosition: "40% 100%",
                  backgroundSize: "95%",
                }}
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* we focus section start */}
      <div>
        <div
          style={{ maxWidth: 1200 }}
          className="mx-auto  p-10 py-28  max-sm:px-5 max-md:py-16  "
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            className=" flex max-md:flex-wrap-reverse justify-center items-end max-md:text-center gap-10 max-md:gap-12  -mt-44 max-md:mt-0 "
          >
            <div className=" w-1/2 max-md:w-full flex flex-col text-white items-start justify-between max-md:items-center">
              <img src="/we-focus.jpg" alt="" />
            </div>

            <div className=" w-1/2 text-5xl max-lg:text-4xl max-md:w-full ">
              <h1 className="font-semibold ">We Connect with </h1>
              <h1 className="font-semibold  text-orange-400">
                Beneficiaries, Volunteers, and Organizations
              </h1>
            </div>
          </motion.div>
          <div className="we-focus-cards grid grid-cols-3 max-md:grid-cols-1 grid-rows-1 max-md:grid-rows-3 gap-6 mt-10">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animationVariants.zoomIn}
              viewport={{ once: true, amount: 0.2 }}
              className="border-t-2 text-xl border-blue/20 pt-4"
            >
              <h2 className="title-font font-semibold">-01</h2>
              <h2 className="title-font mt-7  font-medium text-orange-400">
                Beneficiaries
              </h2>
              <p className="mt-2">
                Beneficiaries are individuals seeking assisstance, connecting
                with volunteers, and expressing their needs for various forms of
                suuport, from essentials like food and shelter to job
                opportunities.
              </p>
            </motion.div>
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animationVariants.zoomIn}
              viewport={{ once: true, amount: 0.2 }}
              className="border-t-2 text-xl border-blue/20 pt-4"
            >
              <h2 className="title-font font-semibold">-02</h2>
              <h2 className="title-font mt-7  font-medium text-orange-400">
                Volunteers
              </h2>
              <p className="mt-2">
                Volunteers are individuals offering their time, skills and
                expertise to support Beneficiaries and Organizations,
                contributing to community well-being and fostering a sense of
                unity.
              </p>
            </motion.div>
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animationVariants.zoomIn}
              viewport={{ once: true, amount: 0.2 }}
              className="border-t-2 text-xl border-blue/20 pt-4"
            >
              <h2 className="title-font font-semibold">-03</h2>
              <h2 className="title-font mt-7  font-medium text-orange-400">
                Organizations
              </h2>
              <p className="mt-2">
                Organizations are entities dedicated to making a positive
                impact, collaborating with volunteers, and addressing the
                diverse needs of beneficiaries through various services and
                initiatives.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* we focus section start */}
      <div
        className="bg-[50%] max-lg:bg-[55%] max-md:bg-[90%] bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/faq-bannar.jpg')" }}
      >
        <div
          style={{ maxWidth: 1200 }}
          className="mx-auto  p-10 py-28  max-sm:px-5 max-md:py-16 flex justify-end  "
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            className="w-1/2 max-lg:w-2/3 max-md:w-full"
          >
            <h1 className="text-5xl ">
              We aim to create positive impacts for individuals and communities
              <span className="text-orange-400">
                {" "}
                through volunteerism and support.
              </span>
            </h1>
            <div className="flex flex-col gap-5 mt-7">
              <div className="flex justify-between items-center border-b-2 border-blue/30 pb-5 text-2xl">
                <h2>Beneficiaries Requests</h2>
                <Link
                  to={"/services"}
                  onClick={scrollToTop}
                  className="text-orange-400"
                >
                  <FaArrowRight className="rotate-45" />
                </Link>
              </div>
              <div className="flex justify-between items-center border-b-2 border-blue/30 pb-5 text-2xl">
                <h2>Volunteers Opportunities</h2>
                <Link
                  to={"/services"}
                  onClick={scrollToTop}
                  className="text-orange-400"
                >
                  <FaArrowRight className="rotate-45" />
                </Link>
              </div>
              <div className="flex justify-between items-center border-b-2 border-blue/30 pb-5 text-2xl">
                <h2>Oraganizations</h2>
                <Link
                  to={"/services"}
                  onClick={scrollToTop}
                  className="text-orange-400"
                >
                  <FaArrowRight className="rotate-45" />
                </Link>
              </div>
              <div className="flex justify-between items-center border-b-2 border-blue/30 pb-5 text-2xl">
                <h2>Community Forums</h2>
                <Link
                  to={"/services"}
                  onClick={scrollToTop}
                  className="text-orange-400"
                >
                  <FaArrowRight className="rotate-45" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* review section start */}
      <div className="bg-gray-100">
        <div
          style={{ maxWidth: 1200 }}
          className=" mx-auto flex max-md:flex-col justify-center items-center gap-16 p-10 max-md:px-5 py-28 "
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="w-2/4 max-md:w-full max-md:px-3 items-center flex flex-col gap-5"
          >
            <motion.div
              className="w-full ml-6"
              variants={animationVariants.zoomIn}
            >
              <ReviewCard
                imgSrc={"/reviews/Farheen.jpg"}
                title={"Farheen Ahmad"}
              />
            </motion.div>
            <motion.div
              className="w-full mr-6"
              variants={animationVariants.zoomIn}
            >
              <ReviewCard imgSrc={"/reviews/Zara.jpg"} title={"Zara Shakeel"} />
            </motion.div>
            <motion.div
              className="w-full ml-6"
              variants={animationVariants.zoomIn}
            >
              <ReviewCard
                imgSrc={"/reviews/Shaheer.jpg"}
                title={"Shaheer Ahmad"}
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.fadeRight}
            viewport={{ once: true, amount: 0.2 }}
            className="w-2/4 max-md:w-full max-md:text-center flex flex-col gap-8"
          >
            <h1 className="text-5xl max-md:text-4xl font-semibold">
              Why do people love GEN Serve
            </h1>
            <div>
              <Carousel />
            </div>
          </motion.div>
        </div>
      </div>
      {/* review section end */}
    </>
  );
};

export default AboutPage;
