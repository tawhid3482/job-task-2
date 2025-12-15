import BlogsCard from "@/components/shared/Blogs/BlogsCard";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Blogs = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "http://assistholdingsltd.com/images/1765780999299_civil.png"
        }
        title="blogs"
        // text="find your nest"
      ></LandownerBanner>
      <BlogsCard></BlogsCard>
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Blogs;
