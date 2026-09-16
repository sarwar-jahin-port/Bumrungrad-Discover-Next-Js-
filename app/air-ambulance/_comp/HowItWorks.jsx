"use client";

import React from "react";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
  const t = useTranslations("airAmbulance.landing.howItWorks");
  const steps = t.raw("steps");

  return (
    <div className="bg-cream rounded-2xl p-6 md:p-8 h-full">
      <h2 className="text-xl md:text-2xl font-bold text-blue mb-8">
        {t("heading")}
      </h2>
      <div className="flex flex-col gap-5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-blue text-white font-bold text-sm">
              {i + 1}
            </div>
            <p className="leading-relaxed">
              <span className="font-semibold text-blue">{step.title}. </span>
              <span className="text-sm md:text-base text-black/70">
                {step.desc}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
