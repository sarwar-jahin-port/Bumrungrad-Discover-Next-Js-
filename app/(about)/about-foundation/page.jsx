export const metadata = {
  title: 'Bumrungrad Foundation: Support Health, Donate Now!',
  description: 'Elevate healthcare at Bumrungrad International Hospital. Empower lives through your donation. Join us in making a difference. Donate now!',
  alternates: {
    canonical: 'https://discoverinternationalmedicalservice.com/about-foundation',
  },
  charset: 'utf-8',
};

import React from "react";
import qrimage from "@/public/assets/about_bumrungrad/Bumrungrad  Hospital_QR_bumrungrad_foundation-(3).png";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Foundation = async () => {
  const t = await getTranslations("aboutFoundation");
  const directorNames = t.raw("directorNames");
  const directorTitles = t.raw("directorTitles");
  const contactSteps = t.raw("contactSteps");
  return (
    <section className="mx-5 md:container md:mx-auto">

      <div className="h-[20vh] md:h-[30vh] lg:h-[50vh] bumrungrand-back relative flex justify-center items-center">
        <div className="absolute top-0 h-full w-full bg-black/60"></div>
        <h1 className="uppercase text-xl text-center md:text-2xl lg:text-3xl font-bold text-white z-10">
          {t("heroTitle")}
        </h1>
      </div>
      <div className="mx-5 my-10">
        <h2 className="text-blue text-xl md:text-2xl font-semibold">
          {t("introHeading")}
        </h2>
        <p className="text-justify mt-3">
          {t("introP1Before")}
          <Link
            className="font-semibold text-blue underline"
             href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("introP1Middle")}
          <Link
            className="font-semibold text-blue underline"
             href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("introP1After")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("directorsHeading")}
          </p>
          <hr />
        </div>
        <div className="flex justify-evenly">
          <div className="w-1/2">
            {directorNames.map((name, i) => (
              <p key={i} className="text-small mt-2">{name}</p>
            ))}
          </div>
          <div className="w-1/2">
            {directorTitles.map((title, i) => (
              <p key={i} className="text-small mt-2">{title}</p>
            ))}
          </div>
        </div>
        <h2 className="text-blue mt-12 text-xl md:text-2xl font-semibold">
          {t("programmeHeading")}
        </h2>
        <div className="my-6">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("rakJaiThaiTextBefore")}
            <span className="text-purple-700 font-semibold">
              {t("rakJaiThaiHighlight")}
            </span>
            {t("rakJaiThaiTextAfter")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-6">
          {t("rakJaiThaiP1")}
        </p>
        <p className="text-justify mt-6">
          {t("rakJaiThaiP2Before")}
          <Link
            className="font-semibold text-blue underline"
             href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("rakJaiThaiP2After")}
        </p>
        <p className="text-justify mt-6">
          {t("rakJaiThaiP3")}
        </p>
        <p className="text-justify mt-6">
          {t("rakJaiThaiP4")}
        </p>
        <p className="text-justify mt-6">
          {t("rakJaiThaiP5")}
        </p>
        <div className="my-6">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("mobileClinicHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-6">
          {t("mobileClinicP1")}
        </p>
        <p className="text-justify mt-6">
          {t("mobileClinicP2")}
        </p>
        <p className="text-justify mt-6">
          {t("mobileClinicP3")}
        </p>
        <div className="my-6">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("mukdahanHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-6">
          {t("mukdahanP1Before")}
          <Link
            className="font-semibold text-blue underline"
             href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("mukdahanP1After")}
        </p>
        <p className="text-justify mt-6">
          {t("mukdahanP2")}
        </p>
        <div className="my-6">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("sponsoringHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-6">
          {t("sponsoringText")}
        </p>
        <div className="my-6">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("educatingHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-6">
          {t("educatingP1Before")}
          <Link
            className="font-semibold text-blue underline"
             href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("educatingP1Middle")} <Link  href="https://discoverinternationalmedicalservice.com/our-services" className="font-semibold text-blue underline">{t("educatingServiceLink")}</Link>{t("educatingP1After")}
        </p>
        <div className="my-6">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("fundingHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-6">
          {t("fundingText")}
        </p>
        <p className="text-[16px] py-3 text-blue font-medium">
          {t("howToDonateHeading")}
        </p>
        <ol className="pl-10">
          <li className="list-decimal mt-2">
            {t("donationStep1")}
          </li>

          <div className="mt-10">
            <Image
              height={500}
              width={500}
              src={qrimage}
              alt="Bumrungrad International Hospital"
              className="w-[25%] mx-auto"

            />
          </div>

          <li className="list-decimal mt-2">
            {t("donationStep2")}
          </li>
          <li className="list-decimal mt-2">
            {t("donationStep3Before")}
            <Link
              className="font-semibold text-blue underline"
               href="https://discoverinternationalmedicalservice.com/"
            >
              {t("linkText")}
            </Link>
            {t("donationStep3After")}
          </li>
          <li className="list-decimal mt-2">
            {t("donationStep4")}
          </li>
        </ol>
        <p className="text-[16px] py-3 text-blue font-semibold">
          {t("taxDeductibleHeading")}
        </p>
        <p className="text-justify">
          {t("taxDeductibleP1Before")}
          <Link
            className="font-semibold text-blue underline"
             href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("taxDeductibleP1After")}
        </p>
        <p className="text-[16px] py-6 text-blue font-semibold">
          {t("contactHeadingBefore")}
          <Link
            className="font-semibold text-blue underline"
             href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("contactHeadingAfter")}
        </p>
        <ol className="pl-10 list-decimal">
          {contactSteps.map((step, i) => (
            <li key={i} className=" mt-2">{step}</li>
          ))}
        </ol>
        <p className="text-[16px] py-6 text-blue font-semibold">{t("addressHeading")}</p>
        <p>{t("addressLine1")}</p>
        <p>{t("addressLine2")}</p>
        <p>{t("addressLine3")}</p>
        <p className="mt-10">
          {t("shopContact")}
        </p>
      </div>
    </section>
  );
};

export default Foundation;
