export const metadata = {
  title: 'Bumrungrad Hospital: Explore The Accreditation & Awards',
  description: "Discover Bumrungrad International Hospital's Accolades. Elevate your health journey with excellence at our hospital. Explore now! #BumrungradHospital",
  alternates: {
    canonical: 'https://discoverinternationalmedicalservice.com/about-accreditation',
  },
  charset: 'utf-8',
};

import React from "react";
import Link from "next/link";
import networkimg from "@/public/assets/about_bumrungrad/Bumrungrad_Hospital_Layout-Newsweek_Social-Media_EN.png";
import awardimg from "@/public/assets/about_bumrungrad/Bumrungrad _Hospital_Bumrungrad_Award.png";
import sbestspeaciligedimg from "@/public/assets/about_bumrungrad/Accreditation/Modern Fashion & Clothing Online Shop Showroom Facebook Cover (4).png";
import marketingAwardimg from "@/public/assets/about_bumrungrad/Accreditation/Green Work From Home Your Story.png";
import thaiAwardimg from "@/public/assets/about_bumrungrad/Accreditation/Thailand MIKE Award .png";
import influencerAwardimg from "@/public/assets/about_bumrungrad/Accreditation/Green Work From Home Your Story (1).png";
import YoutubeAwardimg from "@/public/assets/about_bumrungrad/Bumrungrad  Hospital_YouTube-Works-Award-2021_1.png";
import YoutubeWorkAwardimg from "@/public/assets/about_bumrungrad/Bumrungrad  Hospital_YouTube-Works-Award-2021_2.png";
import Award2img from "@/public/assets/about_bumrungrad/Accreditation/Turquoise and Health Icons Medical Trifold Brochure (1).png";
import digitalAward2img from "@/public/assets/about_bumrungrad/Accreditation/Black and Grey Bold Simple Vintage Photo Studio Facebook Event Cover (4).png";
import zocialimg from "@/public/assets/about_bumrungrad/Accreditation/zoocial.png";
import Award1imga from "@/public/assets/about_bumrungrad/Accreditation/Turquoise and Health Icons Medical Trifold Brochure (1).png";
import annotation1imga from "@/public/assets/about_bumrungrad/Bumrungrad  Hospital_Annotation-2022-03-01-110437.jpg";
import annotation21imga from "@/public/assets/about_bumrungrad/Accreditation/readersChoice.png";
import globalbandimga from "@/public/assets/about_bumrungrad/Accreditation/globalAward.png";
import awardglobalbandimga from "@/public/assets/about_bumrungrad/Accreditation/TheEconomics.png";
import globalbusinessaward1imga from "@/public/assets/about_bumrungrad/global-business-awards-capture.jpg";
import globalbusinessaward2imga from "@/public/assets/about_bumrungrad/Accreditation/globalEconomics.png";
import microwSoftaward2imga from "@/public/assets/about_bumrungrad/Accreditation/Pink colorful Kids Award Certificate (1).png";
import thaiCorporateimga from "@/public/assets/about_bumrungrad/Accreditation/Colorful Kids Camp Certificate.png";
import Image from "next/image";
import { getTranslations } from "next-intl/server";


