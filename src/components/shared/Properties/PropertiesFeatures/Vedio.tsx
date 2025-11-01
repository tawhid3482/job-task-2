"use client";
import React from 'react';
import VideoModalTrigger from './PropertiesVedio';


const Video = () => {
    const ROOFTOP_IMAGE = 'https://jcxbd.com/wp-content/uploads/2025/03/Scene-81-scaled.jpg'; 
    const EXAMPLE_VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; 
    return (
        <div >
            <div className="bg-gray-100 py-16">
                <div className="w-full mx-auto">
                    <VideoModalTrigger
                        thumbnailUrl={ROOFTOP_IMAGE}
                        videoEmbedUrl={EXAMPLE_VIDEO_URL}
                    />
                </div>
            </div>
        </div>
    );
};

export default Video;