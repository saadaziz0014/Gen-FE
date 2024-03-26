import { useNavigate, useParams } from "react-router";
// import ServicePage from "../components/service";
import ServiceCard from "../components/serviceCard";
import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";
import { servicesData } from "../constants/servicesData";
import { useEffect } from "react";
import NavBar from "../components/Navbar";

const Service = () => {
  const navigate = useNavigate();
  const params = useParams();
  const serviceData = servicesData[0];

  useEffect(() => {
    // console.log(serviceData);
    if (serviceData === -1) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <NavBar />
      <div
        style={{
          backgroundImage: `url(${serviceData.image})`,
        }}
        className="bg-no-repeat bg-center bg-cover pt-44 pb-36 max-md:pt-36 max-md:pb-24 flex justify-center items-center text-white "
      >
        <div className="bg-blue-400/50"></div>
        <motion.h1
          initial="initial"
          whileInView="animate"
          variants={animationVariants.zoomOut}
          viewport={{ once: true, amount: 0.2 }}
          className="text-6xl max-md:text-5xl max-sm:text-4xl font-semibold z-10"
        >
          Services
        </motion.h1>
      </div>
      <div
        style={{ maxWidth: 1200 }}
        className="sm:grid sm:grid-cols-2 sm:ml-8 sm:my-4 sm:gap-2"
      >
        {servicesData.map((e, i) => {
          return (
            <ServiceCard
              key={i}
              title={e.title}
              brief={e.shortDescription}
              imgSrc={e.image}
              id={e.id}
              iconSrc={e.icon}
            />
          );
        })}
      </div>
    </>
  );
};

export default Service;
