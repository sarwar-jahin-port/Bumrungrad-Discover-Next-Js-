"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IoMdCheckmarkCircle } from "react-icons/io";
import whyImg from "@/public/assets/Medical-Visa.webp";

const WhyChooseUs = () => {
  const t = useTranslations("airAmbulance.landing.whyUs");
  const points = t.raw("points");

  return (
    <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-blue mb-6">
            {t("heading")}
          </h2>
          <div className="flex flex-col gap-5">
            {points.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <IoMdCheckmarkCircle className="text-green text-xl shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue">{point.title}</p>
                  <p className="text-sm text-black/70 mt-1.5 leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          src={whyImg}
          alt={t("heading")}
          className="rounded-xl w-full h-auto"
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;
