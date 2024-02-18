import WhatWeDoCard from "../../components/whatwedocard";

import { motion } from "framer-motion";
import { animationVariants } from "../../constants/animationVariants";

import "./Beneficiaries.css";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

const Beneficiaries = () => {
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
            How We Can Support You
          </motion.h1>
          <motion.p
            variants={animationVariants.fadeLeft}
            className="text-xl max-lg:mx-auto max-w-md  "
          >
            Connect with our caring community of volunteers who are ready to
            make a positive impact in your life. We're here to address your
            needs and create positive change. Whether you require specific
            services or simply seek companionship, our diverse network of
            volunteers is dedicated to supporting you. Your well-being is at the
            heart of our mission, and we're committed to making a meaningful
            difference in your life.
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
              How We Can Support You
            </h2>
            <p className="text-xl">
              Connect with our caring community of volunteers who are ready to
              make a positive impact in your life. We're here to address your
              needs and create positive change. Whether you require specific
              services or simply seek companionship, our diverse network of
              volunteers is dedicated to supporting you. Your well-being is at
              the heart of our mission, and we're committed to making a
              meaningful difference in your life.
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
                  "Participate in empowerment programs designed to help you gain valuable skills and knowledge. We offer resources and guidance to support your personal and professional development."
                }
              />
              <WhatWeDoCard
                iconSrc={"/icons/communication.png"}
                iconAlt={"communication"}
                title={"Tailored Support"}
                desc={
                  "Receive dedicated support from our team. We tailor our assistance to your unique needs, ensuring you have the tools and encouragement to overcome challenges and thrive."
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
                desc={
                  "Become an integral part of our community. Engage with fellow beneficiaries, build connections, and foster a sense of belonging in an inclusive and supportive environment."
                }
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

export default Beneficiaries;
