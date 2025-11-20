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
          "http://assistholdingsltd.com/images/1763635196097_contact_us_banner.jpg"
        }
        title="contact"
        text="Feel Free to Contact Us for Any Queries"
      ></LandownerBanner>
      <ContactInfo></ContactInfo>
      <Enquiry />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Contact;
