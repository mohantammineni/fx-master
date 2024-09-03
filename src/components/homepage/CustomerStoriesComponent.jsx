import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/carousel.css';

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    focusOnSelect: true,
  };

  const slides = [
    {
      title: "Hi, I'm Rajesh",
      subtitle: "I work as a director",
      content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      image: "/customers/customer-1.png"
    },
    {
      title: "Hi, I'm Rajesh",
      subtitle: "I work as a director",
      content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      image: "/customers/customer-2.png"
    },
    {
      title: "Hi, I'm Rajesh",
      subtitle: "I work as a director",
      content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      image: "/customers/customer-3.png"
    },
    {
      title: "Hi, I'm Rajesh",
      subtitle: "I work as a director",
      content: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      image: "/customers/customer-4.png"
    }
  ];

  return (
    <div className="relative w-full">
      <Slider {...settings} className="custom-slider py-4">
        {slides.map((slide, index) => (
          <div key={index} className="flex justify-center items-center pt-4">
            <div
              className={`w-full h-64 bg-[#0F51BC] items-center rounded-2xl flex transition-transform duration-500 ease-in-out custom-slide ${
                index === 1 ? 'focused' : 'blurred'
              }`}
            >
              <div className="w-1/3 h-full">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-4 text-[#FFC92E]">
                <h3 className="text-xl font-semibold mb-1">{slide.title}</h3>
                <h4 className="text-lg font-medium mb-2">{slide.subtitle}</h4>
                <p className="text-[11px]">{slide.content}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;