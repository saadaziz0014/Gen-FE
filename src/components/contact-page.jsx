import React, { useState } from "react";
import {
  FaCoins,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaPhone,
} from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";
import WhatWeDoCard from "../components/whatwedocard";
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { scrollToTop } from "../constants/scrollToTop";

const ContactPage = () => {
  const toast = useToast();
  const [btnLoader, setBtnLoader] = useState(false);

  const showToast = () => {
    toast({
      title: "Message Sent",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
      containerStyle: {
        zIndex: 9999,
      },
    });
  };
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const errors = validateForm(formData);

    if (errors === false) {
      setBtnLoader(true);
      axios
        .post("http://localhost:3001/contact", formData)
        .then((response) => {
          showToast();
          setFormData({
            firstName: "",
            lastName: "",
            phoneNo: "",
            email: "",
            message: "",
          });
          setBtnLoader(false);
        })
        .catch((error) => {
          setBtnLoader(false);
          errorToast(error.message, "error");
          console.error("Error submitting form:", error);
        });
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateForm = (data) => {
    let _error;
    if (
      data.firstName &&
      data.firstName.trim() &&
      data.lastName &&
      data.lastName.trim() &&
      data.email &&
      data.email.trim() &&
      isValidEmail(data.email.trim()) &&
      data.phoneNo &&
      data.phoneNo.trim() &&
      data.message &&
      data.message.trim()
    ) {
      _error = false;
    } else {
      if (
        !data.firstName &&
        !data.firstName.trim() &&
        !data.lastName &&
        !data.lastName.trim() &&
        !data.email &&
        !data.email.trim() &&
        !isValidEmail(data.email.trim()) &&
        !data.phoneNo &&
        !data.phoneNo.trim() &&
        !data.message &&
        !data.message.trim()
      ) {
        errorToast("Fill the fields first!", "error");
      } else if (!data.firstName || !data.firstName.trim()) {
        errorToast("Enter the firstName!", "error");
      } else if (!data.lastName || !data.lastName.trim()) {
        errorToast("Enter the lastName!", "error");
      } else if (!data.email || !data.email.trim()) {
        errorToast("Enter the email!", "error");
      } else if (!isValidEmail(data.email.trim())) {
        errorToast("Enter the valid  email!", "error");
      } else if (!data.phoneNo || !data.phoneNo.trim()) {
        errorToast("Enter the phone no!", "error");
      } else if (!data.message || !data.message.trim()) {
        errorToast("Enter the message!", "error");
      }
    }
    return _error;
  };

  return (
    <div className=" w-full overflow-hidden">
      <div className="  flex bg-[url('/hero-bg-image.jpg')] pt-44 max-sm:pt-40 pb-32 bg-top bg-no-repeat bg-cover  ">
        <div
          style={{ maxWidth: 1200 }}
          className="mx-auto w-full text-white px-10 max-sm:px-5 flex flex-col max-lg:items-center max-lg:text-center gap-16"
        >
          <motion.h1
            initial="initial"
            whileInView="animate"
            variants={animationVariants.zoomOut}
            viewport={{ once: true, amount: 0.2 }}
            className="text-6xl max-lg:mx-auto font-semibold max-sm:text-5xl max-w-lg "
          >
            Contact Us
          </motion.h1>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
            className="grid gap-4 w-full text-start grid-cols-3 grid-rows-1 max-md:grid-cols-1 max-md:grid-rows-3"
          >
            <motion.div
              variants={animationVariants.fadeUp}
              className="card bg-white text-blue-400 rounded-md gap-5  p-6 pb-10 max-lg:p-5 max-lg:pb-8 max-md:p-6 max-md:py-7 max-md:pb-10 flex flex-col gap text-xl "
            >
              <div className="card-header text-2xl flex items-center gap-4">
                <div className="bg-orange-400 w-[60px] h-[58px] rounded-md text-xl flex gap-4 justify-center items-center">
                  <FaEnvelope className="text-white" />
                </div>
                <h2 className="title-font font-semibold ">
                  Community Assisstance
                </h2>
              </div>
              <p>Provide assisstance to the beneficiaries.</p>
            </motion.div>
            <motion.div
              variants={animationVariants.fadeUp}
              className="card bg-white text-blue-400 rounded-md gap-5  p-6 pb-10 max-lg:p-5 max-lg:pb-8 max-md:p-6 max-md:py-7 max-md:pb-10 flex flex-col gap text-xl "
            >
              <div className="card-header text-2xl flex items-center gap-4">
                <div className="bg-orange-400 w-[60px] h-[58px] rounded-md text-xl flex gap-4 justify-center items-center">
                  <FaCoins className="text-white" />
                </div>
                <h2 className="title-font font-semibold ">
                  Volunteer Opportunities
                </h2>
              </div>
              <p>
                Explore and contribute to various volunteer opportunities
                available.
              </p>
            </motion.div>
            <motion.div
              variants={animationVariants.fadeUp}
              className="card bg-white text-blue-400 rounded-md gap-5  p-6 pb-10 max-lg:p-5 max-lg:pb-8 max-md:p-6 max-md:py-7 max-md:pb-10 flex flex-col gap text-xl "
            >
              <div className="card-header text-2xl flex items-center gap-4">
                <div className="bg-orange-400 w-[60px] h-[58px] rounded-md text-xl flex gap-4 justify-center items-center">
                  <FaMobileAlt className="text-white" />
                </div>
                <h2 className="title-font font-semibold ">
                  Collaborate with Organizations
                </h2>
              </div>
              <p>
                Connect and collaborate with organizations for imapactful
                projects.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* </Reveal> */}
      </div>

      {/* contact form section start */}
      <div
        style={{ maxWidth: 1200 }}
        className="mx-auto w-full p-10 py-28 max-sm:px-5 flex max-lg:flex-wrap-reverse  gap-12"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.zoomOut}
          viewport={{ once: true, amount: 0.2 }}
          id="contact"
          style={{ boxShadow: "0 20px 50px rgba(0, 43, 86, .1)" }}
          className="w-1/2 max-lg:w-full p-6 py-7 rounded-md flex flex-col h-auto justify-between items-start gap-5"
        >
          <div className="name w-full gap-5 text-white max-sm:flex-col flex">
            <Input
              pl={3}
              fontSize={19}
              variant={"outline"}
              borderColor={"#002b561a"}
              focusBorderColor="#001d3b4d"
              maxLength={20}
              autoComplete="off"
              _focus={{ borderWidth: 0.1 }}
              color="black"
              _placeholder={{ color: "#696969" }}
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              pl={3}
              fontSize={19}
              variant={"outline"}
              borderColor={"#002b561a"}
              focusBorderColor="#001d3b4d"
              maxLength={20}
              autoComplete="off"
              color="black"
              _placeholder={{ color: "#696969" }}
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <Input
            pl={3}
            fontSize={19}
            variant={"outline"}
            borderColor={"#002b561a"}
            focusBorderColor="#001d3b4d"
            autoComplete="off"
            maxLength={40}
            color="black"
            _placeholder={{ color: "#696969" }}
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            pl={3}
            fontSize={19}
            variant={"outline"}
            borderColor={"#002b561a"}
            focusBorderColor="#001d3b4d"
            max={15}
            maxLength={15}
            autoComplete="off"
            color="black"
            _placeholder={{ color: "#696969" }}
            type="number"
            placeholder="Phone No"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <Textarea
            pl={3}
            fontSize={19}
            variant={"outline"}
            borderColor={"#002b561a"}
            focusBorderColor="#001d3b4d"
            autoComplete="off"
            maxLength={200}
            color="black"
            _placeholder={{ color: "#696969" }}
            placeholder="Message"
            minHeight={"180px"}
            className="w-ful text-white"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <Button
            _hover={{ backgroundColor: "white", color: "#fb923c" }}
            backgroundColor={"#fb923c"}
            color={"white"}
            borderColor={"#fb923c"}
            variant={"outline"}
            size={"lg"}
            isLoading={btnLoader}
            loadingText={"Sending.."}
            onClick={handleSubmit}
            className="w-full"
            transitionDuration={"300ms"}
            fontWeight={"normal"}
            fontSize={"20px"}
            borderRadius={"4px"}
          >
            Submit
          </Button>
        </motion.div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.fadeRight}
          viewport={{ once: true, amount: 0.2 }}
          className="w-1/2 flex flex-col gap-5 max-lg:w-full"
        >
          <div className="text-5xl max-md:text-4xl max-md:text-center">
            <h1 className="font-semibold ">
              Contact our support{" "}
              <span className="font-semibold title-font  text-orange-400">
                team to grow your business
              </span>
            </h1>
          </div>
          <p className="text-xl">
            Welcome to our Community Aid and Volunteer Platform! We are
            dedicated to making a positive impact by connecting volunteers,
            beneficiaries, organizations, and communities. Join us in creating a
            better world together.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex  gap-3 text-xl items-center">
              <div>
                <FaEnvelope className="text-orange-400" />
              </div>
              <p>FAST NUCES Chiniot-Faisalabad Campus, Pakistan</p>
            </div>
            <div className="flex  gap-3 text-xl items-center">
              <div>
                <FaPhone className="rotate-90 text-orange-400" />
              </div>
              <p>+92 3009609342</p>
            </div>
            <div className="flex  gap-3 text-xl items-center">
              <div>
                <FaMapMarkerAlt className="text-orange-400" />
              </div>
              <p>information@cfd.nu.edu.pk</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* map section start */}
      <div
        style={{ maxWidth: 1200 }}
        className="mx-auto w-full p-10 py-28 pt-10 max-sm:py-16 max-sm:pt-5 max-sm:px-5 "
      >
        <div className="bg-center bg-no-repeat bg-cover">
          <div className="relative">
            <img
              src="/contact-page-images/map.png"
              className="h-[379px] max-md:h-[440px] max-sm:h-[500px] max-md:object-cover max-md:object-[70%] max-sm:object-[60%]  "
              alt=""
            />
            <div className="absolute flex justify-center items-center  bg-white/90  top-0 left-0 right-0 bottom-0">
              <motion.div
                initial="initial"
                whileInView="animate"
                variants={animationVariants.zoomOut}
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-xl max-lg:max-w-lg max-sm:w-full text-center"
              >
                <h1 className="text-[46px] max-lg:text-4xl max-sm:text-[34px] max-[500px]:text-3xl leading-tight font-semibold">
                  Whatever you are, you
                  <br /> will definitely get a place
                </h1>
                <p className="text-xl mt-3">
                  Explore opportunities and initiatives to make a positive
                  impact on society.
                </p>
              </motion.div>
            </div>

            {/* map human images start */}
            <div className="absolute top-24 max-md:top-6 left-16 max-lg:left-10  max-md:left-16 w-12 h-12 rounded-full overflow-hidden">
              <img
                src="/contact-page-images/1.jpg"
                className="w-full h-full object-cover object-center"
                alt="1"
              />
            </div>
            <div className="absolute bottom-20 max-lg:bottom-12 left-36 max-lg:left-20 max-sm:left-10 w-12 h-12 rounded-full overflow-hidden">
              <img
                src="/contact-page-images/2.jpg"
                className="w-full h-full object-cover object-center"
                alt="2"
              />
            </div>
            <div className="absolute top-12 right-36 max-lg:right-24 max-sm:right-12 w-12 h-12 rounded-full overflow-hidden">
              <img
                src="/contact-page-images/3.jpg"
                className="w-full h-full object-cover object-center"
                alt="3"
              />
            </div>
            {/* map human images end */}

            {/* map points start */}
            <div className="w-7 h-7 bg-[#d5515e66] flex justify-center items-center rounded-full absolute top-5 left-32 max-sm:left-5 max-sm:top-24">
              <div className="w-[18px] h-[18px] bg-orange-400 rounded-full"></div>
            </div>
            <div className="w-7 h-7 bg-[#d5515e66] flex justify-center items-center rounded-full absolute top-10 max-md:top-16 max-md:right-44 max-sm:right-32 right-64">
              <div className="w-[18px] h-[18px] bg-orange-400 rounded-full"></div>
            </div>
            <div className="w-7 h-7 bg-[#d5515e66] flex justify-center items-center rounded-full absolute bottom-16 right-28 max-md:right-0 max-md:bottom-20 max-md:left-44 max-sm:bottom-24 max-sm:left-32">
              <div className="w-[18px] h-[18px] bg-orange-400 rounded-full"></div>
            </div>
            {/* map points end */}
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
              Our Mission
            </h2>
            <p className="text-xl">
              We are dedicated to facilitating community aid and volunteer
              efforts. Our platform connects Beneficiaries, Volunteers and
              Organizations to foster a collaborative environmnet for positive
              social impact.
            </p>
            <Link to="/about" onClick={scrollToTop}>
              <button
                style={{ borderWidth: 1.5, borderRadius: 4 }}
                className="bg-transparent  text-blue-400 border-orange-400 text-xl px-5 py-2 duration-300 hover:bg-red-500 hover:text-white transition-all mt-5 max-md:mt-3"
              >
                About Us
              </button>
            </Link>
          </motion.div>

          {/* <div className="cards w-2/3 max-lg:w-full flex justify-center max-md:flex-col max-md:items-center gap-7"> */}

          <motion.div
            initial="initial"
            whileInView="animate"
            variants={animationVariants.fadeUp}
            viewport={{ once: true, amount: 0.2 }}
            className="cards w-2/3 max-lg:w-full flex justify-center max-md:flex-col max-md:items-center gap-7"
          >
            {/* <Reveal
              triggerOnce={true}
              className="flex flex-col gap-7 "
              keyframes={fadeUp}
            > */}

            {/* <div className="flex flex-col gap-7 "> */}
            <div className="flex flex-col gap-7 ">
              <WhatWeDoCard
                iconSrc={"/icons/reliability.png"}
                iconAlt={"Community Support"}
                title={"Community Support"}
                desc={
                  "We foster a sense of community by providing support to Beneficiaries. "
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
          {/* </Reveal> */}
        </div>
      </div>
      <div
        style={{ maxWidth: 1200 }}
        className=" mx-auto  p-10 py-28 max-md:py-14 max-md:px-5 "
      >
        <motion.h1
          initial="initial"
          whileInView="animate"
          variants={animationVariants.fadeUp}
          viewport={{ once: true, amount: 0.2 }}
          className="text-5xl max-md:text-4xl font-semibold text-center  mb-16 max-md:mb-12"
        >
          Users Frequently Ask
        </motion.h1>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.fadeUp}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Accordion className="flex max-md:flex-col gap-5 " allowToggle={true}>
            <div className=" w-1/2 max-md:w-full text-xl flex flex-col gap-5 ">
              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#ef4444" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      How can I find nearby assisstance or volunteer
                      opportunities?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Users can use the geolocation feature to find neaarby
                  assisstance or volunteer opportunities.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      What happen if I decline to grant location access?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  If users decline to grant location access, they may need to
                  manually enter their location or use a different search
                  method.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "##fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      How can I create a volunteer profile?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  To create a volunteer profile, click on the "Sign-Up" button
                  and follow the steps to provide your details and interests.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      Can I volunteer for multiple causes?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Yes, volunteers can choose to participate in multiple causes.
                  When browsing opportunities, selest those that align with your
                  intersts and availability.
                </AccordionPanel>
              </AccordionItem>
            </div>
            <div className=" w-1/2 max-md:w-full text-xl flex flex-col gap-5 ">
              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      How can my organization post volunteer opportunities?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Organizations can register and log in to their accounts, then
                  use the "Post Opportunity" feature to share details about
                  volunteer positions.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      How can I request assisstance as a Beneficiary?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Beneficiaries can request assisstance by creating an account,
                  logging in, and filling out the assisstance request form.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      What types of volunteer opportunities can organizations
                      post?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Organizations can post a wide range of volunteer
                  opportunities, including one-time events, ongoing projects and
                  specific skill-based.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      Can Organizations collaborate on project?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Yes, organizations can collaborate on project by creating
                  joint opportuinities. The platform facilitates communication
                  between collaborating organizations to ensure smooth and
                  continuous coordination.
                </AccordionPanel>
              </AccordionItem>
            </div>
          </Accordion>
        </motion.div>
      </div>
      {/* what we do section end */}
    </div>
  );
};

export default ContactPage;
