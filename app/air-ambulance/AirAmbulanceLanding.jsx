"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AirAmbulanceForm from "@/components/services/airAmbulance";
import { useTranslations } from "next-intl";
import heroImg from "@/public/assets/medi-express-02.jpg";
import OfficeSection from "./_comp/OfficeSection";
import WhyChooseUs from "./_comp/WhyChooseUs";
import WhatsIncluded from "./_comp/WhatsIncluded";
import Gallery from "./_comp/Gallery";
import ConditionsTransferred from "./_comp/ConditionsTransferred";
import HowItWorks from "./_comp/HowItWorks";
import AreasWeServe from "./_comp/AreasWeServe";
import Faq from "./_comp/Faq";
import FinalCta from "./_comp/FinalCta";

const AirAmbulanceLanding = () => {
  const t = useTranslations("airAmbulance.landing");
  const [hubs, setHubs] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/air/ambulance/hubs")
      .then((res) => res.json())
      .then((data) => {
        setHubs(data.status === 200 ? data.data : []);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, []);

  return (
    <div>
      <div className="py-14 md:py-20 bg-blue px-5">
        <div className="md:container md:mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white text-center md:text-left">
            <p className="text-gold font-semibold uppercase tracking-wide text-sm">
              {t("eyebrow")}
            </p>
            <h1 className="text-2xl md:text-4xl font-bold mt-2">
              {t("heading")}
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/90">
              {t("intro")}
            </p>
            <a
              href="#request-transport"
              className="btn_primary bg-gold text-white border-none !w-auto !whitespace-normal"
            >
              {t("heroCtaLabel")}
            </a>
          </div>
          <Image
            src={heroImg}
            alt={t("heading")}
            className="rounded-xl w-full h-auto"
            priority
          />
        </div>
      </div>

      <OfficeSection hubs={hubs} loader={loader} />
      <WhyChooseUs />
      <WhatsIncluded />
      <Gallery />
      <ConditionsTransferred />

      <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <HowItWorks />
          <div className="flex flex-col gap-10">
            <AreasWeServe hubs={hubs} />
            <Faq />
          </div>
        </div>
      </div>

      <FinalCta />

      <div id="request-transport" className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <div className="max-w-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-blue">
            {t("requestHeading")}
          </h2>
          <p className="mt-3 text-sm md:text-base text-black/70">
            {t("requestText")}
          </p>
        </div>
        <div className="mt-8 rounded-xl border border-ash/30 shadow-lg p-6 bg-white">
          <AirAmbulanceForm />
        </div>
      </div>
    </div>
  );
};

export default AirAmbulanceLanding;
