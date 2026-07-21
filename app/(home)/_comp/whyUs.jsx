import Image from "next/image";
import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdVerified } from "react-icons/md";

const REASONS = [
  {
    title: "Global Healthcare Excellence",
    desc: "Exceptional medical services trusted by patients from over 190 countries.",
  },
  {
    title: "Over 40 Specialized Departments & Centers",
    desc: "Access to specialists across cardiology, oncology, neurology, orthopedics, and more.",
  },
  {
    title: "Advanced Medical Technology & Experienced Doctors",
    desc: "Robotic surgery, advanced imaging, and AI-assisted diagnostics, backed by 1,200+ internationally trained doctors.",
  },
  {
    title: "JCI Accreditation",
    desc: "The gold standard in global healthcare accreditation, ensuring rigorous patient safety and care quality.",
  },
  {
    title: "International Patient Support",
    desc: "Personalized assistance with travel, visas, accommodation, and multilingual interpreters.",
  },
  {
    title: "World-Class Care",
    desc: "Expert medical teams and cutting-edge technology within a state-of-the-art facility.",
  },
];

export default function WhyUs() {
  return (
    <div className="mx-5 my-10 md:my-20 md:container md:mx-auto">
      <h5 className="text-center text-2xl md:text-4xl font-semibold text-blue mb-10">
        Why Choose Discover Bangladesh
      </h5>
      <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
        <div className="lg:w-1/2 w-full">
          <Image
            height={600}
            width={600}
            src="https://i.ibb.co/v1jKX0V/Bumrungrad-hospital-Hero.png"
            alt="Bumrungrad International Hospital"
            className="rounded-xl w-full"
          />
        </div>
        <div className="lg:w-1/2 w-full flex flex-col gap-5">
          <div className="flex items-start gap-2.5 bg-cream rounded-lg p-4">
            <MdVerified className="text-blue text-2xl shrink-0 mt-0.5" />
            <p className="font-semibold text-blue">
              Authorized Bumrungrad International Hospital Referral Office |
              Discover Bangladesh CO. LTD.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {REASONS.map((reason) => (
              <li key={reason.title} className="flex items-start gap-2.5">
                <IoMdCheckmarkCircle className="text-green text-xl mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">{reason.title}</p>
                  <p className="text-sm text-black/70">{reason.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
