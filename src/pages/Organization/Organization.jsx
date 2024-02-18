import WhatWeDoCard from "../../components/whatwedocard";

import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationVariants";

import "./Organization.css";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

const Organization = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const errorToast = (res, status) => {
    toast({
      title: res,
      status: status,
      duration: 2000,
      isClosable: true,
      position: "top",
      containerStyle: {
        zIndex: 9999,
      },
    });
  };

  return (
    <div className=" w-full overflow-hidden">
      <div className="  flex bg-[url('/hero-bg-image.jpg')] pt-36 pb-20 bg-top bg-no-repeat bg-cover  ">
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
            How We Can Collaborate
          </motion.h1>
          <motion.p
            variants={animationVariants.fadeLeft}
            className="text-xl max-lg:mx-auto max-w-md  "
          >
            Partner with our dynamic community of organizations that are
            committed to creating a positive impact. We are here to collaborate
            with you and address the needs of your organization. Whether you are
            looking for specific services, resources, or meaningful
            partnerships, our diverse network of organizations is dedicated to
            working together to make a significant difference. Your mission and
            goals are at the core of our collaborative efforts, and we're
            committed to fostering positive change through effective
            partnerships.
          </motion.p>
        </motion.div>
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
              How You Can Collaborate With Us
            </h2>
            <p className="text-xl">
              Partner with our dynamic community of organizations that are
              committed to creating a positive impact. We are here to
              collaborate with you and address the needs of your organization.
              Whether you are looking for specific services, resources, or
              meaningful partnerships, our diverse network of organizations is
              dedicated to working together to make a significant difference.
              Your mission and goals are at the core of our collaborative
              efforts, and we're committed to fostering positive change through
              effective partnerships.
            </p>
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
                iconAlt={"reliability"}
                title={"Empowerment Programs"}
                desc={
                  "Encourages organizations to participate in programs for skill and knowledge development."
                }
              />
              <WhatWeDoCard
                iconSrc={"/icons/communication.png"}
                iconAlt={"communication"}
                title={"Tailored Support"}
                desc={
                  "Organizations receive dedicated support, tailored to their unique needs."
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
                iconAlt={"quality-first"}
                title={"Community Inclusion"}
                desc={"Organizations become an integral part of the community."}
              />
              <div
                style={{ height: 130 }}
                className="max-md:hidden rounded-lg w-80 h-36 bg-gradient-to-b from-white to-transparent"
              ></div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* what we do section end */}
    </div>
  );
};

export default Organization;
