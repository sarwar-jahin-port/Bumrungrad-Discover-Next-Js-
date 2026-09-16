"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import cardiology from "@/public/assets/specific_offer/Cardiology.svg";
import neurology from "@/public/assets/specific_offer/Neurology or Neurosurgery.svg";
import oncology from "@/public/assets/specific_offer/Oncology or Cancer Treatment.svg";
import generalSurgery from "@/public/assets/specific_offer/General Surgery.svg";
import orthopaedics from "@/public/assets/specific_offer/Orthopaedics and Trauma.svg";
import gynaecology from "@/public/assets/specific_offer/Gynaecology.svg";

const ICONS = [cardiology, neurology, oncology, generalSurgery, orthopaedics, gynaecology];

const ConditionsTransferred = () => {
  const t = useTranslations("airAmbulance.landing.conditions");
  const items = t.raw("items");

  return (
    <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
      <h2 className="text-xl md:text-2xl font-bold text-blue mb-8 text-center">
        {t("heading")}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <Image
              src={ICONS[i % ICONS.length]}
              alt={item.title}
              className="w-10 h-10 shrink-0"
            />
            <p className="leading-relaxed">
              <span className="font-semibold text-blue">{item.title}. </span>
              <span className="text-sm text-black/70">{item.desc}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionsTransferred;
