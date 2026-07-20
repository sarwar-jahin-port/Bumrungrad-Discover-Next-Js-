"use client";

import React, { useEffect, useState } from "react";
import AirAmbulanceForm from "@/components/services/airAmbulance";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";

const HUB_CITIES = ["Dhaka", "Chattogram"];

const HubCard = ({ city, hub }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-ash/30 shadow-lg p-6 bg-white">
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
        Emergency Hub
      </p>
      <h3 className="text-xl md:text-2xl font-bold text-blue">
        {city} District Operation Line
      </h3>
    </div>

    {hub ? (
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
              title={`${city} hub map`}
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
    ) : (
      <p className="text-sm text-black/60">
        Hub details for {city} are being finalized and will appear here shortly.
      </p>
    )}
  </div>
);

const AirAmbulanceLanding = () => {
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
            24/7 Emergency Transport
          </p>
          <h1 className="text-2xl md:text-4xl font-bold mt-2">
            Air Ambulance Emergency Service
          </h1>
          <p className="mt-4 text-sm md:text-base text-white/90">
            Fast, coordinated air ambulance transport to Bumrungrad
            International Hospital, dispatched through our dedicated Dhaka
            and Chattogram operation hubs.
          </p>
        </div>
      </div>

      <div className="mx-5 md:container md:mx-auto py-10 md:py-16">
        <h2 className="text-xl md:text-2xl font-bold text-blue mb-6">
          Our Emergency Deployment Hubs
        </h2>

        {loader ? (
          <div className="grid md:grid-cols-2 gap-6">
            {HUB_CITIES.map((city) => (
              <div key={city} className="h-64 rounded-xl bg-cream animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {HUB_CITIES.map((city) => (
              <HubCard key={city} city={city} hub={hubs.find((h) => h.city === city)} />
            ))}
          </div>
        )}

        <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-blue">
              Request Emergency Transport
            </h2>
            <p className="mt-3 text-sm md:text-base text-black/70">
              Fill out the form below with your travel details and a member
              of our emergency coordination team will reach out to you
              shortly to confirm your air ambulance transport.
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
