'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HealingIcon from "@mui/icons-material/Healing";
import BiotechIcon from "@mui/icons-material/Biotech";
import MapIcon from "@mui/icons-material/Map";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ClinicCenterSkeleton } from "@/components/ui/cardload";
import UnifiedInboundForm from "@/components/shared/UnifiedInboundForm";
import { useTranslations } from "next-intl";

const SectionCard = ({ icon: Icon, eyebrow, title, children, id }) => (
  <section
    id={id}
    className="bg-white border border-ash/20 rounded-xl shadow-sm p-6 md:p-8"
  >
    <div className="flex items-center gap-3 mb-5">
      <span className="shrink-0 w-10 h-10 rounded-full bg-blue/10 text-blue flex items-center justify-center">
        <Icon fontSize="small" />
      </span>
      <div>
        <p className="text-xs font-semibold tracking-wide uppercase text-gold">
          {eyebrow}
        </p>
        <h2 className="text-lg md:text-xl font-bold text-blue">{title}</h2>
      </div>
    </div>
    {children}
  </section>
);

const TagList = ({ items, field }) =>
  items?.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {items.map((c, i) => (
        <span
          key={i}
          className="inline-block rounded-full border border-blue/20 bg-blue/5 text-blue text-sm px-3.5 py-1.5"
        >
          {c?.[field]}
        </span>
      ))}
    </div>
  ) : null;

const EmptyNote = ({ children }) => (
  <p className="text-black/40 text-sm italic">{children}</p>
);

