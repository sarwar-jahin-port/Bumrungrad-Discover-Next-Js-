

'use client';

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./test.css";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { AiFillStar } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Testimonial() {
  const t = useTranslations("home.testimonial");
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null); // Store the Swiper instance
  const [patientReviews, setPatientReviews] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/patient-stories")
      .then((res) => res.json())
      .then((data) => {
        setPatientReviews(data.status === 200 ? data.data : []);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, []);

  const handlePaginationClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index); // Change the slide on pagination click
    }
  };

  if (!loader && patientReviews.length === 0) {
    return null;
  }

  return (
    <div className="px-2.5 py-10 mb-10 md:rounded-3xl md:container md:mx-auto">
      <h2 className="text-center text-2xl md:text-4xl font-semibold text-blue capitalize">
        {t("heading")}
      </h2>
      {loader ? (
        <div className="mt-10 h-64 rounded-xl bg-cream animate-pulse" />
      ) : (
        <>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Track active slide
            onSwiper={(swiper) => setSwiperInstance(swiper)} // Store swiper instance
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
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
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper py-5 md:py-10 mt-5 md:mt-10"
          >
            {patientReviews.map((d, i) => (
              <SwiperSlide key={d.id ?? i}>
                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-xl border-2 border-blue">
                  <FaQuoteLeft className="text-4xl sm:text-5xl lg:text-6xl text-blue mb-2 sm:mb-4" />
                  <p className="my-2 sm:my-4 text-justify">{d.story}</p>
                  <div className="flex items-center gap-1 text-[#f7cb2b] text-base sm:text-xl lg:text-2xl my-2 sm:my-4">
                    {Array.from({ length: d.rating || 5 }).map((_, starIndex) => (
                      <AiFillStar key={starIndex} />
                    ))}
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg">
                    <p className="font-semibold">{d.patient_name}</p>
                    {d.country && <p>{t("from")} {d.country}</p>}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="custom-pagination-2 flex justify-center mt-4 gap-2">
            {patientReviews.map((_, index) => (
              <span
                key={index}
                className={`w-4 h-4 rounded-full cursor-pointer ${index === activeIndex ? 'bg-blue' : 'bg-[#a5a4a0]'}`}
                onClick={() => handlePaginationClick(index)} // Trigger pagination click
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
