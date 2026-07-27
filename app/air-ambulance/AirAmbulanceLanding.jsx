"use client";

import React, { useEffect, useState } from "react";
import AirAmbulanceForm from "@/components/services/airAmbulance";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import { useTranslations } from "next-intl";

const HubCard = ({ hub, t }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-ash/30 shadow-lg p-6 bg-white">
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
        {t("emergencyHub")}
      </p>
      <h3 className="text-xl md:text-2xl font-bold text-blue">
        {t("districtOperationLine", { city: hub.city })}
      </h3>
    </div>

    <div className="flex flex-col gap-3 text-sm md:text-base">
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

      {hub.map_embed_url && (
        <div className="mt-2 h-[220px] rounded-lg overflow-hidden">
          <iframe
            src={hub.map_embed_url}
            title={`${hub.city} hub map`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  </div>
);

const AirAmbulanceLanding = () => {
  const t = useTranslations("airAmbulance.landing");
  const [hubs, setHubs] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/air/ambulance/hubs")
      .then((res) => res.json())
      .then((data) => {
        setHubs(data.status === 200 ? data.data : []);
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, []);

  return (
    <div>
      <div className="py-14 md:py-20 bg-blue relative flex justify-center items-center text-center px-5">
        <div className="text-white z-10 max-w-3xl">
          <p className="text-gold font-semibold uppercase tracking-wide text-sm">
            {t("eyebrow")}
          </p>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">
            {t("heading")}
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/90">
            {t("intro")}
          </p>
        </div>
      </div>

      <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-blue mb-6">
          {t("hubsHeading")}
        </h2>

        {loader ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="h-64 rounded-xl bg-cream animate-pulse" />
            ))}
          </div>
        ) : hubs.length === 0 ? (
          <p className="text-sm text-black/60">{t("hubsEmpty")}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {hubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} t={t} />
            ))}
          </div>
        )}

        <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-blue">
              {t("requestHeading")}
            </h2>
            <p className="mt-3 text-sm md:text-base text-black/70">
              {t("requestText")}
            </p>
          </div>
          <div className="rounded-xl border border-ash/30 shadow-lg p-6 bg-white">
            <AirAmbulanceForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirAmbulanceLanding;
