"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import patientImg from "@/public/assets/patient.png";

const FinalCta = () => {
  const t = useTranslations("airAmbulance.landing.finalCta");

  return (
    <div className="bg-blue">
      <div className="mx-5 md:container md:mx-auto py-10 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            {t("heading")}
          </h2>
          <p className="text-sm md:text-base text-white/90 mt-3 max-w-xl">
            {t("text")}
          </p>
          <a
            href="#request-transport"
            className="btn_primary bg-gold text-white border-none !w-auto !whitespace-normal"
          >
            {t("buttonLabel")}
          </a>
        </div>
        <div className="bg-white rounded-full p-6 shrink-0">
          <Image src={patientImg} alt={t("heading")} className="w-20 h-20 md:w-28 md:h-28" />
        </div>
      </div>
    </div>
  );
};

export default FinalCta;
