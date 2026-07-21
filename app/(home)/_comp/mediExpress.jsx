import Image from "next/image";
import React from "react";
import img from "@/public/assets/medi-express-02.jpg";
import { getTranslations } from "next-intl/server";

export default async function MediExpress() {
  const t = await getTranslations("home.mediExpress");
  return (
    <div className="p-5 md:p-10 my-10 md:my-20 md:container md:mx-auto grid grid-cols-1  xl:grid-cols-2 lg:items-center gap-16">
      <div className="flex flex-col gap-2.5 md:gap-5 ">
        <h2 className="text-xl md:text-2xl font-semibold text-blue">
          {" "}
          {t("heading")}
        </h2>

        <p className="text-justify">{t("p1")}</p>
        <p className="text-justify">{t("p2")}</p>
        <p className="text-justify">
          {t("p3Prefix")}
          <strong>{t("p3Countries")}</strong>{" "}
          {t("p3Suffix")}
        </p>
        <p className="text-justify">{t("p4")}</p>
      </div>
      <div className="w-full">
        <Image
          height={400}
          width={1000}
          className="rounded-md object-cover w-full h-full"
          src={img}
          effect="blur"
          alt="Bumrungrad International Hospital"
        />
      </div>
    </div>
  );
}
