import ContactInfo from "@/components/shared/Contact/ContactInfo";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import Enquiry from "@/components/shared/Landowner/Enquiry";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Contact = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://jcxbd.com/wp-content/uploads/2024/04/Page-Banners-Contact.jpg"
        }
        title="contact"
        text="HAPPY TO HELP"
      ></LandownerBanner>
      <ContactInfo></ContactInfo>
      <Enquiry />
      <Testimonials />
      <OurAwardsandRecognition />
    </div>
  );
};

export default Contact;
