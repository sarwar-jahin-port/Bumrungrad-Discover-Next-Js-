export const metadata = {
  title: "Hospital Information Repository | Bumrungrad Discover",
  description:
    "Institutional information about Bumrungrad International Hospital: history, facts and figures, accreditations, vision and mission, and foundation work.",
};

import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const REPOSITORY_HREFS = [
  "/about-bumrungrad",
  "/about-vision-and-misson",
  "/about-factsheet",
  "/about-accreditation",
  "/about-foundation",
];

const HospitalInformationPage = async () => {
  const t = await getTranslations("healthInfo.hospitalInfo");
  const links = t.raw("links").map((item, i) => ({ ...item, href: REPOSITORY_HREFS[i] }));

  return (
    <div>
      <div className="py-14 md:py-20 bg-blue relative flex justify-center items-center text-center px-5">
        <div className="text-white z-10 max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold">
            {t("heading")}
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/90">
            {t("intro")}
          </p>
        </div>
      </div>

      <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-ash/30 shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col gap-2"
            >
              <h2 className="text-lg font-semibold text-blue">{item.title}</h2>
              <p className="text-sm text-black/70">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalInformationPage;
