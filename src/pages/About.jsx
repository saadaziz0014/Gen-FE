import { useEffect } from "react";
import AboutPage from "../components/about";

const About = () => {
  useEffect(() => {
    document.title = "About Us - GEN Serve";
  }, []);
  return (
    <div className="overflow-hidden">
      <AboutPage />
    </div>
  );
};

export default About;
