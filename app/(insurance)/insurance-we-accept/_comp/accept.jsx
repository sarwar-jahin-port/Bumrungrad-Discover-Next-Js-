"use client";
import React, { useEffect, useState } from "react";
import packageimg from "@/public/assets/insurance/Bumrungrad  Hospital_Packages-Promotion1.png";
import weacceptimg from "@/public/assets/insurance/Bumrungrad  Hospital_We-Accept-Active2.png";
import goodvibesimg from "@/public/assets/insurance/Bumrungrad  Hospital_Good-Vibes-2023.png";

import Image from "next/image";
import { useTranslations } from "next-intl";

const WeAccept = () => {
  const t = useTranslations("insurance.weAccept");
  const [providers, setProviders] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/insurance-providers")
      .then((res) => res.json())
      .then((data) => {
        setProviders(data.status === 200 ? data.data : []);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, []);

  const grouped = providers.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});
  const categories = Object.entries(grouped);

  return (
    <section className="mx-5 md:container md:mx-auto">
      <div className="h-[20vh] md:h-[30vh] lg:h-[50vh] insurance-back relative flex justify-center items-center">
        <div className="absolute top-0 h-full w-full bg-black/60"></div>
        <h1 className="uppercase text-xl text-center md:text-2xl lg:text-3xl font-bold text-white z-10">
          {t("title")}
        </h1>
      </div>

      <div className="mx-10 my-10">
        {loader ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-12 bg-[#DFE2F4]/90 rounded"></div>
            <div className="h-12 bg-[#DFE2F4]/90 rounded"></div>
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-black/60">
            {t("emptyMessage")}
          </p>
        ) : (
          categories.map(([category, items], i) => (
            <OneWeAccept key={category} i={i} category={category} items={items} />
          ))
        )}
      </div>
      <div className=" my-10 bg-cream">
        <div className="flex justify-center flex-wrap p-10">
          <Image
            height={200}
            width={200}
            src={packageimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
          <Image
            height={200}
            width={200}
            src={weacceptimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
          <Image
            height={200}
            width={200}
            src={goodvibesimg}
            alt="Bumrungrad International Hospital"
            srcset=""
          />
        </div>
      </div>
    </section>
  );
};

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="#ffffff"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const OneWeAccept = ({ category, items, i }) => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="mt-[1px]">
      <>
        <Accordion open={open === i} icon={<Icon id={i} open={open} />}>
          <div>
            {" "}
            <AccordionHeader
              className="bg-blue p-3"
              onClick={() => handleOpen(i)}
            >
              <p className="text-white text-sm">{category}</p>
            </AccordionHeader>
          </div>

          <AccordionBody>
            {items?.map((provider) => (
              <div key={provider.id}>
                <a
                  href={provider.reference_url || undefined}
                  target={provider.reference_url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex justify-evenly items-center h-[150px] ${
                    provider.reference_url ? "hover:bg-cream/50" : ""
                  }`}
                >
                  <div className="">
                    <p className="text-blue font-semibold text-sm">
                      {provider.name}
                    </p>
                  </div>
                  {provider.logo && (
                    <div className="">
                      <Image
                        height={200}
                        width={200}
                        src={provider.logo}
                        alt={provider.name}
                        className="h-[120px] object-contain"
                        srcset=""
                      />
                    </div>
                  )}
                </a>

                <hr className="w-[1000px] mx-auto" />
              </div>
            ))}
          </AccordionBody>
        </Accordion>
      </>
    </div>
  );
};

export default WeAccept;
