export const metadata = {
  title: "Hospital Information Repository | Bumrungrad Discover",
  description:
    "Institutional information about Bumrungrad International Hospital: history, facts and figures, accreditations, vision and mission, and foundation work.",
};

import React from "react";
import Link from "next/link";

const REPOSITORY_LINKS = [
  {
    title: "About Bumrungrad",
    description: "History, scale, and clinical innovation at Bumrungrad International Hospital.",
    href: "/about-bumrungrad",
  },
  {
    title: "Vision & Mission",
    description: "The hospital's guiding vision and mission in international patient care.",
    href: "/about-vision-and-misson",
  },
  {
    title: "Factsheet",
    description: "Operational footprint: bed count, staff numbers, patient volumes, and clinical centers.",
    href: "/about-factsheet",
  },
  {
    title: "Accreditation",
    description: "International certifications, awards, and quality accreditations.",
    href: "/about-accreditation",
  },
  {
    title: "Foundation",
    description: "Bumrungrad's community and philanthropic foundation work.",
    href: "/about-foundation",
  },
];

const HospitalInformationPage = () => {
  return (
    <div>
      <div className="py-14 md:py-20 bg-blue relative flex justify-center items-center text-center px-5">
        <div className="text-white z-10 max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold">
            Hospital Information Repository
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/90">
            Institutional data about Bumrungrad International Hospital's
            operational footprint, history, and standing.
          </p>
        </div>
      </div>

      <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REPOSITORY_LINKS.map((item) => (
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
