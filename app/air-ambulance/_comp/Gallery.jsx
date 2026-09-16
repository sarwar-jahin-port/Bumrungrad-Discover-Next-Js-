"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import img1 from "@/public/assets/medi-express-02.jpg";
import img2 from "@/public/assets/about_bumrungrad/Bumrungrad_AboutUS.jpg";
import img3 from "@/public/assets/about_bumrungrad/Bumrungrad_room.jpg";
import img4 from "@/public/assets/about_bumrungrad/Bumrungrad_specialties-2022.jpg";
import img5 from "@/public/assets/hero-placeholder.jpg";
import img6 from "@/public/assets/online-treatment-02.jpg";

const IMAGES = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
  const t = useTranslations("airAmbulance.landing.gallery");

  return (
    <div className="bg-cream">
      <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-blue mb-6 text-center">
          {t("heading")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGES.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={t("heading")}
              className="rounded-xl w-full aspect-[4/3] object-cover object-center"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
