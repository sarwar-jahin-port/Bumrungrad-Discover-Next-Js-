export const metadata = {
  title: "Legal Info | Bumrungrad International Terms & Conditions",
  description:
    "Review the terms and conditions of using Bumrungrad International’s services, ensuring you’re informed every step of the way.",
};

import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function TermsConditions() {
  const t = await getTranslations("termsConditions");
  return (
    <div className="p-5 my-5 md:container md:mx-auto ">
      <h5 className="text-3xl">{t("heading")}</h5>
      <p className="text-justify mt-4">
        {t("introBefore")}{" "}
        <Link
          className="font-semibold text-blue underline"
          href="https://discoverinternationalmedicalservice.com/"
        >
          {t("introLinkText")}
        </Link>{" "}
        {t("introAfter")}
      </p>
      <h5 className="text-3xl mt-8">{t("useOfServicesHeading")}</h5>
      <p className="text-justify mt-4">
        {t("useOfServicesBefore")}{" "}
        <Link
          className="font-semibold text-blue underline"
          href="https://discoverinternationalmedicalservice.com/our-services"
        >
          {t("ourServiceLinkText")}
        </Link>{" "}
        {t("useOfServicesAfter")}
      </p>
      <h5 className="text-3xl mt-8">{t("userResponsibilitiesHeading")}</h5>
      <p className="text-justify mt-4">
        {t("userResponsibilitiesText")}
      </p>
      <h5 className="text-3xl mt-8">{t("paymentHeading")}</h5>
      <p className="text-justify mt-4">
        {t("paymentTextBefore")}
        <Link
          className="font-semibold text-blue underline ml-2"
          href="https://discoverinternationalmedicalservice.com/packages"
        >
          {t("packagesLinkText")}
        </Link>{" "}
        {t("paymentTextAfter")}
      </p>
      <h5 className="text-3xl mt-8">{t("ipHeading")}</h5>
      <p className="text-justify mt-4">
        {t("ipText")}
      </p>
      <h5 className="text-3xl mt-8">{t("liabilityHeading")}</h5>
      <p className="text-justify mt-4">
        {t("liabilityText")}
      </p>
      <h5 className="text-3xl mt-8">{t("indemnificationHeading")}</h5>
      <p className="text-justify mt-4">
        {t("indemnificationText")}
      </p>
      <h5 className="text-3xl mt-8">{t("governingLawHeading")}</h5>
      <p className="text-justify mt-4">
        {t("governingLawText")}
      </p>

      <h5 className="text-3xl mt-8">{t("contactHeading")}</h5>
      <p className="text-justify mt-4">
        {t("contactTextBefore")}{" "}
        <Link
          className="font-semibold text-blue underline ml-2"
          href="https://discoverinternationalmedicalservice.com/contact-us"
        >
          {t("contactLinkText")}
        </Link>{" "}
        {t("contactTextAfter")}{" "}
        <span className="text-blue font-bold">
          support@discoverinternationalmedicalservice.com
        </span>
      </p>
    </div>
  );
}
