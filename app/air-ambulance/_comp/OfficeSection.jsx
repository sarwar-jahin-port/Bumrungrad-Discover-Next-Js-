"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsIcon from "@mui/icons-material/Directions";
import officeImg from "@/public/assets/A-Commitment-to-Patient-Care-scaled.webp";

const HubCard = ({ hub, t }) => {
  const fullAddress = [hub.office_name, hub.building, hub.floor_map, hub.address]
    .filter(Boolean)
    .join(", ");

  return (
  <div className="flex flex-col gap-4 rounded-xl border border-ash/30 shadow-lg overflow-hidden bg-white">
    <div className="bg-blue px-6 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
        {t("emergencyHub")}
      </p>
      <h3 className="text-xl md:text-2xl font-bold text-white">
        {t("districtOperationLine", { city: hub.city })}
      </h3>
    </div>

    <div className="flex flex-col gap-3 text-sm md:text-base px-6 pb-6">
      {(hub.office_name || hub.building || hub.floor_map || hub.address) && (
        <div className="flex items-start gap-3">
          <PlaceIcon className="text-blue mt-0.5" fontSize="small" />
          <p>
            {hub.office_name && <span className="font-semibold">{hub.office_name}. </span>}
            {[hub.building, hub.floor_map, hub.address].filter(Boolean).join(", ")}
          </p>
        </div>
      )}

      {(hub.phone1 || hub.phone2) && (
        <div className="flex items-start gap-3">
          <LocalPhoneIcon className="text-blue mt-0.5" fontSize="small" />
          <p className="flex flex-col">
            {hub.phone1 && (
              <a href={`tel:${hub.phone1}`} className="hover:underline">
                {hub.phone1}
              </a>
            )}
            {hub.phone2 && (
              <a href={`tel:${hub.phone2}`} className="hover:underline">
                {hub.phone2}
              </a>
            )}
          </p>
        </div>
      )}

      {hub.whatsapp_hotline && (
        <div className="flex items-start gap-3">
          <WhatsAppIcon className="text-green mt-0.5" fontSize="small" />
          <a
            href={`https://wa.me/${hub.whatsapp_hotline.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {hub.whatsapp_hotline}
          </a>
        </div>
      )}

      {hub.operational_hours && (
        <div className="flex items-start gap-3">
          <AccessTimeIcon className="text-blue mt-0.5" fontSize="small" />
          <p>{hub.operational_hours}</p>
        </div>
      )}
    </div>
  </div>
  );
};

const OfficeSection = ({ hubs, loader }) => {
  const t = useTranslations("airAmbulance.landing");

  return (
    <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <Image
            src={officeImg}
            alt={t("office.heading")}
            className="rounded-xl w-full aspect-[4/3] object-cover object-center mb-6"
          />
          <h2 className="text-xl md:text-2xl font-bold text-blue mb-4">
            {t("office.heading")}
          </h2>
          <p className="text-sm md:text-base text-black/70 leading-relaxed">
            {t("office.text")}
          </p>
          <a
            href="#request-transport"
            className="btn_primary bg-gold text-white border-none !w-auto !whitespace-normal"
          >
            {t("office.ctaLabel")}
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue mb-4">
            {t("hubsHeading")}
          </h3>
          {loader ? (
            <div className="grid gap-6">
              {[0, 1].map((i) => (
                <div key={i} className="h-52 rounded-xl bg-cream animate-pulse" />
              ))}
            </div>
          ) : hubs.length === 0 ? (
            <p className="text-sm text-black/60">{t("hubsEmpty")}</p>
          ) : (
            <div className="flex flex-col gap-6">
              {hubs.map((hub) => (
                <HubCard key={hub.id} hub={hub} t={t} />
              ))}
              <div className="rounded-xl border border-ash/30 bg-cream p-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2 text-blue font-semibold text-sm">
                  <AccessTimeIcon fontSize="small" />
                  {t("office.badgeAvailability")}
                </div>
                <div className="flex items-center gap-2 text-blue font-semibold text-sm">
                  <DirectionsIcon fontSize="small" />
                  {t("office.badgeCoordination")}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeSection;
