export const metadata = {
  title: 'Learn About Bumrungrad Hospital: Excellence in Healthcare',
  description: "Explore Bumrungrad International Hospital's excellence in healthcare. Discover cutting-edge services and compassionate care for your well-being.",
  alternates: {
    canonical: 'https://discoverinternationalmedicalservice.com/about-bumrungrad',
  },
  charset: 'utf-8',
};

import React from "react";
import careimg from "@/public/assets/about_bumrungrad/bumrungrad_owned.png";
import awardimg from "@/public/assets/about_bumrungrad/Bumrungrad _Hospital_Bumrungrad_Award.png";
import specialtiesimg from "@/public/assets/about_bumrungrad/bumrungrad_owned (1).png";
import inovationsimg from "@/public/assets/about_bumrungrad/bumrungrad_owned (2).png";
import careingimg from "@/public/assets/about_bumrungrad/bumrungrad_owned (3).png";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";


const Bumrungrad = async () => {
  const t = await getTranslations("aboutBumrungrad");
  const benchmarks = t.raw("benchmarks");
  return (
    <section className="mx-5 md:container md:mx-auto">
      <div className="h-[20vh] md:h-[30vh] lg:h-[50vh] bumrungrand-back relative flex justify-center items-center">
        <div className="absolute top-0 h-full w-full bg-black/60"></div>
        <h1 className="uppercase text-xl text-center md:text-2xl lg:text-3xl font-bold text-white z-10">
          {t("heroTitle")}
        </h1>
      </div>

      {/* new content here */}
      <div className="mx-5 my-10">
        <h2 className="text-blue text-xl md:text-2xl font-semibold">
          {t("section1Heading")}
        </h2>
        <p className="text-justify mt-5">
          {t("section1TextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("section1TextAfter")}
        </p>
      </div>
      <div className="mx-5 my-20">
        <div>
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">{t("benchmarksHeading")}</p>
          <hr />
        </div>
        <div className="mt-4">
          <ol className="pl-6 list-decimal">
            {benchmarks.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ol>

          <div className="ml-4 mt-4">
            <Image
              className="w-full h-full"
              src={careimg}
              alt="Bumrungrad International Hospital"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="mx-5 my-20">
        <div>
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("expertiseHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-4">
          <p className="text-justify mt-5">
            {t("expertiseP1Before")}
            <Link
              className="font-semibold text-blue underline"
              href="https://discoverinternationalmedicalservice.com/"
            >
              {t("linkText")}
            </Link>
            {t("expertiseP1Middle")}
            <Link
              className="font-semibold text-blue underline"
              href="https://discoverinternationalmedicalservice.com/"
            >
              {t("linkText")}
            </Link>
            {t("expertiseP1After")}
          </p>
          <div className="ml-4 mt-4">
            <Image
              height={500}
              width={500}
              className="w-full h-full"
              src={awardimg}
              alt="Bumrungrad International Hospital"
            />
          </div>
        </div>
      </div>
      <div className="mx-5 my-20">
        <div>
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("resultsHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-4">
          <p className="text-justify mt-5">
            {t("resultsP1Before")}
            <Link
              className="font-semibold text-blue underline"
              href="https://discoverinternationalmedicalservice.com/"
            >
              {t("linkText")}
            </Link>
            {t("resultsP1After")}
          </p>
          <div className="ml-4 mt-4">
            <Image
              src={specialtiesimg}
              alt="Bumrungrad International Hospital"
              height={500}
              width={500}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="mx-5 my-20">
        <div>
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("techHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-4">
          <p className="text-justify mt-5">
            {t("techP1Before")}
            <Link
              className="font-semibold text-blue underline"
              href="https://discoverinternationalmedicalservice.com/"
            >
              {t("linkText")}
            </Link>
            {t("techP1After")}
          </p>
          <div className="ml-4 mt-4">
            <Image
              height={500}
              width={500}
              className="w-full h-full"
              src={inovationsimg}
              alt="Bumrungrad International Hospital"
            />
          </div>
        </div>
      </div>
      <div className="mx-5 my-20">
        <div>
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("caregivingHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-4">
          <p className="text-justify mt-5">
            {t("caregivingP1")}
            <Link
              href="https://discoverims.com/"
              className="font-semibold underline text-blue"
            >
              {t("linkTextShort")}
            </Link>
            {t("caregivingP1Middle")}
          </p>
          <div className="ml-4 mt-4">
            <Image
              height={500}
              width={500}
              className="w-full h-full"
              src={careingimg}
              alt="Bumrungrad International Hospital"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bumrungrad;
