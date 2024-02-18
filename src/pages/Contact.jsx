import { useEffect } from "react";
import ContactPage from "../components/contact-page";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us - GEN Serve";
  }, []);
  return (
    <div className="overflow-hidden">
      <ContactPage />
    </div>
  );
};

export default Contact;
