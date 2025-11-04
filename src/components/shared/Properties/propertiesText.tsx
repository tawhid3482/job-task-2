import React from 'react';

const N71LakeCondos: React.FC = () => {
  return (
    // Set the entire background to black and text to white
    <div className="bg-black text-white min-h-screen py-24 font-sans font-light tracking-wider">
      <div className="w-full mx-auto p-16">
        
        {/* Top Section */}
        <div className="mb-20 lg:mb-32">
          {/* This text is large and spans a constrained width on the left */}
          <p className="text-sm leading-relaxed md:w-2/3 ">
            Nestled beside a serene lake and surrounded by lush landscapes, <span className='font-bold'>N71 Lake Condos</span> is an architectural masterpiece designed for those who seek exclusivity, elegance, and tranquility—all within Dhaka’s thriving urban fabric.

          </p>
        </div>

        {/* Bottom Sections (Two Columns) */}
        <div className="flex flex-col lg:flex-row justify-between">
          
          {/* Left Column (Rooftop Description) */}
          {/* We use ml-auto and w-full/w-1/2 to push this column toward the center on large screens */}
          <div className="lg:w-1/3 text-sm lg:ml-auto lg:mr-16 mb-12 lg:mb-0">
            <p className="leading-relaxed">
              The rooftop at <span className='font-bold'>N71 Lake Condos</span> is a perfect blend of luxury 
              and tranquility, designed to elevate everyday living. The 
              infinity pool offers a refreshing retreat with breathtaking 
              views, while the shaded pavilion provides a serene space to 
              unwind. A state-of-the-art gym ensures fitness with a view, 
              and lush green terraces create a natural escape. Thoughtfully 
              designed walkways and seating areas encourage relaxation 
              and social interaction, making this rooftop a seamless fusion 
              of comfort, wellness, and modern elegance.
            </p>
          </div>

          {/* Right Column (Grand Residences Description) */}
          {/* This column stays on the right side */}
          <div className="lg:w-1/3">
            <p className="leading-relaxed text-sm">
              You'll feel a grand welcome every time you enter your home 
              at the Grand Residences—the perfect address to call home. 
              Make this prestigious lifestyle a reality, where you can 
              impress yourself daily, and where life is filled with excitement 
              and endless memories as the years go by.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default N71LakeCondos;