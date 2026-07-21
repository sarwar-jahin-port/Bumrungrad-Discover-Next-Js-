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

const DEFAULT_SOCIAL = {
  footer_facebook_url: "https://www.facebook.com/discoverbangladeshbd",
  footer_youtube_url: "https://www.youtube.com/@discoverbangladesh",
  footer_whatsapp_url: "https://wa.me/+66948283651",
};

const serives = [
  {
    name: "Book Appointment",
    link: "/our-services/appointment",
  },
  {
    name: "Health Screening",
    link: "/check-up",
  },
  {
    name: "Find a Doctor",
    link: "/doctors",
  },
  {
    name: "Clinic & Centers",
    link: "/clinic-centers",
  },
];
const corporates = [
  { name: "About Bumrungrad", link: "/about-bumrungrad" },
  { name: "Send Inquiry", link: "/send-query" },
  { name: "Contact", link: "/contact-us" },
  { name: "Dhaka Offices", link: "/dhaka-offices" },
];
const blognews = [
  { name: 'Blogs', link: '/blogs' },
  { name: 'News', link: '/news' },
  // { name: 'Treatments', link: '/treatments' },
]

export default function BottomBar() {
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
          <p className='text-center mb-2.5 font-semibold'>Disclaimer</p>
          <p className='text-center'>
            DIMS is a Medical Tourism Facilitator and does not provide direct
            treatment advice. We connect you with top-quality, licensed
            hospitals. Any treatment plans come solely from licensed doctors at
            our partner hospitals. DIMS holds no liability for advice given by
            third-party licensed doctors or hospitals. We strongly recommend
            consulting your local doctor to discuss treatment options provided
            through our platform.
          </p>
        </div>
      </div>
      <section className='bg-cream pt-10 pb-5 text-blue px-5'>
        <div className='md:container md:mx-auto mx-5 grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div>
            <p className='font-semibold'>Services</p>
            <ul className='text-[16px] flex flex-col gap-2 mt-2 ml-5 list-disc'>
              {serives.map((s, i) => (
                <li key={i}>
                  <Link href={s.link} className='hover:underline focus:underline focus:outline-none'>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='font-semibold'>Blog & News</p>
            <ul className='text-[16px] flex flex-col gap-2 mt-2 ml-5 list-disc'>
              {blognews.map((s, i) => (
                <li key={i}>
                  <Link href={s.link} className='hover:underline focus:underline focus:outline-none'>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className='font-semibold'>Corporates</p>
            <ul className='text-[16px] flex flex-col gap-2 mt-2 ml-5 list-disc'>
              {corporates.map((s, i) => (
                <li key={i}>
                  <Link href={s.link} className='hover:underline focus:underline focus:outline-none'>{s.name}</Link>
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
            {new Date().getFullYear()} Discover Bangladesh Co. Ltd. All Rights Reserved.
          </p>
          <p className='text-center flex gap-2 items-center justify-center font-semibold'>
            <VerifiedIcon fontSize='small' />
            Official Authorized Referral Office of Bumrungrad International Hospital
          </p>
          <div className='flex gap-4 items-center justify-center md:justify-end'>
            <Link href='/terms-and-conditions' className='hover:underline focus:underline focus:outline-none'>Terms & Conditions</Link>
            <Link href='/privacy-policy' className='hover:underline focus:underline focus:outline-none'>Privacy Policy</Link>
          </div>
        </div>
      </section>
    </footer>
  )
}
