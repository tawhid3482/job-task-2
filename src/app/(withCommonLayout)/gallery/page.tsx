import GalleryPhoto from "@/components/shared/Gallery/GalleryPhoto";
import GalleryVedio from "@/components/shared/Gallery/GalleryVedio";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://jcxbd.com/wp-content/uploads/2024/11/Page-Banners-Gallery.webp"
        }
        title="Gallery
"
        text="REVISITING MEMORIES"
      ></LandownerBanner>
      <GalleryPhoto />
      <GalleryVedio />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Gallery;
