"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CopyrightIcon from "@mui/icons-material/Copyright";
import VerifiedIcon from "@mui/icons-material/Verified";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import logo from "@/public/assets/Bumrungrad  Hospital_nav_logo.png";
import { useTranslations } from "next-intl";

const DEFAULT_SOCIAL = {
  footer_facebook_url: "https://www.facebook.com/discoverbangladeshbd",
  footer_youtube_url: "https://www.youtube.com/@discoverbangladesh",
  footer_whatsapp_url: "https://wa.me/+66948283651",
};

// Link targets stay in code; labels resolve from the footer namespace by key.
const serives = [
  { key: "bookAppointment", link: "/our-services/appointment" },
  { key: "healthScreening", link: "/check-up" },
  { key: "findDoctor", link: "/doctors" },
  { key: "clinicCenters", link: "/clinic-centers" },
];
const corporates = [
  { key: "aboutBumrungrad", link: "/about-bumrungrad" },
  { key: "sendInquiry", link: "/send-query" },
  { key: "contact", link: "/contact-us" },
  { key: "dhakaOffices", link: "/dhaka-offices" },
];
const blognews = [
  { key: "blogs", link: "/blogs" },
  { key: "news", link: "/news" },
  // { key: 'treatments', link: '/treatments' },
];

export default function BottomBar() {
  const t = useTranslations("footer");
  const [settings, setSettings] = useState(DEFAULT_SOCIAL);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setSettings((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(data.data).filter(([, value]) => value)
            ),
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer>
      <div className='px-4 md:px-28 my-8'>
        <div className='py-6 px-2.5 bg-cream rounded'>
          {' '}
          <p className='text-center mb-2.5 font-semibold'>{t("disclaimerTitle")}</p>
          <p className='text-center'>
            {t("disclaimerText")}
          </p>
        </div>
      </div>
      <section className='bg-cream pt-10 pb-5 text-blue px-5'>
        <div className='md:container md:mx-auto mx-5 grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div>
            <p className='font-semibold'>{t("servicesTitle")}</p>
            <ul className='text-[16px] flex flex-col gap-2 mt-2 ml-5 list-disc'>
              {serives.map((s, i) => (
                <li key={i}>
                  <Link href={s.link} className='hover:underline focus:underline focus:outline-none'>{t(s.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='font-semibold'>{t("blogNewsTitle")}</p>
            <ul className='text-[16px] flex flex-col gap-2 mt-2 ml-5 list-disc'>
              {blognews.map((s, i) => (
                <li key={i}>
                  <Link href={s.link} className='hover:underline focus:underline focus:outline-none'>{t(s.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='font-semibold'>{t("corporatesTitle")}</p>
            <ul className='text-[16px] flex flex-col gap-2 mt-2 ml-5 list-disc'>
              {corporates.map((s, i) => (
                <li key={i}>
                  <Link href={s.link} className='hover:underline focus:underline focus:outline-none'>{t(s.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-4 col-span-2 md:col-span-1 md:items-end'>
            <Image
              src={logo}
              alt='Bumrungrad International Hospital'
              className='w-[150px]'
            />
            {settings.footer_address && (
              <p className='text-sm md:text-right'>{settings.footer_address}</p>
            )}
            <div className='flex gap-4 items-center'>
              {settings.footer_facebook_url && (
                <a
                  href={settings.footer_facebook_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Facebook'
                  className='focus:outline-none focus:ring-2 focus:ring-blue rounded'
                >
                  <FacebookIcon
                    sx={{ fontSize: '24px' }}
                    className='cursor-pointer text-blue hover:scale-110 duration-300 ease-linear'
                  />
                </a>
              )}
              {settings.footer_youtube_url && (
                <a
                  href={settings.footer_youtube_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='YouTube'
                  className='focus:outline-none focus:ring-2 focus:ring-blue rounded'
                >
                  <YouTubeIcon
                    sx={{ fontSize: '24px' }}
                    className='cursor-pointer text-blue hover:scale-110 duration-300 ease-linear'
                  />
                </a>
              )}
              {settings.footer_whatsapp_url && (
                <a
                  href={settings.footer_whatsapp_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='WhatsApp'
                  className='focus:outline-none focus:ring-2 focus:ring-blue rounded'
                >
                  <WhatsAppIcon
                    sx={{ fontSize: '24px' }}
                    className='cursor-pointer text-blue hover:scale-110 duration-300 ease-linear'
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className='pt-5 pb-36 md:pb-20 bg-blue text-white'>
        <div className='md:container md:mx-auto mx-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center'>
          <p className='text-center md:text-left flex gap-2 items-center justify-center md:justify-start'>
            <CopyrightIcon fontSize='small' />
            {t("copyright", { year: String(new Date().getFullYear()) })}
          </p>
          <p className='text-center flex gap-2 items-center justify-center font-semibold'>
            <VerifiedIcon fontSize='small' />
            {t("authorizedOffice")}
          </p>
          <div className='flex gap-4 items-center justify-center md:justify-end'>
            <Link href='/terms-and-conditions' className='hover:underline focus:underline focus:outline-none'>{t("terms")}</Link>
            <Link href='/privacy-policy' className='hover:underline focus:underline focus:outline-none'>{t("privacy")}</Link>
          </div>
        </div>
      </section>
    </footer>
  )
}
