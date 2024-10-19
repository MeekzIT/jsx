import React from "react";
import Slider from "react-slick";
import { Image } from "../../store/types";

// Define types for the props (optional, but good practice with TypeScript)
interface ImageSliderProps {
  images: Image[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop through slides
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll per click
    autoplay: true, // Auto-scroll
    autoplaySpeed: 3000, // Speed of auto-scroll
  };

  return (
    <div>
      <Slider {...settings}>
        {images?.map((img, index) => (
          <div key={index}>
            <img
              src={img.image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", maxHeight: 400 }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