const AccreditationPage = async () => {
  const t = await getTranslations("aboutAccreditation");
  const marketingItems = t.raw("marketingItems");
  const apacItems = t.raw("apacItems");
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
          {t("introTextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("introTextAfter")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("newsweekHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify">
          {t("newsweekTextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("newsweekTextAfter")}
        </p>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={networkimg}
            alt="Bumrungrad International Hospital"
            className="w-[70%] mx-auto"
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("jciHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={awardimg}
            alt="Bumrungrad International Hospital"
          />
        </div>
        <p className="text-[16px] py-8 text-blue font-semibold">
          {t("jciSubheading")}
        </p>
        <p className="text-justify mt-3">
          {t("jciText")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("jciTextAfter")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("ghaHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-3">
          {t("ghaTextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("ghaTextAfter")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("ahaHeading")}
          </p>
          <hr />
        </div>
        <p className="text-[16px] py-2 text-blue font-semibold">
          {t("ahaSubheading")}
        </p>
        <p className="text-justify mt-3">
          {t("ahaText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("smartHospitalHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={sbestspeaciligedimg}
            alt="Bumrungrad International Hospital"
            className="w-[70%] mx-auto"
          />
        </div>
        <p className="text-justify mt-5">
          {t("smartHospitalTextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("smartHospitalTextAfter")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("marketingHeading1")}
            <Link
              className="font-semibold text-blue underline"
              href="https://discoverinternationalmedicalservice.com/"
            >
              {t("linkText")}
            </Link>
            {t("marketingHeading2")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={marketingAwardimg}
            alt="Bumrungrad International Hospital"
            className="w-[400px] h-[500px] mx-auto"
          />
        </div>
        <ol className="pl-6 ml-4 mt-3">
          {marketingItems.map((item, i) => (
            <li key={i} className="list-decimal mt-2">{item}</li>
          ))}
        </ol>
        <p className="text-justify mt-5">
          {t("marketingText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("mikeHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={thaiAwardimg}
            alt="Bumrungrad International Hospital"
            className="w-[150px] h-[250px] mx-auto"
          />
        </div>
        <p className="text-justify mt-5">
          {t("mikeTextAfter")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("kenticoHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("kenticoTextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("kenticoTextAfter")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("influencerHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={influencerAwardimg}
            alt="Bumrungrad International Hospital"
            className="w-[350px] h-[450px] mx-auto"
          />
        </div>
        <p className="text-justify mt-5">
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("influencerTextAfter")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("youtubeHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("youtubeText")}
        </p>
        <div className="flex mt-10 justify-between">
          <div>
            <Link
              href="https://www.youtube.com/watch?v=cQpyqxejjqY"
              target="_blank"
            >
              <Image
                height={500}
                width={500}
                src={YoutubeAwardimg}
                alt="Bumrungrad International Hospital"
              />
            </Link>
          </div>
          <div>
            <Image
              height={500}
              width={500}
              src={YoutubeWorkAwardimg}
              alt="Bumrungrad International Hospital"
            />
          </div>
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("otbHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("otbText")}
        </p>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={Award2img}
            alt="Bumrungrad International Hospital"
            className="w-[650px] h-[450px] mx-auto"
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("digitalTransformHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={digitalAward2img}
            alt="Bumrungrad International Hospital"
            className="w-[650px] h-[450px] mx-auto"
          />
        </div>
        <p className="text-justify mt-5">
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("digitalTransformTextAfter")}
        </p>
        <p className="text-justify mt-5">
          {t("digitalTransformText2")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("ceoHeadingBefore")}
            <Link
              className="font-semibold text-blue underline"
              href="https://discoverinternationalmedicalservice.com/"
            >
              {t("linkText")}
            </Link>
            {t("ceoHeadingAfter")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("ceoText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("employerBrandHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("employerBrandText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("socialAwardsHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("socialAwardsText")}
        </p>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={zocialimg}
            alt="Bumrungrad International Hospital"
            className="w-[650px] h-[450px] mx-auto"
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("twitterHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("twitterText")}
        </p>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={Award1imga}
            alt="Bumrungrad International Hospital"
            className="w-[650px] h-[450px] mx-auto"
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("bangkokPostHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("bangkokPostTextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("bangkokPostTextAfter")}
        </p>
        <div className="flex mt-10 justify-evenly items-center">
          <div>
            <Image
              height={500}
              width={500}
              src={annotation21imga}
              className="w-[400px]"
              alt="Bumrungrad International Hospital"
            />
          </div>
          <div className="ml-4">
            <Image
              height={500}
              width={500}
              src={annotation1imga}
              className="w-[600px]"
              alt="Bumrungrad International Hospital"
            />
          </div>
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("gbaHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          <span className="text-blue font-semibold">
            {t("gbaTextHighlight")}
          </span>
          {t("gbaText1")}
          <br />
          {t("gbaText2")}
        </p>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={globalbandimga}
            alt="Bumrungrad International Hospital"
            className="w-[350px] h-[500px] mx-auto"
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("globalEconomicsHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("globalEconomicsTextBefore")}
          <Link
            className="font-semibold text-blue underline"
            href="https://discoverinternationalmedicalservice.com/"
          >
            {t("linkText")}
          </Link>
          {t("globalEconomicsTextAfter")}
        </p>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={awardglobalbandimga}
            alt="Bumrungrad International Hospital"
            className="w-[550px] h-[200px] mx-auto"
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("globalBusinessHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("globalBusinessText")}
        </p>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={globalbusinessaward2imga}
            alt="Bumrungrad International Hospital"
            className="w-[350px] h-[400px] mx-auto"
          />
          <Image
            height={500}
            width={500}
            src={globalbusinessaward1imga}
            alt="Bumrungrad International Hospital"
            className="w-[550px] h-[200px] mx-auto"
          />
        </div>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("apacHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={microwSoftaward2imga}
            alt="Bumrungrad International Hospital"
            className="w-[650px] h-[400px] mx-auto"
          />
        </div>
        <ol className="mt-6 ml-8 list-decimal">
          {apacItems.map((item, i) => (
            <li key={i} className=" mt-2">{item}</li>
          ))}
        </ol>
        <p className="text-justify mt-5">
          {t("apacText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("corporateExcellenceHeading")}
          </p>
          <hr />
        </div>
        <div className="mt-10">
          <Image
            height={500}
            width={500}
            src={thaiCorporateimga}
            alt="Bumrungrad International Hospital"
            className="w-[400px] h-[300px] mx-auto"
          />
        </div>
        <p className="text-justify mt-5">
          {t("corporateExcellenceText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("brandageHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5">
          {t("brandageText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("brandage2Heading")}
          </p>
          <hr />
        </div>
        <p className="font-semibold text-blue">
          {t("cssdTitle")}
        </p>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("cssdSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("cssdText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("capHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("capSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("capText")}
        </p>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("healthTourismSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("healthTourismText")}
        </p>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("orgExcellenceSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("orgExcellenceText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("sidcerHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("sidcerSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("sidcerText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("westgardHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("westgardSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("westgardText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("amchamHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("amchamSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("amchamText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("csrClubHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("csrClubSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("csrClubText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("daisyHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("daisySubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("daisyText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("bestEmployerHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("bestEmployerSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("bestEmployerText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("tourismAwardsHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("tourismAwardsSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("tourismAwardsText")}
        </p>
        <div className="my-10">
          <hr />
          <p className="text-[16px] py-3 text-blue font-medium">
            {t("tqcHeading")}
          </p>
          <hr />
        </div>
        <p className="text-justify mt-5 text-blue font-semibold">
          {t("tqcSubheading")}
        </p>
        <p className="text-justify mt-2">
          {t("tqcText")}
        </p>
      </div>
    </section>
  );
};

export default AccreditationPage;
