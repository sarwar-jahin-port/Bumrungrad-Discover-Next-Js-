export const metadata = {
  title: 'Bumrungrad Hospital: Fact Sheet & Services | Your Health Journey',
  description: "Discover Bumrungrad International Hospital's Services & Facts for exceptional care. Start your health journey with our comprehensive offerings.",
  alternates: {
    canonical: 'https://discoverinternationalmedicalservice.com/about-factsheet',
  },
  charset: 'utf-8',
};


import React from "react";
import buildingimg from "@/public/assets/about_bumrungrad/FactSheet/Main Hospital Facility & services.png";
import clinicimg from "@/public/assets/about_bumrungrad/FactSheet/Outpatient Clinic Facility & Services.png";
import resourceimg from "@/public/assets/about_bumrungrad/FactSheet/Human Resources.png";
import roomimg from "@/public/assets/about_bumrungrad/FactSheet/Outpatient Facilities.png";
import bumrunCenterimg from "@/public/assets/about_bumrungrad/FactSheet/Outpatient Clinics, Centers and Programs.png";
import techimg from "@/public/assets/about_bumrungrad/FactSheet/International Referral Offices.png";
import internimg from "@/public/assets/about_bumrungrad/FactSheet/Quality, Accreditations, Certifications and Recognitions.png";
import responimg from "@/public/assets/about_bumrungrad/FactSheet/Social Responsibility.png";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const FactSheet = async () => {
  const t = await getTranslations("aboutFactsheet");
  const mainBuildingItems = t.raw("mainBuildingItems");
  const outpatientFacilitiesItems = t.raw("outpatientFacilitiesItems");
  const volumeSubItems = t.raw("volumeSubItems");
  const hrItems = t.raw("hrItems");
  const inpatientBedTypes = t.raw("inpatientBedTypes");
  const inpatientOtherItems = t.raw("inpatientOtherItems");
  const outpatientClinicsItems = t.raw("outpatientClinicsItems");
  const centersItems = t.raw("centersItems");
  const exclusiveItems = t.raw("exclusiveItems");
  const nationalServicesItems = t.raw("nationalServicesItems");
  const nationalServicesItemsAfterContact = t.raw("nationalServicesItemsAfterContact");
  const certItems = t.raw("certItems");
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
          {t("mainHeading")}
        </h2>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">{t("missionHeading")}</p>
          <hr />
        </div>
        <p className="text-justify">
          {t("missionTextBefore")}
          <Link
             href="https://discoverinternationalmedicalservice.com/"
            className="text-blue font-semibold underline"
          >
            {t("linkText")}
          </Link>
          {t("missionTextAfter")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">{t("ownershipHeading")}</p>
          <hr />
        </div>
        <p className="text-justify">
          {t("ownershipText")}
        </p>

        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("mainBuildingHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6 list-decimal">
          {mainBuildingItems.map((item, i) => (
            <li key={i} className=" mt-2">{item}</li>
          ))}
        </ol>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={buildingimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
      </div>
      <div className="mx-5 my-10">
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("outpatientFacilitiesHeadingBefore")}
            <Link
              className="text-blue font-semibold underline"
               href="https://discoverinternationalmedicalservice.com/our-services"
            >
              {t("outpatientFacilitiesServicesLink")}
            </Link>
            {t("outpatientFacilitiesHeadingAfter")}
          </p>
          <hr />
        </div>
        <ol className="pl-6">
          {outpatientFacilitiesItems.map((item, i) => (
            <li key={i} className="list-disc mt-2">{item}</li>
          ))}
          <ol className="list-decimal">
            {volumeSubItems.map((item, i) => (
              <li key={i} className=" ml-9 mt-2">{item}</li>
            ))}
          </ol>
        </ol>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={clinicimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("hrHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6 list-decimal">
          {hrItems.map((item, i) => (
            <li key={i} className=" mt-2">{item}</li>
          ))}
        </ol>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={resourceimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("inpatientHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6 list-decimal">
          <li className=" mt-2">{t("inpatientBedsIntro")}</li>
          <ol className="list-decimal">
            {inpatientBedTypes.map((item, i) => (
              <li key={i} className=" ml-9 mt-2">{item}</li>
            ))}
          </ol>

          {inpatientOtherItems.map((item, i) => (
            <li key={i} className=" mt-2">{item}</li>
          ))}
        </ol>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("outpatientClinicsHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6">
          {outpatientClinicsItems.map((item, i) => (
            <li key={i} className="list-disc mt-2">{item}</li>
          ))}
        </ol>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={roomimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("centersHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6">
          {centersItems.map((item, i) => (
            <li key={i} className="list-disc mt-2">{item}</li>
          ))}
        </ol>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={bumrunCenterimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("exclusiveHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6">
          {exclusiveItems.map((item, i) => (
            <li key={i} className="list-disc mt-2">{item}</li>
          ))}
        </ol>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("coordinatorsHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify">
          {t("coordinatorsText")}
        </p>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={techimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("nationalServicesHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6 list-decimal">
          {nationalServicesItems.map((item, i) => (
            <li key={i} className=" mt-2">{item}</li>
          ))}
          <li className=" mt-2">{t("contactItemBefore")} <Link  href="https://discoverinternationalmedicalservice.com/contact-us" className="text-blue font-semibold underline">{t("contactItemLink")}</Link> {t("contactItemAfter")}</li>
          {nationalServicesItemsAfterContact.map((item, i) => (
            <li key={i} className=" mt-2">{item}</li>
          ))}
        </ol>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("certHeading")}
          </p>
          <hr />
        </div>
        <ol className="pl-6 list-decimal">
          {certItems.map((item, i) => (
            <li key={i} className=" mt-2">{item}</li>
          ))}
        </ol>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={internimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("socialHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify">
          {t("socialText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">{t("descriptionHeading")}</p>
          <hr />
        </div>
        <p className="text-justify">
          {t("descriptionText")}
        </p>
        <div className="mt-4">
          <Image
            className="w-full h-full"
            height={500}
            width={500}
            src={responimg}
            alt="Bumrungrad International Hospital"
          />
        </div>
      </div>
    </section>
  );
};

export default FactSheet;
