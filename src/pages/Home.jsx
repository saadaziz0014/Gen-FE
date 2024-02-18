import "./homePage.css";
import WhatWeDoCard from "../components/whatwedocard";
import Carousel from "../components/carousel";
import ReviewCard from "../components/reviewCard";

import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";

import { Link, useNavigate } from "react-router-dom";
import { scrollToTop } from "../constants/scrollToTop";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className=" w-full overflow-hidden">
      <div className="  flex bg-[url('/front-cover.jpg')] pt-36 pb-20 bg-top bg-no-repeat bg-cover  ">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          style={{ maxWidth: 1200 }}
          className="mx-auto w-full text-white px-10 max-sm:px-5 flex flex-col max-lg:items-center max-lg:text-center gap-12"
        >
          <motion.h1
            variants={animationVariants.fadeLeft}
            className="text-6xl max-lg:mx-auto font-semibold max-sm:text-4xl max-w-lg "
          >
            Explore the Perfect Community Space
          </motion.h1>
          <motion.p
            variants={animationVariants.fadeLeft}
            className="text-xl max-lg:mx-auto max-w-md  "
          >
            Empowering communities through spaces that foster collaboration and
            growth.
          </motion.p>

          <motion.div
            variants={animationVariants.fadeLeft}
            className="flex max-lg:flex-col max-lg:items-center gap-10 w-full justify-between items-end mt-4"
          >
            <div className="flex gap-12">
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl title-font font-bold">++</h2>
                <p className="text-lg">Communities</p>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-4xl title-font font-bold">++</h2>
                <p className="text-lg">Organizations</p>
              </div>
            </div>
            <div className="flex gap-12 max-sm:flex-wrap  justify-center">
              <div className="flex justify-start items-center gap-2">
                <img className="w-9" src="/grafton.png" alt="img" />
                <h2 className="text-2xl">Beneficiaries</h2>
              </div>
              <div className="flex justify-start items-center gap-2">
                <img className="w-9" src="/lighthouse.png" alt="img" />
                <h2 className="text-2xl">Volunteers</h2>
              </div>
              <div className="flex justify-start items-center gap-2">
                <img className="w-9" src="/menu.png" alt="img" />
                <h2 className="text-2xl">Organizations</h2>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* </Reveal> */}
      </div>
      {/* about section */}
      <div>
        <div
          style={{ maxWidth: 1200 }}
          className="mx-auto flex justify-between items-start p-10 py-28 max-md:py-16 gap-5 max-md:px-5 max-md:flex-col max-md:items-center max-md:text-center"
        >
          <div className="w-2/4 max-md:w-full ">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animationVariants.zoomOut}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-5xl max-md:text-4xl font-bold title-font">
                Empowering Communities
                <span className=" text-orange-400 title-font "> </span>
              </h2>
            </motion.div>
          </div>
          <div className="w-2/4 max-md:w-full">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animationVariants.fadeRight}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-xl">
                Welcome to our community! We believe in creating a positive
                impact by fostering connections and empowering individuals. Our
                mission is to provide a supportive environment where people can
                thrive together.
              </p>
              <Link onClick={scrollToTop} to={"/about"}>
                <button className="text-xl mt-8 text-blue-400 border-2 border-orange-400 p-2 hover:text-white hover:bg-orange-400">About US</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      {/* what we do section start */}
      <div className="bg-gray-100">
        <div
          style={{ maxWidth: 1200 }}
          className=" mx-auto flex gap-5 justify-between items-start p-10 py-28 max-md:py-16 max-md:px-5 max-lg:flex-col max-lg:items-center  max-lg:gap-12"
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.zoomOut}
            viewport={{ once: true, amount: 0.2 }}
            className="w-1/3 max-lg:w-full max-lg:text-center flex flex-col gap-2 items-start max-lg:items-center"
          >
            <h2 className="text-5xl max-md:text-4xl font-bold title-font">
              Our community Initiatives
            </h2>
            <p className="text-xl">
              Welcome to our Community aid and Volunteer Platform! We are
              dedicated to making a positive impact by providing support and
              assisstance to Beneficiaries.
            </p>
            <Link onClick={scrollToTop} to={"/about"}>
              <button
                style={{ borderWidth: 1.5, borderRadius: 4 }}
                className="bg-transparent  text-blue-400 border-orange-400 text-xl px-5 py-2 duration-300 hover:bg-orange-400 hover:text-white transition-all mt-5 max-md:mt-3"
              >
                About Us
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            className="cards w-2/3 max-lg:w-full flex justify-center max-md:flex-col max-md:items-center gap-7"
          >
            <div className="flex flex-col gap-7 ">
              <WhatWeDoCard
                iconSrc={"/icons/reliability.png"}
                iconAlt={"Community Support"}
                title={"Community Support"}
                desc={
                  "We foster a sense of community by providing support to Beneficiaries."
                }
              />
              <WhatWeDoCard
                iconSrc={"/icons/communication.png"}
                iconAlt={"Volunteer-engagement"}
                title={"Volunteer Engagement"}
                desc={
                  "Engage with our dedicated volunteers who contribute their skills and time!"
                }
              />
            </div>
            <div className="flex flex-col gap-7">
              <div
                style={{ height: 130 }}
                className="max-md:hidden rounded-lg w-80 bg-gradient-to-t from-white to-transparent"
              ></div>
              <WhatWeDoCard
                iconSrc={"/icons/quality-first.png"}
                iconAlt={"Impactful-projects"}
                title={"Impactful Projects"}
                desc={
                  "We focus on impactful projects that make a positive difference."
                }
              />
              <div
                style={{ height: 130 }}
                className="max-md:hidden rounded-lg w-80 h-36 bg-gradient-to-b from-white to-transparent"
              ></div>
            </div>
          </motion.div>
        </div>
        <div
          style={{ maxWidth: 1200 }}
          className="p-10 max-md:px-5 mx-auto"
        ></div>
      </div>
      {/* what we do section end */}

      {/* appreciation section start */}
      <div className="bg-white">
        <div
          style={{ maxWidth: 1200 }}
          className="p-10 max-md:px-5 py-28 mx-auto grid grid-cols-2 grid-rows-1 gap-20 max-lg:grid-cols-1 max-lg:grid-rows-2 "
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="w-full max-lg:w-full flex flex-col  items-start max-lg:items-center max-lg:text-center gap-7"
          >
            <motion.h1
              variants={animationVariants.fadeLeft}
              className="text-5xl max-md:text-4xl font-semibold"
            >
              Empower your community through Volunteering
            </motion.h1>
            <motion.p
              variants={animationVariants.fadeLeft}
              className="text-2xl"
            >
              Join hands with volunteers and make a positive impact in your
              community. Together, we create a better tomorrow.
            </motion.p>
            <motion.div
              variants={animationVariants.fadeLeft}
              className="grid grid-cols-2 grid-rows-2 gap-10"
            >
              <div className="flex flex-col max-lg:justify-center max-lg:items-center">
                <h2 className="title-font text-orange-400 text-5xl max-md:text-4xl font-semibold">
                  +
                </h2>
                <p className="text-xl">Volunteers Connected</p>
              </div>
              <div className="flex flex-col max-lg:justify-center max-lg:items-center">
                <h2 className="title-font text-orange-400 text-5xl max-md:text-4xl font-semibold">
                  +
                </h2>
                <p className="text-xl">Community Projects</p>
              </div>
              <div className="flex flex-col max-lg:justify-center max-lg:items-center">
                <h2 className="title-font text-orange-400 text-5xl max-md:text-4xl font-semibold">
                  +
                </h2>
                <p className="text-xl">Beneficiaries Assistance</p>
              </div>
              <div className="flex flex-col max-lg:justify-center max-lg:items-center">
                <h2 className="title-font text-orange-400 text-5xl max-md:text-4xl font-semibold">
                  +
                </h2>
                <p className="text-xl">Organizations Works</p>
              </div>
            </motion.div>
            <motion.div variants={animationVariants.fadeLeft}>
              <Link onClick={scrollToTop} to={"/contact"}>
                <button className="px-6 py-3 text-xl text-blue-400 border-2 border-orange-400 hover:text-white hover:bg-orange-400">Get in Touch</button>
              </Link>
            </motion.div>
          </motion.div>
          <div className="w-full max-lg:w-full h-full max-sm:max-h-[500px] ">
            <div className=" h-full w-full relative overflow-hidden rounded-lg">
              <img
                src="/appreciation-section-image.jpg"
                className="absolute w-full h-full object-cover object-center "
                alt=""
              />
              <div className="absolute w-full h-full bg-blue-400/50 "></div>

              <motion.div
                initial="initial"
                whileInView="animate"
                variants={animationVariants.toLeft}
                viewport={{ once: true, amount: 0.2 }}
                className="absolute w-full h-full bg-white origin-left z-20 "
              >
                <div className=""></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* appreciation section end */}
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
                title={"Shaheer Ahmed"}
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
    </div>
  );
};

export default HomePage;
