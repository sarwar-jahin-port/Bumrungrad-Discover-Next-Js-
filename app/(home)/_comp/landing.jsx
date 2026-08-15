"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {
  FaLock,
  FaUserMd,
  FaArrowRight,
  FaUser,
  FaGoogle,
  FaStar,
  FaHeartbeat,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import heroBg from "@/public/assets/hero-doctors.png";

const AVATAR_STYLES = [
  "bg-blue",
  "bg-indigo-500",
  "bg-green",
  "bg-gray-700",
];

const Landing = () => {
  const t = useTranslations("home.landing");
  const BULLET_POINTS = [t("bullet1"), t("bullet2"), t("bullet3")];
  const router = useRouter();
  const [heroStat, setHeroStat] = useState("");

  const [patientName, setPatientName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [medicalConcern, setMedicalConcern] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);

  useEffect(() => {
    fetch("https://api.discoverinternationalmedicalservice.com/api/get/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setHeroStat(data.data?.hero_stat_cases_managed || "");
        }
      })
      .catch(() => { });
  }, []);

  function handleAppointment() {
    router.push("/our-services/appointment");
  }
  function handleHealthScreen() {
    router.push("/check-up");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    const formData = new FormData();
    formData.append("patient_name", patientName);
    formData.append("whatsapp", whatsapp);
    formData.append("medical_concern", medicalConcern);

    try {
      const response = await fetch("https://api.discoverinternationalmedicalservice.com/api/add/free-consultation", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setSubmitLoader(false);
      if (data.status === 200) {
        toast.success(t("successToast"));
        setPatientName("");
        setWhatsapp("");
        setMedicalConcern("");
      } else {
        toast.error(t("errorToast"));
      }
    } catch (error) {
      setSubmitLoader(false);
      toast.error(t("errorToast"));
    }
  };

  const inputClasses =
    "w-full min-h-[56px] rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 hover:border-gray-300 focus:border-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue/10";

  return (
    <section className="relative overflow-hidden bg-[#FAFAFC]">
      {/* Decorative background depth — glows, noise. Purely visual. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -bottom-32 -left-16 h-80 w-80 md:h-[26rem] md:w-[26rem] rounded-full bg-green/[0.07] blur-3xl" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply" />
      </div>

      {/* Background image — integrated into the right side of the hero, blended via gradient */}
      <div className="absolute inset-y-0 right-0 hidden lg:block lg:w-[48%] xl:w-[45%]">
        <Image
          src={heroBg}
          alt="Care team at Bumrungrad International Hospital reviewing a patient's chart together"
          fill
          priority
          sizes="45vw"
          className="object-cover object-[72%_35%]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(250,250,252,1) 0%, rgba(250,250,252,.96) 18%, rgba(250,250,252,.88) 35%, rgba(250,250,252,.55) 60%, rgba(250,250,252,.15) 80%, rgba(250,250,252,0) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-8 lg:px-[clamp(2rem,4vw,4rem)] 2xl:px-12 py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 lg:items-center">
          {/* Left — content */}
          <div className="md:col-span-1 lg:col-span-5 flex flex-col gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-blue/15 bg-blue/5 px-4 py-1.5 text-xs md:text-sm font-semibold tracking-wide text-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
              {t("tagline")}
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold leading-[1.2] tracking-tight text-gray-900">
              <span className="block text-gray-600 font-medium">{t("headingLine1")}</span>
              <span className="block text-blue">{t("headingLine2")}</span>
            </h1>

            <div className="inline-flex w-fit items-center gap-4 self-start rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-md px-4 py-3 shadow-[0_8px_30px_-14px_rgba(15,23,42,0.25)]">
              <div className="flex -space-x-3" role="img" aria-label={t("googleReviews")}>
                {AVATAR_STYLES.map((style, i) => (
                  <span
                    key={i}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white text-white text-xs shadow-sm ${style}`}
                  >
                    <FaUser aria-hidden="true" />
                  </span>
                ))}
              </div>
              <span className="h-8 w-px bg-gray-200" aria-hidden="true" />
              <div className="text-xs leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="flex text-gold text-[11px]" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <FaStar key={i} />
                    ))}
                  </span>
                  <span className="font-bold text-gray-900">4.8</span>
                </div>
                <p className="mt-0.5 font-medium text-gray-500">{t("happyPatients")}</p>
                <p className="flex items-center gap-1 text-gray-400">
                  <FaGoogle className="text-[10px]" aria-hidden="true" />
                  {t("googleReviews")}
                </p>
              </div>
            </div>

            <ul className="flex flex-col gap-3.5">
              {BULLET_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                    <IoMdCheckmarkCircle className="text-base" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-medium text-gray-700 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            {heroStat && (
              <AnimatedCounter
                text={heroStat}
                className="text-2xl md:text-3xl font-bold text-blue"
              />
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleAppointment}
                className="inline-flex items-center gap-2 rounded-[14px] bg-blue px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue/90 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue/20"
                aria-label={t("doctorAppointment")}
              >
                <FaUserMd aria-hidden="true" />
                {t("doctorAppointment")}
              </button>
              <button
                onClick={handleHealthScreen}
                className="inline-flex items-center gap-2 rounded-[14px] border border-gray-300 bg-white/60 px-6 py-3.5 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue hover:bg-white hover:text-blue focus:outline-none focus-visible:ring-4 focus-visible:ring-blue/10"
                aria-label={t("healthScreening")}
              >
                <FaHeartbeat aria-hidden="true" />
                {t("healthScreening")}
              </button>
            </div>
          </div>

          {/* Center — lead form, floating above the background image on desktop */}
          <div className="md:col-span-1 lg:col-span-5 max-w-[400px]">
            <div className="relative overflow-hidden rounded-[20px] border border-gray-100 bg-white p-6 md:p-8 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue via-indigo-500 to-green" aria-hidden="true" />

              <h2 className="text-center text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
                {t("formTitle")}
              </h2>
              <p className="mt-1.5 text-center text-sm text-gray-500">
                {t("formSubtitle")}
              </p>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                <input
                  type="text"
                  required
                  placeholder={t("fullName")}
                  aria-label={t("fullName")}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className={inputClasses}
                />
                <input
                  type="tel"
                  required
                  placeholder={t("whatsapp")}
                  aria-label={t("whatsapp")}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className={inputClasses}
                />
                <textarea
                  required
                  rows={3}
                  placeholder={t("medicalConcern")}
                  aria-label={t("medicalConcern")}
                  value={medicalConcern}
                  onChange={(e) => setMedicalConcern(e.target.value)}
                  className={inputClasses}
                />
                <button
                  type="submit"
                  disabled={submitLoader}
                  className="group flex min-h-[56px] items-center justify-center gap-2 rounded-[14px] bg-blue text-sm font-semibold text-white shadow-lg shadow-blue/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue/90 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue/20"
                >
                  {submitLoader ? t("submitting") : t("submit")}
                  {!submitLoader && (
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  )}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <FaLock className="text-[10px]" aria-hidden="true" /> {t("confidential")}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
