"use client";
import React from "react";
import VideoModalTrigger from "./PropertiesVedio";

interface VideoProps {
  url: string;
}

const Video: React.FC<VideoProps> = ({ url }) => {
  console.log(url);

  const ROOFTOP_IMAGE =
    "https://jcxbd.com/wp-content/uploads/2025/03/Scene-81-scaled.jpg";

  return (
    <div className="bg-gray-100 py-16">
      <div className="w-full mx-auto">
        <VideoModalTrigger
          thumbnailUrl={ROOFTOP_IMAGE}
          videoEmbedUrl={url}
        />
      </div>
    </div>
  );
};

export default Video;
