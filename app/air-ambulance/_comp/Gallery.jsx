"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import img1 from "@/public/assets/aim-ambulance/use this.jpeg";
import img2 from "@/public/assets/aim-ambulance/20260628_183950.jpg.jpeg";
import img3 from "@/public/assets/aim-ambulance/20260628_183829.jpg.jpeg";
import img4 from "@/public/assets/aim-ambulance/20260628_183855(1).jpg.jpeg";
import img5 from "@/public/assets/aim-ambulance/20260728_132102.jpg.jpeg";
import img6 from "@/public/assets/aim-ambulance/Gemini_Generated_Image_xg86p5xg86p5xg86.png";

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
