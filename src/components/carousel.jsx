import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "./carousel.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Carousel() {
  const swiper = useSwiper();
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        // navigation={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper text-xl"
      >
        <SwiperSlide>
        <div className="carousel-item">
          <h2>Join Our Community</h2>
          <p>
            Discover opportunities to contribute and make a positive impact in
            our community.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-item">
          <h2>Volunteer for a Cause</h2>
          <p>
            Become a volunteer and support causes that matter to you. Make a
            difference in people's lives.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-item">
          <h2>Community Aid Projects</h2>
          <p>
            Explore ongoing community aid projects. Contribute to initiatives
            that need your support.
          </p>
        </div>
      </SwiperSlide>


        <div className="slider-controler flex max-md:justify-center  gap-3  mt-16">
          <div
            style={{ borderWidth: 1.5, borderRadius: 4 }}
            className={`swiper-button-prev static text-3xl font-semibold bg-orange-400 border-2 border-orange-400 px-5 py-0   duration-300 text-white hover:bg-white hover:text-orange-400 transition-all `}
          >
            {"<"}
          </div>

          <div
            style={{ borderWidth: 1.5, borderRadius: 4 }}
            className={`swiper-button-next static text-3xl font-semibold bg-orange-400 border-2 border-orange-400 px-5 py-0   duration-300 text-white hover:bg-white hover:text-orange-400 transition-all `}
          >
            {">"}
          </div>
        </div>
      </Swiper>
    </>
  );
}
