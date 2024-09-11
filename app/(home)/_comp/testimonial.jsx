"use client";

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonial() {
  const patientReviews = [
    {
      country: "Nepal",
      patientName: "Sunita K.",
      comments:
        "I had a fantastic experience with DIMS, Bumrungrad Hospital Dhaka Office, when arranging my treatment in Thailand. The schedule doctor appointment and medical enquiry services were so smooth and efficient. The team even handled my Thailand visa processing, making the entire process stress-free. The post-treatment support has been exceptional, and I highly recommend their services to anyone seeking medical care abroad.",
    },
    {
      country: "UAE",
      patientName: "Ahmed R.",
      comments:
        "DIMS made my healthcare journey incredibly easy. From the airport transfer service to the telemedicine consultations, every detail was taken care of. Their admission on arrival service meant I didn’t have to worry about a thing when I reached Thailand. The Thai local accommodation they arranged was perfect, and I had a relaxing holiday after the treatment. I’m grateful for their thorough care and attention!",
    },
    {
      country: "Indonesia",
      patientName: "Dewi S.",
      comments:
        "I am very satisfied with the services offered by DIMS. They helped me with everything, from scheduling doctor appointments to transferring money for treatment. I even used their language interpreter service, which made communication with the doctors much easier. The team also arranged my air ambulance service, ensuring that I reached Bumrungrad Hospital safely. I truly appreciate their dedication to making my healthcare experience as smooth as possible.",
    },
    {
      country: "Pakistan",
      patientName: "Faisal A.",
      comments:
        "DIMS offered a comprehensive healthcare service that I’ve never experienced before. They handled my Thailand visa processing and provided top-notch airport transfer service when I arrived. The medical enquiry team was always available to answer my questions, and the post-treatment support was excellent. I would highly recommend DIMS to anyone considering treatment abroad, especially in Thailand.",
    },
  ];

  return (
    <div className="px-2.5 py-10 mb-10 md:rounded-3xl md:container md:mx-auto">
      <h2 className="text-center text-2xl md:text-4xl font-semibold text-blue capitalize">
        What our patients say
      </h2>
      <>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          breakpoints={{
            // Small screens (up to 640px)
            0: {
              slidesPerView: 1,
            },
            // Large screens (from 769px and above)
            1024: {
              slidesPerView: 2,
            },
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination", // Custom pagination class
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper py-5 md:py-10 mt-5 md:mt-10"
        >
          {patientReviews.map((d, i) => (
            <SwiperSlide key={i}>
              <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-xl border-2 border-blue">
                <FaQuoteLeft className="text-4xl sm:text-5xl lg:text-6xl text-blue mb-2 sm:mb-4" />
                <p className="my-2 sm:my-4 text-justify">{d.comments}</p>
                <div className="flex items-center gap-1 text-[#f7cb2b] text-base sm:text-xl lg:text-2xl my-2 sm:my-4">
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
                <div className="text-sm sm:text-base lg:text-lg">
                  <p className="font-semibold">{d.patientName}</p>
                  <p>From {d.country}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination for the slider */}
        <div className="custom-pagination mt-5 flex gap-2 justify-center"></div>
      </>
    </div>
  );
}
