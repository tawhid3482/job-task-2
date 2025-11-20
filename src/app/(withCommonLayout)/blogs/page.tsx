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
          "http://assistholdingsltd.com/images/1763634652229_types-of-construction-insurance-cover_va5mhk.webp"
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
