"use client";

import React from "react";
import Image from "next/image";
import patient from "@/public/assets/patient.png";
import airplane from "@/public/assets/airplane.png";
import world from "@/public/assets/worldwide.png";
import doctor from "@/public/assets/doctor.png";
import { useTranslations } from "next-intl";

export default function RightHealthcare() {
  const t = useTranslations("home.rightHealthcare");
  const careMeta = [
    { image: patient, number: "1.1 M" },
    { image: airplane, number: "520,000" },
    { image: world, number: "190" },
    { image: doctor, number: "40" },
  ];
  const cares = t.raw("cares").map((c, i) => ({ ...careMeta[i], desc: c.desc }));
  return (
    <div className="mx-5 my-10 md:my-20 md:container md:mx-auto flex flex-col lg:flex-row lg:items-center gap-16">
      <div className="flex flex-col gap-2.5 md:gap-5 lg:w-1/2">
        <h2 className="text-xl md:text-2xl font-semibold text-blue">
          {t("heading")}
        </h2>
        <p className="text-justify">{t("p1")}</p>
        <p className="text-justify">{t("p2")}</p>
        <p className="text-justify">{t("p3")}</p>
      </div>
      <div className="lg:w-1/2 grid gap-4 md:grid-cols-2 bg-cream rounded p-8">
        {cares.map((c, i) => (
          <div
            key={i}
            className="flex  flex-col items-center gap-2.5 md:gap-5 shadow p-8 rounded bg-white group"
          >
            <Image
              height={60}
              width={60}
              src={c.image}
              alt="Bumrungrad International Hospital"
              className="shadow p-2.5 shadow-blue rounded md:group-hover:scale-110 duration-300 ease-linear"
            />
            <p className="text-center text-2xl md:text-4xl font-semibold text-blue">
              {c.number}
            </p>
            <p className="text-center">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
