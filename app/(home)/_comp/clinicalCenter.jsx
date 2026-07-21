"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./clinicalcss.css";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Divider } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Images/alt live in code; localized name + desc come from messages, matched by slug.
const CLINIC_IMAGES = {
  "neuroscience-center": "https://i.ibb.co/HGF3VjQ/Bumrungrad-Hospital-Neuroscience-Center.png",
  "heart-institute": "https://i.ibb.co/0QYWQN7/Bumrungrad-Hospital-Heart-Institute.png",
  "diagnostic-center": "https://i.ibb.co/FXZcf3C/Bumrungrad-Hospital-GI-Digestive-Center.png",
  "horizon-regional-cancer-center": "https://i.ibb.co/gDq36Yw/Bumrungrad-Hospital-Horizon-Regional-Cancer-Center.png",
  "colorectal-surgery-center": "https://i.ibb.co/1XwRSpR/Bumrungrad-Hospital-Colorectal-Surgery-Center.png",
  "urology-center": "https://i.ibb.co/RgMTHMj/Bumrungrad-Hospital-Urology-Center.png",
  "bumrungrad-spine-institute": "https://i.ibb.co/8dyhLjG/Bumrungrad-Hospital-Spine-Institute.png",
};

export default function ClinicCenters() {
  const t = useTranslations("home.clinicCenters");
  const clinicImages = t.raw("items").map((item) => ({
    ...item,
    img: CLINIC_IMAGES[item.slug],
    alt: "Bumrungrad International Hospital",
  }));
  return (
    <div className="p-5 md:p-10 my-5 md:my-10 md:container md:mx-auto rounded shadow">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-xl md:text-2xl lg:text-3xl font-bold text-blue">
          {t("heading")}
        </h2>
        <Link
          href={"/clinic-centers"}
          className="rounded px-2 md:px-4 py-1 md:py-2 border border-blue text-blue hover:bg-blue hover:text-white duration-300 ease-linear"
        >
          {t("viewAll")}
        </Link>
      </div>
      <div className="my-5">
        <Divider />
      </div>
      <div>
        <Swiper
          effect={"coverflow"}
          // centeredSlides={true}
          breakpoints={{
            // Small screens (up to 640px)
            0: {
              slidesPerView: 2,
            },
            // Medium screens (from 641px to 768px)
            768: {
              slidesPerView: 3,
            },
            // Large screens (from 769px and above)
            1024: {
              slidesPerView: 5,
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
            el: ".custom-pagination",
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {clinicImages?.map((sc, i) => (
            <SwiperSlide key={i}>
              <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/10">
                <div>
                  <Image
                    height={500}
                    width={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                    src={sc?.img}
                    alt={sc?.alt}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent from-black/70 via-black/60 to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[50%] flex-col items-center justify-center p-5 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h2 className="mb-2.5 md:mb-5 font-dmserif md:text-xl font-bold text-white">
                    {sc?.name}
                  </h2>
                  <p className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span
                      className="md:hidden"
                      dangerouslySetInnerHTML={{
                        __html: sc?.desc?.slice(0, 60),
                      }}
                    />
                    <span
                      className="hidden md:block lg:hidden"
                      dangerouslySetInnerHTML={{
                        __html: sc?.desc?.slice(0, 100),
                      }}
                    />
                    <span
                      className="hidden lg:block"
                      dangerouslySetInnerHTML={{
                        __html: sc?.desc?.slice(0, 200),
                      }}
                    />
                    {/* <span className="md:hidden">
                      {sc?.desc.slice(0, 60)} ...
                    </span>
                    <span className="hidden md:block lg:hidden">
                      {sc?.desc.slice(0, 100)} ...
                    </span>
                    <span className="hidden lg:block">
                      {sc?.desc.slice(0, 200)} ...
                    </span> */}
                  </p>
                  <Link
                    href={`/clinic-centers/${sc.slug}`}
                    className=" mt-3 bg-white shadow-xl rounded py-1 md:py-2 px-2 md:px-4 font-com text-sm capitalize text-blue font-semibold"
                    target="_blank"
                  >
                    {t("seeMore")}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-5 flex gap-2 justify-center"></div>
      </div>
    </div>
  );
}
