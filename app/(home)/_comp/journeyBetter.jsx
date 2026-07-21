"use client";

import React from "react";
import logo from "@/public/assets/Bumrungrad  Hospital_nav_logo.png";
import Image from "next/image";
import useAuth from "@/helpers/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function JourneyBetter() {
  const t = useTranslations("home.journey");
  const {auth} = useAuth();
  const router = useRouter();

  function handleAppointment() {
    if (auth) {
      router.push("/our-services/appointment");
    } else {
      router.push("/login");
    }
  }
  function handleHealthScreen() {
    if (auth) {
      router.push("/check-up");
    } else {
      router.push("/login");
    }
  }
  return (
    <div className="p-4 md:p-8 mx-5 md:container md:mx-auto flex flex-col gap-5 md:gap-10 items-center bg-cream rounded shadow mt-5">
      <Image
        height={150}
        width={1000}
        src={logo}
        effect="blur"
        alt="Bumrungrad International Hospital"
        className="max-sm:w-[300px] md:w-[350px] lg:w-[350px]"
      />
      <h2 className="text-xl md:text-2xl text-center font-semibold text-blue">
        {t("heading")}
      </h2>
      <p className="text-center">
        {t("description")}
      </p>
      <div className="flex flex-wrap gap-4 mt-5 justify-center">
        <button onClick={handleAppointment} className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded">
          {t("doctorAppointment")}
        </button>
        <button onClick={handleHealthScreen} className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded">
          {t("healthScreening")}
        </button>
        <a href="/doctors" className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded">
          {t("findDoctor")}
        </a>
        <a href="/send-query" className="text-sm px-4 py-2 bg-blue text-white border border-blue hover:bg-cream hover:text-blue md:hover:scale-105 ease-linear duration-300 shadow rounded">
          {t("sendQuery")}
        </a>
      </div>
    </div>
  );
}
