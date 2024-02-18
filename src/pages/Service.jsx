import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ServicePage from "../components/service";
import { servicesData } from "../constants/servicesData";

const Service = () => {
  const navigate = useNavigate();
  const params = useParams();
  const serviceData = servicesData[0];

  useEffect(() => {
    console.log(serviceData);
    if (serviceData === -1) {
      navigate("/*");
    }
  }, []);
  useEffect(() => {
    document.title = `Services - ${serviceData.title} `;
  }, []);
  return (
    <ServicePage
      id={serviceData.id}
      title={serviceData.title}
      breif={serviceData.shortDescription}
      descr={serviceData.mainDescription}
      imageSrc={serviceData.image}
    />
  );
};

export default Service;
