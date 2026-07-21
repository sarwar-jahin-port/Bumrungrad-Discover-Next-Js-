export const metadata = {
  title: 'Bumrungrad Hospital: Unveiling Our Mission and Core Values',
  description: "Discover Bumrungrad International Hospital's mission and values, guiding a commitment to excellence in patient care. Your well-being is our top priority.",
  alternates: {
    canonical: 'https://discoverinternationalmedicalservice.com/about-vision-and-mission',
  },
  charset: 'utf-8',
};

import React from "react";
import missionVissionimg from "@/public/assets/about_bumrungrad/PatientandStaffSafetyStatement.jpg";
import environmentimg from "@/public/assets/about_bumrungrad/BumrungradEnvironmental.jpg";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const VissionMisson = async () => {
    const t = await getTranslations("aboutVisionMission");
    const safetyBeliefs = t.raw("safetyBeliefs");
    const environmentalPrinciples = t.raw("environmentalPrinciples");
    return (
        <section className='mx-5 md:container md:mx-auto'>
            <div className='h-[20vh] md:h-[30vh] lg:h-[50vh] vissionMission-back relative flex justify-center items-center'>
                <div className='absolute top-0 h-full w-full bg-black/60'></div>

                <h4 className='uppercase text-xl text-center md:text-2xl lg:text-3xl font-bold text-white z-10'>
                    {t("heroTitle")}
                </h4>
            </div>
            {/* new content here */}
            <div className='mx-5 my-10'>
            <h1 className="text-blue text-xl md:text-2xl font-semibold pb-8">{t("trustedPartnerHeading")}</h1>
                <p className='text-justify pb-8'>
                    {t("trustedPartnerText")}
                </p>
                <h2 className='text-blue text-xl md:text-2xl font-semibold'>
                    {t("vmvHeading")}
                </h2>
                <div className='my-10'>
                    <hr />
                    <p className='text-[16px] py-3 text-blue font-medium'>
                        {t("visionLabel")}
                    </p>
                    <hr />
                </div>
                <p className='text-justify'>
                    {t("visionTextBefore")}
                    <a
                        className='font-semibold text-blue underline mr-2 ml-2'
                        href='https://discoverinternationalmedicalservice.com/'
                    >
                        {t("linkText")}
                    </a>
                    {t("visionTextAfter")}
                </p>
                <div className='my-10'>
                    <hr />
                    <p className='text-[16px] py-3 text-blue font-medium'>
                        {t("missionLabel")}
                    </p>
                    <hr />
                </div>
                <p className='text-justify'>
                    {t("missionTextBefore")}
                    <a
                        className='font-semibold text-blue underline ml-2 mr-2'
                        href='https://discoverinternationalmedicalservice.com/'
                    >
                        {t("linkText")}
                    </a>
                    {t("missionTextAfter")}
                </p>

                <div className='my-10'>
                    <hr />
                    <p className='text-[16px] py-3 text-blue font-medium'>
                        {t("coreValuesLabel")}
                    </p>
                    <hr />
                </div>
                <p>
                    {t("coreValuesText")}
                </p>
            </div>
            <div className='mx-5 my-10'>
                <h2 className='text-blue text-xl md:text-2xl font-semibold my-8'>
                    {t("safetyStatementHeading")}
                </h2>
                <p className='text-justify mt-4'>
                    {t("safetyStatementP1Before")}
                    <a
                        className='font-semibold text-blue underline mx-2'
                        href='https://discoverinternationalmedicalservice.com/'
                    >
                        {t("linkText")}
                    </a>
                    {t("safetyStatementP1After")}
                </p>
                <p className='mt-4'>{t("weBelieveThat")}</p>
                <ol className='pl-6 mt-2 list-decimal'>
                    {safetyBeliefs.map((s, i) => (
                        <li key={i} className=' mt-1'>{s}</li>
                    ))}
                    <li className=' mt-1'>
                        <a
                            className='font-semibold text-blue underline'
                            href='https://discoverinternationalmedicalservice.com/'
                        >
                            {t("linkText")}
                        </a>
                    </li>
                </ol>
                <div className='ml-4 mt-4'>
                    <Image
                        src={missionVissionimg}
                        alt='Bumrungrad International Hospital'
                        height={500}
                        width={1000}
                        className='w-full h-full'
                    />
                </div>
            </div>
            <div className='mx-5 my-10'>
                <h2 className='text-blue text-xl md:text-2xl font-semibold'>
                    {t("qualityStatementHeading")}
                </h2>
                <p className='text-justify mt-4'>
                    <a
                        className='font-semibold text-blue underline mr-2'
                        href='https://discoverinternationalmedicalservice.com/'
                    >
                        {t("linkText")}
                    </a>
                    {t("qualityStatementText")}
                </p>
                <h2 className='text-blue text-xl md:text-2xl font-semibold mt-10'>
                    {t("environmentalStatementHeading")}
                </h2>
                <p className='text-justify mt-4'>
                    <a
                        className='font-semibold text-blue underline mr-2'
                        href='https://discoverinternationalmedicalservice.com/'
                    >
                        {t("linkText")}
                    </a>
                    {t("environmentalStatementText")}
                </p>
                <h2 className='text-blue text-xl md:text-2xl font-semibold mt-10'>
                    {t("environmentalPrinciplesHeading")}
                </h2>
                <ol className='pl-6 mt-6'>
                    {environmentalPrinciples.map((p, i) => (
                        <li key={i} className='list-decimal mt-1'>{p}</li>
                    ))}
                </ol>
                <div className='ml-4 mt-8'>
                    <Image
                        src={environmentimg}
                        alt='Bumrungrad International Hospital'
                        height={500}
                        width={1000}
                        className='w-full h-full'
                    />
                </div>
            </div>
        </section>
    );
};

export default VissionMisson;
