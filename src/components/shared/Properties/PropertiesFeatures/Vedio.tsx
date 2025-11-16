"use client";
import React from "react";
import VideoModalTrigger from "./PropertiesVedio";

interface VideoProps {
  url: string; // YouTube watch URL
}

const Video: React.FC<VideoProps> = ({ url }) => {
  const ROOFTOP_IMAGE =
    "https://www.videoconverterfactory.com/tips/imgs-sns/send-a-video-by-email.png";

  // Convert YouTube watch URL to embed URL
  const convertToEmbed = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      if (urlObj.searchParams.has("v")) {
        videoId = urlObj.searchParams.get("v") || "";
      } else if (urlObj.pathname.startsWith("/shorts/")) {
        videoId = urlObj.pathname.split("/")[2];
      }

      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("Invalid YouTube URL", error);
      return "";
    }
  };

  const embedUrl = convertToEmbed(url);

  if (!embedUrl) {
    return <p className="text-red-500 text-center">Invalid YouTube URL</p>;
  }

  return (
    <div className="bg-gray-100 py-16">
      <div className="w-full mx-auto">
        <VideoModalTrigger
          thumbnailUrl={ROOFTOP_IMAGE}
          videoEmbedUrl={embedUrl}
        />
      </div>
    </div>
  );
};

export default Video;
