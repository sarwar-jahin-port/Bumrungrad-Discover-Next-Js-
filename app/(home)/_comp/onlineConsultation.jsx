import React from "react";
import image from "@/public/assets/online-treatment-02.jpg";
import Image from "next/image";
import { CheckCircle } from "@mui/icons-material";
import { getTranslations } from "next-intl/server";

export default async function OnlineConsultation() {
  const t = await getTranslations("home.onlineConsultation");
  const data = t.raw("items");

  return (
    <div className="mx-5 my-10 md:my-20 lg:my-24 xl:container xl:mx-auto grid grid-cols-1 lg:grid-cols-2">
    <div className="w-full max-h-[590px]">
      <Image
        height={400}
        width={1000}
        src={image}
        className="rounded-md object-cover w-full h-full"
        alt="Bumrungrad International Hospital"
      />
    </div>
    <div className="flex flex-col gap-5 md:gap-10 w-full p-6 md:p-8">
      <h5 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue">
        {t("heading")}
      </h5>
      <p className="text-sm md:text-base font-bold">
        {t("subtitle")}
      </p>
      <div className="grid gap-2.5 md:gap-5 md:grid-cols-2">
        {data.map((d, i) => (
          <div key={i}>
            <p className="flex items-center gap-2 text-sm md:text-base">
              <CheckCircle className="text-green" />
              <span className="font-semibold text-blue">{d.title}:</span>{" "}
            </p>
            <p className="mt-2.5 ml-8 text-sm md:text-base">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
}
