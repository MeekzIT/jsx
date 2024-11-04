import React, { useState } from "react";
import Slider from "react-slick";
import { Image } from "../../store/types";
import { SimpleDialog } from "../dialog/Dialog";

// Define types for the props (optional, but good practice with TypeScript)
interface ImageSliderProps {
  images: Image[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(false);
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
          <div
            key={index}
            onClick={() => {
              setCurrent(img);
              setOpen(true);
            }}
          >
            <img
              src={img.image}
              alt={`Slide ${index + 1}`}
              // style={{ width: "100%", maxHeight: 400 }}
            />
          </div>
        ))}
      </Slider>
      <SimpleDialog open={open} onClose={() => setOpen(false)}>
        <img
          src={current?.image}
          width={current?.width}
          height={current?.height}
        />
      </SimpleDialog>
    </div>
  );
};

export default ImageSlider;
