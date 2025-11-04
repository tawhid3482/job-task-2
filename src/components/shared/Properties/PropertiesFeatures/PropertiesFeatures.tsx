import React from 'react';
import { Leaf, Waves, House, Dumbbell, Car, Shirt } from "lucide-react";
import { motion } from "framer-motion";

interface Amenity {
  icon: React.ElementType;
  name: string;
  description: string;
}

const amenitiesData: Amenity[] = [
  { icon: Leaf, name: "Green Space", description: "Lush communal green areas" },
  { icon: Waves, name: "Swimming Pool", description: "Relaxing infinity pool access" },
  { icon: House, name: "Child Play Area", description: "Safe and fun dedicated zone" },
  { icon: Dumbbell, name: "Gymnasium", description: "State-of-the-art fitness center" },
  { icon: Car, name: "Specious Car Parking", description: "Ample, secure parking spaces" },
  { icon: Shirt, name: "Central Laundry", description: "Convenient shared laundry facility" },
  { icon: Leaf, name: "Green Space", description: "Lush communal green areas" },
  { icon: Waves, name: "Swimming Pool", description: "Relaxing infinity pool access" },
  { icon: House, name: "Child Play Area", description: "Safe and fun dedicated zone" },
  { icon: Dumbbell, name: "Gymnasium", description: "State-of-the-art fitness center" }
];

interface AmenityCardProps {
  icon: React.ElementType;
  name: string;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ icon: Icon, name }) => (
  <div className="flex flex-col items-center text-center p-4">
    <Icon className="w-10 h-10 md:w-16 md:h-16 text-[#214187] mb-3" strokeWidth={1.5} />

    <p className="text-gray-900 font-medium leading-snug">
      {name.split(' ').map((word, index) => (
        <span key={index} className="block">{word}</span>
      ))}
    </p>
  </div>
);

const FeaturesAmenities: React.FC = () => {
  return (
    <div className="bg-[#F2F2F2] py-16 md:py-28 font-sans">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-20">
          <motion.p
            className="text-4xl font-light uppercase tracking-widest text-black"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            features & amenities
          </motion.p>
          <motion.div
            className="mx-auto mt-2 h-1 w-14 bg-[#214187]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 md:gap-y-20">
          {amenitiesData.map((amenity) => (
            <AmenityCard
              key={amenity.name}
              icon={amenity.icon}
              name={amenity.name}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturesAmenities;