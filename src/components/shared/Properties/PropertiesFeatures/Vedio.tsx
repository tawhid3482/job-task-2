"use client";
import React from "react";
import VideoModalTrigger from "./PropertiesVedio";

interface VideoProps {
  url: string;
}

const Video: React.FC<VideoProps> = ({ url }) => {

  const ROOFTOP_IMAGE =
    "https://www.videoconverterfactory.com/tips/imgs-sns/send-a-video-by-email.png";

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
