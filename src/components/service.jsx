import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import "./service.css";
import {
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import FreeTrial from "./freeTrial";
import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";
import { scrollToTop } from "../constants/scrollToTop";
const ServicePage = ({ id, title, breif, descr, imageSrc }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
        className="relative bg-no-repeat bg-center bg-cover pt-44 pb-36 max-md:pt-36 max-md:pb-24 flex justify-center items-center text-white "
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-blue-400/50"></div>
        <motion.h1
          initial="initial"
          whileInView="animate"
          variants={animationVariants.zoomOut}
          viewport={{ once: true, amount: 0.2 }}
          className="text-6xl max-md:text-5xl max-sm:text-4xl font-semibold z-10"
        >
          {title}
        </motion.h1>
      </div>
      <div
        style={{ maxWidth: 1200 }}
        className=" mx-auto flex
         p-10 max-sm:px-5 relative items-start gap-16 max-lg:flex-col"
      >
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.fadeUp}
          viewport={{ once: true, amount: 0 }}
          className="w-2/3 max-lg:w-full flex flex-col gap-5"
        >
          <h1 className="text-3xl leading-none max-md:text-4xl font-semibold">
            Empowering communities through volunteerism
          </h1>
          <div className="text-lg flex flex-col gap-3 text-justify">
            <p>
              At GEN Serve, we are dedicated to harnessing the power of
              technology and human-centered design to create a positive impact
              on communities. Our mission is to facilitate meaningful
              connections, fostering a sense of unity and support among people.
            </p>
            <p>
              Explore innovative solutions with confidence. Whether you're a
              community member or an organization, our platform provides a space
              to test ideas and initiatives with the support of our dedicated
              team. We specialize in leveraging emerging technologies such as
              blockchain to bring your community projects to life.
            </p>
            <p>
              Empower your organization by assessing and optimizing your skills.
              We assist companies in choosing strategic directions that make the
              most of their team's talents and resources, ensuring maximum
              productivity and positive community outcomes.
            </p>
            <p>
              In a world of diverse choices, design plays a crucial role in
              creating clarity and relevance. Our design philosophy revolves
              around understanding the community's needs, studying experiences
              empathetically, and delivering creative responses that blend
              strategy with execution. We believe that beautiful, innovative,
              and differentiated design is key to the success of community
              projects.
            </p>
            <p>
              Our team of software experts is here to guide you through a
              comprehensive project evaluation. Together, we'll develop a
              roadmap for success that maximizes the efficiency and impact of
              your future community projects.
            </p>
            <p>
              Early involvement in technical innovation is vital. We collaborate
              with you from the initial stages, ensuring that human factors and
              production design issues are considered optimally. This proactive
              approach guarantees a seamless and impactful community aid and
              volunteer platform.
            </p>
          </div>
          <div className="mt-10">
            <Accordion
              className="text-xl flex flex-col gap-5 "
              allowToggle={true}
            >
              <AccordionItem className="border-none box-shadow p-6">
                <h2>
                  <AccordionButton
                    fontSize={"2xl"}
                    _hover={{ backgroundColor: "transparent" }}
                    _expanded={{ color: "#fb923c" }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      How can I volunteer in my community?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  There are various ways to volunteer, including joining local
                  community events, supporting local charities, or connecting
                  with volunteer organizations. You can make a difference!
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
                      How can I request community aid?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  If you need assistance, you can reach out to local community
                  aid organizations or use online platforms to connect with
                  volunteers. Your community is here to help!
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
                      How can individuals get involved in volunteering?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  We provide a user-friendly interface for individuals to
                  explore volunteering opportunities. Simply create an account,
                  browse through available projects, and apply to volunteer for
                  causes that resonate with you.
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
                      How can organizations collaborate on community projects?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Organizations can partner with us to post their community
                  projects, connect with volunteers, and access a pool of
                  skilled individuals. Our platform facilitates seamless
                  collaboration, ensuring that community initiatives are carried
                  out efficiently.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={animationVariants.zoomIn}
          viewport={{ once: true, amount: 0.2 }}
          className="w-1/3 max-lg:w-full sticky top-36 questions-card p-8 gap-5 flex flex-col"
        >
          <h1 className="text-center text-2xl font-semibold">
            Have Additional Questions?
          </h1>
          <div className="flex mt-2  gap-3 text-xl items-center">
            <div>
              <FaEnvelope className="text-orange-400" />
            </div>
            <p>FAST NUCES Chiniot-Faisalabad Campus, Pakistan</p>
          </div>
          <div className="flex  gap-3 text-xl items-center">
            <div>
              <FaPhone className="rotate-90 text-orange-400" />
            </div>
            <p>+92 300-9609342</p>
          </div>
          <div className="flex  gap-3 text-xl items-center">
            <div>
              <FaMapMarkerAlt className="text-orange-400" />
            </div>
            <p>information@cfd.nu.edu.pk</p>
          </div>
          <Link
            to="/contact"
            onClick={scrollToTop}
            className="text-orange-400 hover:text-blue-400 transition-all duration-300"
          >
            <div className="flex items-center gap-1">
              <p className="text-xl">Contact us</p>
              <FaArrowRight className="text-sm mt-[2px]" />
            </div>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default ServicePage;
