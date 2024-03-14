import { useParams } from "react-router-dom";
import ServicePage from "../components/service";
import { servicesData } from "../constants/servicesData";
export default function ServiceDetails() {
  const params = useParams();
  return (
    <>
      <ServicePage
        id={servicesData[params.id - 1].id}
        title={servicesData[params.id - 1].title}
        breif={servicesData[params.id - 1].shortDescription}
        descr={servicesData[params.id - 1].mainDescription}
        imageSrc={servicesData[params.id - 1].image}
      />
    </>
  );
}
