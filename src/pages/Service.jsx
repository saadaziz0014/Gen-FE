import { useNavigate, useParams } from "react-router";
// import ServicePage from "../components/service";
import ServiceCard from "../components/serviceCard";
import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";
import { servicesData } from "../constants/servicesData";
import { useEffect } from "react";

const Service = () => {
  const navigate = useNavigate();
  const params = useParams();
  const serviceData = servicesData[0];

  useEffect(() => {
    // console.log(serviceData);
    if (serviceData === -1) {
      navigate("/*");
    }
  }, []);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${serviceData.image})`,
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
          Services
        </motion.h1>
      </div>
      <div
        style={{ maxWidth: 1200 }}
        className="mx-auto grid grid-cols-2 max-md:grid-rows-6 max-md:grid-cols-1 grid-rows-3 p-10 max-lg:px-5 gap-5 my-5"
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