export default function SingleCenter({ params }) {
  const t = useTranslations("clinicCenters.singleCenter");
  const [loader, setLoader] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [center, setCenter] = useState({});

  useEffect(() => {
    setLoader(true);
    fetch(`http://127.0.0.1:8000/api/get/centers/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.response?.status === 200) {
          setCenter(data.response.data);
        } else {
          setNotFound(true);
        }
        setLoader(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoader(false);
      });
  }, [params.slug]);

  if (loader) {
    return (
      <div className="p-5 my-5 md:container md:mx-auto">
        <ClinicCenterSkeleton />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-5 my-16 md:container md:mx-auto text-center">
        <h1 className="text-xl md:text-2xl font-bold text-blue">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-2.5 text-black/50">
          {t("notFoundText")}
        </p>
      </div>
    );
  }

  const hasNarrative =
    center?.description || center?.content || center?.informations?.length;

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <div className="bg-cream">
        <div className="p-5 py-10 md:py-14 md:container md:mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">
          <div className="relative w-full md:w-[380px] aspect-[4/3] shrink-0 rounded-xl overflow-hidden shadow-md">
            {center?.cover_photo ? (
              <Image
                fill
                src={center.cover_photo}
                className="object-cover"
                alt={center?.name || "Bumrungrad International Hospital"}
                priority
              />
            ) : (
              <div className="w-full h-full bg-white flex items-center justify-center text-black/30 text-sm">
                {t("noImage")}
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-blue leading-tight">
              {center?.name}
            </h1>
            {center?.location && (
              <p className="flex items-start gap-2 text-black/70">
                <LocationOnIcon fontSize="small" className="mt-0.5 shrink-0" />
                {center.location}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {center?.operational_hours && (
                <span className="inline-flex items-center gap-1.5 bg-white text-black/70 text-sm rounded-full px-3.5 py-1.5 shadow-sm">
                  <AccessTimeIcon fontSize="small" className="text-gold" />
                  {t("hoursListed")}
                </span>
              )}
              {center?.whatsapp_hotline && (
                <span className="inline-flex items-center gap-1.5 bg-white text-black/70 text-sm rounded-full px-3.5 py-1.5 shadow-sm">
                  <WhatsAppIcon fontSize="small" className="text-green" />
                  {t("directHotline")}
                </span>
              )}
            </div>
            <a
              href="#appointment"
              className="mt-3 inline-flex items-center justify-center gap-2 w-fit bg-blue text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <CalendarMonthIcon fontSize="small" />
              {t("requestAppointment")}
            </a>
          </div>
        </div>
      </div>

      <div className="p-5 py-10 md:py-14 md:container md:mx-auto flex flex-col gap-6 md:gap-8">
        {/* Stage 1: Narrative Summary */}
        <SectionCard icon={InfoOutlinedIcon} eyebrow={t("overviewEyebrow")} title={t("aboutTitle")}>
          {hasNarrative ? (
            <>
              {center?.description && (
                <p className="text-sm lg:text-base mb-4 text-black/80">
                  {center.description}
                </p>
              )}
              {center?.content && (
                <div
                  id="center_content"
                  className="text-sm lg:text-base text-black/80"
                  dangerouslySetInnerHTML={{ __html: center.content }}
                />
              )}
              {center?.informations?.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2">
                  {center.informations.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-black/80">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                      {c?.information}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <EmptyNote>{t("aboutEmpty")}</EmptyNote>
          )}
        </SectionCard>

        {/* Stage 2: Scope of Care */}
        <SectionCard icon={HealingIcon} eyebrow={t("scopeEyebrow")} title={t("whatWeTreatTitle")}>
          {center?.conditions?.length > 0 ? (
            <TagList items={center.conditions} field="condition" />
          ) : (
            <EmptyNote>{t("conditionsEmpty")}</EmptyNote>
          )}
        </SectionCard>

        {/* Stage 3: Diagnostics & Interventions */}
        <SectionCard icon={BiotechIcon} eyebrow={t("capabilitiesEyebrow")} title={t("diagnosticsTitle")}>
          {center?.treatments?.length > 0 ? (
            <TagList items={center.treatments} field="treatment" />
          ) : (
            <EmptyNote>{t("diagnosticsEmpty")}</EmptyNote>
          )}
        </SectionCard>

        {/* Stage 4: Appointment request */}
        <section
          id="appointment"
          className="bg-blue rounded-xl p-6 md:p-8 text-white scroll-mt-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="shrink-0 w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center">
              <CalendarMonthIcon fontSize="small" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-wide uppercase text-white/70">
                {t("getStartedEyebrow")}
              </p>
              <h2 className="text-lg md:text-xl font-bold text-white">
                {t("requestAtCenter")}
              </h2>
            </div>
          </div>
          <div className="bg-white rounded-lg p-5 md:p-6">
            <UnifiedInboundForm
              image={center?.cover_photo}
              imageAlt={center?.name}
              endpoint="http://127.0.0.1:8000/api/add/medical-consultancy"
            />
          </div>
        </section>

        {/* Stage 5: Clear Direct Office Contacts */}
        <SectionCard icon={MapIcon} eyebrow={t("visitUsEyebrow")} title={t("officeContactTitle")}>
          {center?.operational_hours || center?.whatsapp_hotline || center?.floor_map ? (
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {center?.floor_map && (
                <div className="relative w-full h-[220px] md:h-[280px] rounded-lg overflow-hidden border border-ash/20">
                  <Image
                    fill
                    src={center.floor_map}
                    className="object-contain"
                    alt={`${center?.name || "Center"} floor map`}
                  />
                </div>
              )}
              <div className="flex flex-col gap-5">
                {center?.operational_hours && (
                  <div>
                    <p className="flex items-center gap-2 font-semibold text-blue mb-1.5">
                      <AccessTimeIcon fontSize="small" />
                      {t("operationalHours")}
                    </p>
                    <p className="text-sm lg:text-base whitespace-pre-line text-black/80">
                      {center.operational_hours}
                    </p>
                  </div>
                )}
                {center?.whatsapp_hotline && (
                  <a
                    href={`https://wa.me/${center.whatsapp_hotline.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-fit bg-green text-white font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <WhatsAppIcon fontSize="small" />
                    {t("chatWhatsapp")}
                  </a>
                )}
              </div>
            </div>
          ) : (
            <EmptyNote>{t("officeContactEmpty")}</EmptyNote>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
