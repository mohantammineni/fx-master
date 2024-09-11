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
      title: "Hi, I’m Nevak",
      subtitle: "",
      content: "I’ve been using FX Master for several months now, and I must say it’s hands down the best international money transfer service I’ve encountered.",
      image: "/customers/customer-1.png"
    },
    {
      title: "Hi, I'm Rajesh",
      subtitle: "",
      content: "Competitive Exchange Rates: I appreciate the transparency when it comes to fees and exchange rates. The rates offered are consistently better than most banks and other transfer services.",
      image: "/customers/customer-2.png"
    },
    {
      title: "Hi, I’m Royee",
      subtitle: "",
      content: "I highly recommend FX Master to anyone needing a reliable, efficient, and secure way to send money internationally. It’s truly a game-changer!",
      image: "/customers/customer-3.png"
    },
    {
      title: "Hi, I’m Joyee",
      subtitle: "",
      content: "I've had a great experience using FX Master for sending money internationally. It's fast, easy to use, and offers excellent exchange rates with low fees. The app is secure, and my transfers have always been reliable. Highly recommend it for anyone looking for a smooth money transfer service",
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
              <div className="image-container w-1/3 h-full transition-transform duration-500 ease-in-out">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full object-cover transition-all duration-500 ease-in-out ${
                    index === 1 ? 'focused-image' : 'blurred-image'
                  }`}
                />
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
