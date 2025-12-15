import GalleryPhoto from "@/components/shared/Gallery/GalleryPhoto";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "http://assistholdingsltd.com/images/1765780753698_gallery.png"
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
