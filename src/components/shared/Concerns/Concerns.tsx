import React from "react";
const BACKGROUND_IMAGE_URL =
  "https://jcxbd.com/wp-content/uploads/2024/04/Concerns-Banner.jpg";

const Concerns = () => {
  return (
    <div>
      <div
        // 1. Set the background image and cover the container.
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
        }}
        // 2. Add classes for height, background size/position, and flex for centering.
        className="
                h-96 md:h-[420px]
                bg-cover bg-center 
                flex items-center justify-center 
                relative 
                text-white 
            "
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Container for the text, positioned on top of the overlay */}
        <div className="relative text-center p-4">
          {/* Small text "PROPERTIES" */}
          <p className="text-sm tracking-widest uppercase mb-2 opacity-80">
            Concerns
          </p>

          {/* Large main title "CONCRETE WONDERS" */}
          <h1
            className="
                    text-2xl md:text-7xl  
                    font-light 
                    tracking-wider
                "
          >
            DIVIDE AND CONQUER
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Concerns;
