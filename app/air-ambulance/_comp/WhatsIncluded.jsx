"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import img1 from "@/public/assets/Medical-Report.webp";
import img2 from "@/public/assets/Bumrungrad-International-Hospital-Bangladesh-Office.webp";
import img3 from "@/public/assets/Banner.webp";
import img4 from "@/public/assets/Our-Mission-Your-Healthcare-Journey-Made-Easy-scaled.webp";
import img5 from "@/public/assets/CHECK-UP_014.webp";

const IMAGES = [img1, img2, img3, img4, img5];

const WhatsIncluded = () => {
  const t = useTranslations("airAmbulance.landing.included");
  const items = t.raw("items");

  return (
    <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
      <h2 className="text-xl md:text-2xl font-bold text-blue mb-10 text-center">
        {t("heading")}
      </h2>

      <div className="flex flex-col gap-12 md:gap-16">
        {items.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                reversed ? "md:[direction:rtl]" : ""
              }`}
            >
              <div className="md:[direction:ltr]">
                <Image
                  src={IMAGES[i % IMAGES.length]}
                  alt={item.title}
                  className="rounded-xl w-full aspect-[4/3] object-cover object-center bg-cream"
                />
              </div>
              <div className="md:[direction:ltr]">
                <h3 className="text-lg md:text-xl font-bold text-blue">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-black/70 mt-3 leading-relaxed">
                  {item.desc}
                </p>
                <a href="#request-transport" className="btn_primary bg-blue text-white border-none !w-auto !whitespace-normal">
                  {t("ctaLabel")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsIncluded;
