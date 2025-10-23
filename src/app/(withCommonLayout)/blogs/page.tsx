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
          "https://jcxbd.com/wp-content/uploads/2024/11/Page-Banners-News-v2.webp"
        }
        title="blogs"
        // text="find your nest"
      ></LandownerBanner>
      <BlogsCard></BlogsCard>
      <Testimonials />
      <OurAwardsandRecognition />
    </div>
  );
};

export default Blogs;
