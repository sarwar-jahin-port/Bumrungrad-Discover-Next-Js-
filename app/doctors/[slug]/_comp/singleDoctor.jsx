'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ScienceIcon from "@mui/icons-material/Science";
import ArticleIcon from "@mui/icons-material/Article";
import { DoctorSkeleton } from "@/components/ui/cardload";
import { useTranslations } from "next-intl";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Chip = ({ children }) => (
  <span className="inline-block rounded-full border border-blue/20 bg-blue/5 text-blue text-sm px-3.5 py-1.5">
    {children}
  </span>
);

const CredentialSection = ({ icon: Icon, title, items, render }) =>
  items?.length > 0 ? (
    <div>
      <p className="flex items-center gap-2 text-lg font-semibold text-blue mb-2.5">
        <Icon fontSize="small" />
        {title}
      </p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-black/80">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
            {render(item)}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export default function DoctorInfo({ params }) {
  const t = useTranslations("doctors.singleDoctor");
  const navigate = useRouter();
  const [loader, setLoader] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [doctor, setDoctor] = useState({});

  const goAppointment = (doctor) => {
    localStorage.setItem("doctor_name", JSON.stringify(doctor?.name));
    localStorage.setItem("Doctor_specialty", JSON.stringify(doctor?.specialty));
    navigate.push("/our-services/appointment");
  };

  useEffect(() => {
    setLoader(true);
    fetch(`http://127.0.0.1:8000/api/search/doctor/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.response?.status === 200) {
          setDoctor(data.response.data);
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
        <DoctorSkeleton />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-5 my-16 md:container md:mx-auto text-center">
        <h1 className="text-xl md:text-2xl font-bold text-blue">{t("notFoundTitle")}</h1>
        <p className="mt-2.5 text-black/50">
          {t("notFoundText")}
        </p>
      </div>
    );
  }

  const scheduleByDay = WEEKDAYS.map((day) => ({
    day,
    entries: (doctor?.day || [])
      .map((d, i) => (d === day ? i : null))
      .filter((i) => i !== null)
      .map((i) => ({
        shift: doctor.shift?.[i],
        arrival: doctor.arrival?.[i],
        leave: doctor.leave?.[i],
        location: doctor.location?.[i],
      })),
  }));
  const hasSchedule = scheduleByDay.some((d) => d.entries.length > 0);

  return (
    <div className="flex flex-col bg-white">
      {/* Zone 1 + 2: photo, name, specialty, sub-specialty, languages */}
      <div className="bg-cream">
        <div className="p-5 py-10 md:py-14 md:container md:mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">
          <div className="flex flex-col shrink-0 w-full md:w-[300px]">
            <div className="relative w-full aspect-[4/5] rounded-t-xl overflow-hidden shadow-md">
              {doctor?.cover_photo ? (
                <Image
                  fill
                  src={doctor.cover_photo}
                  alt={doctor?.name || "Doctor"}
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center text-black/30 text-sm">
                  {t("noPhoto")}
                </div>
              )}
            </div>
            <button
              onClick={() => goAppointment(doctor)}
              className="flex items-center justify-center gap-2 bg-blue text-white font-semibold py-3 rounded-b-xl hover:opacity-90 transition-opacity"
            >
              <EventAvailableIcon fontSize="small" />
              {t("bookAppointment")}
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4">
            <h1 className="text-2xl md:text-4xl font-bold text-blue leading-tight">
              {doctor?.name}
            </h1>
            {doctor?.specialty && (
              <p className="flex items-center gap-2 text-black/70">
                <LocalHospitalIcon fontSize="small" className="text-gold" />
                {doctor.specialty}
              </p>
            )}
            {doctor?.sub_specialty?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {doctor.sub_specialty.map((ss, i) => (
                  <Chip key={i}>{ss}</Chip>
                ))}
              </div>
            )}
            {doctor?.lang?.length > 0 && (
              <p className="flex items-center gap-2 text-black/70">
                <LanguageIcon fontSize="small" className="text-gold" />
                {doctor.lang.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 py-10 md:py-14 md:container md:mx-auto flex flex-col gap-10">
        {/* Zone 3: calendar-grid schedule */}
        {hasSchedule && (
          <section>
            <h2 className="text-lg md:text-xl font-bold text-blue mb-4">{t("weeklySchedule")}</h2>
            <div className="overflow-x-auto">
              <div className="grid grid-flow-col auto-cols-[160px] gap-3 min-w-max">
                {scheduleByDay.map(({ day, entries }) => (
                  <div
                    key={day}
                    className={`rounded-lg border p-3 flex flex-col gap-2 ${
                      entries.length > 0 ? "border-blue/20 bg-blue/5" : "border-ash/20 bg-white"
                    }`}
                  >
                    <p className={`text-sm font-semibold ${entries.length > 0 ? "text-blue" : "text-black/40"}`}>
                      {t(`weekdays.${day}`)}
                    </p>
                    {entries.length > 0 ? (
                      entries.map((e, i) => (
                        <div key={i} className="bg-white rounded p-2 border border-blue/10 flex flex-col gap-0.5">
                          <p className="text-xs font-semibold text-gold uppercase">{e.shift}</p>
                          <p className="text-xs text-black/70">{e.arrival} - {e.leave}</p>
                          {e.location && <p className="text-xs text-black/50">{e.location}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-black/30">{t("notAvailable")}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Credentials */}
        <section className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          <CredentialSection
            icon={SchoolIcon}
            title={t("medicalSchool")}
            items={doctor?.schools}
            render={(ms) => ms?.school}
          />
          <CredentialSection
            icon={WorkspacePremiumIcon}
            title={t("boardCertifications")}
            items={doctor?.certificates}
            render={(c) => c?.certificate}
          />
          <CredentialSection
            icon={SchoolIcon}
            title={t("trainings")}
            items={doctor?.trainings}
            render={(tr) => tr?.training}
          />
          <CredentialSection
            icon={ScienceIcon}
            title={t("interests")}
            items={doctor?.interests}
            render={(it) => it?.Interest}
          />
          <CredentialSection
            icon={WorkspacePremiumIcon}
            title={t("experience")}
            items={doctor?.experiences}
            render={(e) => e?.experience}
          />
          <CredentialSection
            icon={WorkspacePremiumIcon}
            title={t("fellowships")}
            items={doctor?.fellowships}
            render={(f) => f?.fellowship}
          />
          <CredentialSection
            icon={ScienceIcon}
            title={t("research")}
            items={doctor?.researches}
            render={(r) => r?.research}
          />
          <CredentialSection
            icon={ArticleIcon}
            title={t("articles")}
            items={doctor?.article}
            render={(a) => a?.article}
          />
        </section>
      </div>
    </div>
  );
}
