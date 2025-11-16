import GalleryPhoto from "@/components/shared/Gallery/GalleryPhoto";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://static.vecteezy.com/system/resources/thumbnails/022/527/605/small/house-of-dream-idea-real-estate-illustration-ai-generative-free-photo.jpg"
        }
        title="Gallery
"
        text="REVISITING MEMORIES"
      ></LandownerBanner>
      <GalleryPhoto />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Gallery;
