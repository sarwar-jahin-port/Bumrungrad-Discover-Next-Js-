"use client";

import React from "react";
import { useTranslations } from "next-intl";
import PlaceIcon from "@mui/icons-material/Place";

const AreasWeServe = ({ hubs }) => {
  const t = useTranslations("airAmbulance.landing.areasWeServe");

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-blue mb-4">
        {t("heading")}
      </h2>
      <p className="text-sm md:text-base text-black/70 leading-relaxed">
        {t("text")}
      </p>
      {hubs?.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-6">
          {hubs.map((hub) => (
            <span
              key={hub.id}
              className="flex items-center gap-2 bg-cream text-blue font-semibold text-sm px-4 py-2 rounded-full"
            >
              <PlaceIcon fontSize="small" />
              {hub.city}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreasWeServe;
