import React from "react";

interface N71LakeCondosProps {
  des: string;
  des2: string;
  des3: string;
}

const N71LakeCondos: React.FC<N71LakeCondosProps> = ({ des, des2, des3 }) => {
  return (
    // Full black background with white text
    <div className="bg-black text-white min-h-screen py-24 font-sans font-light tracking-wider">
      <div className="w-full mx-auto p-16">
        {/* Top Section */}
        <div className="mb-20 lg:mb-32">
          <p className="text-sm leading-relaxed md:w-2/3">{des}</p>
        </div>

        {/* Bottom Sections */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Left Column */}
          <div className="lg:w-1/3 text-sm lg:ml-auto lg:mr-16 mb-12 lg:mb-0">
            <p className="leading-relaxed">{des2}</p>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3">
            <p className="leading-relaxed text-sm">{des3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default N71LakeCondos;
