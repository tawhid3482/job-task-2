import React from 'react';
const BACKGROUND_IMAGE_URL = 'https://jcxbd.com/wp-content/uploads/2024/11/Properties-Banner.webp';

const PropertiesBanner = () => {
    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
                }}
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
                        PROPERTIES
                    </p>

                    {/* Large main title "CONCRETE WONDERS" */}
                    <h1 className="
                    text-2xl md:text-6xl  
                    font-extralight 
                    tracking-wider
                ">
                        CONCRETE WONDERS
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default PropertiesBanner;