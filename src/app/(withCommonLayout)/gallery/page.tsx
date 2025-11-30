import GalleryPhoto from "@/components/shared/Gallery/GalleryPhoto";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://assistholdingsltd.com/images/1764481614054_civil-engineering.jpg"
        }
        title="Gallery
"
        text="Going Back To The Memories"
      ></LandownerBanner>
      <GalleryPhoto />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Gallery;
